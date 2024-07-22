import "./comics.scss";
const Comics = ({ data }) => {
  return (
    <div className="comics">
      {data.map((item, index) => {
        const detailsUrl = item.urls.find(
          (element) => element["type"] === "detail"
        ).url;

        return (
          <a
            href={detailsUrl}
            key={item.id}
            style={{
              backgroundImage: `url(${item.thumbnail.path}.${item.thumbnail.extension})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            target="_blank"
            className="comic-item"
            rel="noreferrer"
          >
            <div className="caption">{item.title}</div>
            <div className="caption bottom">View Comic Detail</div>
          </a>
        );
      })}
    </div>
  );
};

export default Comics;