import "./character.scss";

const Character = ({ data, onClick }) => {
  if (!Array.isArray(data)) {
    return <div className="character">No data available</div>;
  }

  return (
    <div className="character">
      {data.map((item, index) => (
        <div
          key={index}
          className="character__container"
          style={{
            backgroundImage: `url(${item.thumbnail.path}.${item.thumbnail.extension})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={() => onClick(item.id)}
        >
          <div className="caption">{item.name}</div>
          <div className="caption bottom">View Comics</div>
        </div>
      ))}
    </div>
  );
};

export default Character;