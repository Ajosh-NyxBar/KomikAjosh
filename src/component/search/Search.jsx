import { useState } from "react";
import "./Search.scss";
import md5 from "md5";

const Search = () => {
  const [character, setCharacter] = useState('');
  const [characterData, setCharacterData] = useState(null);
  const [comicData, setComicData] = useState(null);

  const publicKey = import.meta.env.VITE_PUBLIC_KEY;
  const privateKey = import.meta.env.VITE_PRIVATE_KEY;

  const handleSubmit = (e) => {
    e.preventDefault();
    getCharacterData();
  };

  const handleChange = (e) => {
    setCharacter(e.target.value);
  };

  const getCharacterData = () => {
    setCharacterData(null);
    setComicData(null);

    const timestamp = new Date().getTime();
    const hash = generateHash(timestamp);

    const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${timestamp}&nameStartsWith=${character}&limit=100`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCharacterData(data.data.results[0]);
        console.log(data.data.results[0]);
      });
  };

  const generateHash = (timestamp) => {
    return md5(timestamp + privateKey + publicKey);
  };

  const handleReset = (e) => {
    setCharacter('');
    setCharacterData(null);
    setComicData(null);
  };

  return (
    <>
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter The Name Of Character"
          onChange={handleChange}
          value={character}
        />
        <div className="buttons">
          <button type="submit">Search</button>
          <button type="reset" className="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </>
  );
};

export default Search;