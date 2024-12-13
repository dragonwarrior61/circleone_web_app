import { useState, useRef } from "react";
import { SpaceBar, SpaceBarHidden, SpaceBarShow, SpaceChange } from ".";
import LinkPage from "../pages/spacePages/linkPage/linkPage";

const Site = () => {
  const [isOpen, setIsOpen] = useState(true);
  const catArrowRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseCat = () => {
    catArrowRef.current.style.transform = "rotate(90deg)";
  };

  return (
    <div>
      {isOpen ? (
        <button id="opened_top" onClick={handleToggle}>
          Opened Top
        </button>
      ) : (
        <button id="closed_top" onClick={handleToggle}>
          Closed Top
        </button>
      )}
      <div className="server_select_box" style={{ opacity: isOpen ? 0 : 1 }}>
        <SpaceBarShow />
      </div>{" "}
      <div className="channel_bar_content" style={{ opacity: isOpen ? 0 : 1 }}>
        <SpaceBar />
      </div>{" "}
      <div className="channel_bar" style={{ width: isOpen ? "0px" : "280px" }}>
        <SpaceChange />
        <SpaceBar />
      </div>{" "}
      <div
        className="content_box"
        style={{
          width: isOpen ? "100%" : "calc(100% - 350px)",
          marginLeft: isOpen ? "70px" : "350px",
        }}
      >
        <LinkPage />
      </div>{" "}
      <div className="top_channel_box_2" style={{ opacity: isOpen ? 1 : 0 }}>
        <SpaceBarHidden />
      </div>{" "}
      <div
        id="channel_top"
        style={{ display: isOpen ? "none" : "inline-block" }}
      >
        <SpaceBarShow />
      </div>
      <div
        id="channel_bar_content"
        style={{ display: isOpen ? "none" : "block" }}
      >
        <SpaceBar />
      </div>{" "}
      <div
        id="closed_top"
        style={{ display: isOpen ? "inline-block" : "none" }}
      >
        <SpaceBarHidden />
      </div>

      <div
        className="channel_bar"
        style={{
          width: isOpen ? "0px" : "281px",
          position: "absolute",
          height: "calc(100vh - 125px)",
          left: "70px",
          borderTopLeftRadius: "10px",
          top: "125px !important",
          background: "var(--dark-white) !important",
          borderTop: "1px solid #00000005",
          boxShadow:
            "0px 8px 16px var(--light-box-shadow), 1px 2px 3px var(--bs-body-color)",
        }}
      ></div>{" "}
      <button id="close_page_cat" onClick={handleCloseCat}></button>
      <div id="cat_arrow_1" ref={catArrowRef}></div>
    </div>
  );
};

export default Site;
