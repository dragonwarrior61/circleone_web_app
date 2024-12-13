const SelectedAvatarDisplay = ({ avatar, object, backgroundGradient }) => {
  return (
    <div
      className="selected_avatar_display"
      style={{ background: backgroundGradient }}
    >
      {avatar && (
        <img
          src={avatar}
          alt="Selected Avatar"
          className="displayed_avatar_image"
        />
      )}
      {object && (
        <img
          src={object}
          alt="Selected Object"
          className="displayed_object_image"
        />
      )}
    </div>
  );
};

export default SelectedAvatarDisplay;