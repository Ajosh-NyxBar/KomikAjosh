import { useState } from "react";
import "./Search.scss";
import md5 from "md5";
import Character from "./Character";
import Comics from "../Comics/Comics";

const Search = () => {
  const [character, setCharacter] = useState("");
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
      .then((result) => {
        console.log(result.data);
        setCharacterData(result.data);
      })
      .catch((error) => {
        console.error("Error fetching character data:", error);
      });
  };

  const getComicData = (characterId) => {
    console.log("Fetching comics for character ID:", characterId);
    window.scrollTo({ top: 0, left: 0 });

    const timestamp = new Date().getTime();
    const hash = generateHash(timestamp);

    const url = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?apikey=${publicKey}&hash=${hash}&ts=${timestamp}`;
    console.log("Fetching URL:", url);

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        console.log("Comic data response:", result);
        setComicData(result.data);
        console.log(result.data);
      })
      .catch((error) => {
        console.error("Error fetching comic data:", error);
      });
  };

  const generateHash = (timestamp) => {
    return md5(timestamp + privateKey + publicKey);
  };

  const handleReset = (e) => {
    setCharacter("");
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

      {!comicData &&
        characterData &&
        Array.isArray(characterData.results) &&
        characterData.results.length > 0 && (
          <Character data={characterData.results} onClick={getComicData} />
        )}

      {comicData &&
        Array.isArray(comicData.results) &&
        comicData.results[0] && <Comics data={comicData.results} />}
    </>
  );
};

export default Search;
