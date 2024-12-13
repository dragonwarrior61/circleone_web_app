import banner from "../../../assets/holder/banner_1.jpg";
import "./spaceBar.scss";
import { PagePopup } from "../..";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import DragAndDrop from "./dragAndDrop/dragAndDrop";

const SpaceBar = () => {
  const [flippedPage, setFlippedPage] = useState(false);
  const collapsePopupPage = () => {
    setFlippedPage(!flippedPage);
  };
  return (
    <>
      {flippedPage && <PagePopup collapsePopup={collapsePopupPage} />}
      <div
        className="content_padding channel_bar_content pages_box"
        style={{ marginTop: 10 }}
        id="channel_bar_content"
      >
        <div
          className="space_banner"
          id="space_banner"
          style={{ backgroundImage: "url(" + banner + ")" }}
        >
          <span
            className="badge badge-dark"
            data-toggle="tooltip"
            title="Oxygem Premium"
          >
            <i className="fa-solid fa-hourglass-start"></i> 10 Days Left
          </span>
        </div>
        <div className="space_channel_content_box stat_title_box">
          <div className="stat_title">Space members</div>
          <div
            className="progress"
            data-tooltip-id="member_stats"
            data-tooltip-content="25/100 users (25%)"
            data-tooltip-place="top-end"
          >
            <Tooltip style={{ fontSize: 10 }} id="member_stats" />
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: "25%" }}
              aria-valuenow={25}
              aria-valuemax={100}
            ></div>
          </div>
          <div className="stat_title">Total interactions</div>
          <div
            className="progress"
            data-tooltip-id="interaction_stats"
            data-tooltip-content="25K/25K interactions (100%)"
            data-tooltip-place="top-end"
          >
            <Tooltip style={{ fontSize: 10 }} id="interaction_stats" />
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: "100%" }}
              aria-valuenow={110}
              aria-valuemax={100}
            ></div>
          </div>
        </div>
        <DragAndDrop handleCategoryAddition={collapsePopupPage} />
      </div>
    </>
  );
};

export default SpaceBar;
