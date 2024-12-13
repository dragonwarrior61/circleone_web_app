import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";

const SpaceBarHidden = () => {
  return (
    <>
      {/* Collapsed View Start */}
      <div
        className="top_channel_toggle_box"
        style={{ marginTop: 10, opacity: "0.2" }}
      >
        <KeyboardDoubleArrowRightRoundedIcon className="fa-solid fa-angles-right" />
      </div>
      {/* Collapsed View End */}
    </>
  );
};

export default SpaceBarHidden;
