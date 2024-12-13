import "./avatars.scss";

const AvatarList = ({ avatars, handleAvatarClick, selectedBackground }) => {
  return (
    <div className="avatar_list">
      {avatars.map((avatar, index) => (
        <div
          key={index}
          className={`avatar_container`}
          onClick={() => handleAvatarClick(index)}
          style={{
            backgroundImage: `url(${avatar.image}), ${selectedBackground}`,
          }}
        >
          <img
            src={avatar.image}
            alt={`Avatar ${index + 1}`}
            className="avatar_img"
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarList;
