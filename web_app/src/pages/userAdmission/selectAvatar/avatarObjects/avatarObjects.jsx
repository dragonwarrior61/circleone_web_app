const AvatarObjects = ({
  objects,
  selectedObject,
  handleObjectClick,
  selectedAvatar,
}) => {
  return (
    <div className="avatar-Objects">
      {objects.map((object, index) => (
        <img
          src={object}
          alt={`Object ${index + 1}`}
          className={`object ${selectedObject === object ? "selected" : ""}`}
          key={index}
          onClick={() => handleObjectClick(object)}
          style={{
            backgroundImage: `url(${selectedAvatar}), url(${object})`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            position: "relative",
            border:
              selectedObject === object
                ? "3px solid rgb(143, 19, 214)"
                : "none",
            zIndex: selectedObject === object ? 1 : "auto",
          }}
        />
      ))}
    </div>
  );
};

export default AvatarObjects;