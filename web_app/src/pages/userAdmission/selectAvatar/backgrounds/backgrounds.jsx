import "./backgrounds.scss";

const BackgroundList = ({ backgrounds, handleBackgroundClick }) => {
  return (
    <div className="bgList">
      {backgrounds.map((background, index) => (
        <div
          key={index}
          style={{
            width: "50px",
            height: "50px",
            background,
            borderRadius: "8px",
            margin: "4px",
          }}
          onClick={() => handleBackgroundClick(background)}
        />
      ))}
    </div>
  );
};

export default BackgroundList;
