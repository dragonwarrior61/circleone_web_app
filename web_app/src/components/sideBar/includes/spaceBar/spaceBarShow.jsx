import { useState } from "react";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";

const SpaceBarShow = () => {
  const [boardCallapse, setBoardCallapse] = useState(false);
  
  const collapseBoard = () => {
    var board = document.getElementsByClassName("content_box")[0];
    var bar = document.getElementsByClassName("channel_bar")[0];
    if (!board.classList.contains("widened")) {
      board.classList.add("widened");
      bar.classList.add("hidden");
    } else {
      board.classList.remove("widened");
      bar.classList.remove("hidden");
    }
    setBoardCallapse(!boardCallapse);
  };

  return (
    <>
      {/* Non-Collapsed Collapse Section */}
      <div className="server_select_box">
        <div
          style={{
            width: 309,
            marginTop: "-10px",
            paddingRight: 5,
            position: "relative",
          }}
          id="opened_top"
        >
          <div
            className="top_channel_toggle_box"
            style={{ position: "relative" }}
          >
            {boardCallapse ? (
              <KeyboardDoubleArrowRightRoundedIcon
                onClick={collapseBoard}
                style={{ position: "absolute", right: -10, top: 13 }}
              />
            ) : (
              <KeyboardDoubleArrowLeftRoundedIcon
                onClick={collapseBoard}
                style={{ position: "absolute", right: -10, top: 14 }}
              />
            )}
          </div>
        </div>
      </div>
      {/* Non-Collapsed View End */}
    </>
  );
};

export default SpaceBarShow;
