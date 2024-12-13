import { useState } from "react";
import { HomePopup, PagePopup } from "../..";
import { Tooltip } from "react-tooltip";
import ExploreIcon from "@mui/icons-material/Explore";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleOutlineIcon from "@mui/icons-material/Checklist";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const EmojiButton = (props) => {
  return (
    <div
      style={{
        display: "inline-block",
        background: props.color,
        position: "relative",
      }}
      className="left_bar_icon_box circle_box"
      data-tooltip-id="collections:{props.title}"
      data-tooltip-content={props.title}
      data-tooltip-place="right"
    >
      <Tooltip id="collections:{props.title}" />
      <center>
        <p className="one_px_outline">{props.emoji}</p>
      </center>
    </div>
  );
};

const LeftSideBar = (props) => {
  const [flipped, setFlipped] = useState(false);
  const [flippedPage, setFlippedPage] = useState(false);
  const [messaging, setMessaging] = useState(false);

  const handleIconClick = (action) => {
    action();
  };

  const handleMessagesClick = () => {
    props.toggleMessages();
    setMessaging(!messaging);
  };

  const collapsePopup = () => {
    setFlipped(!flipped);
  };
  const collapsePopupPage = () => {
    setFlippedPage(!flippedPage);
  };

  const emojiButtons = [
    ["🔥", "Now Trending", ""],
    ["👅", "Collection: Memes", "#7812a726"],
    ["🍳", "Collection: Recipes", "#0C56D026"],
    ["🛍️", "Collection: Summer Clothes", "#FF006C26"],
  ];

  return (
    <>
      {flipped && <HomePopup collapsePopup={collapsePopup} />}
      {flippedPage && <PagePopup collapsePopup={collapsePopupPage} />}

      <div className="left_bar_box" style={{ position: "relative" }}>
        <div
          className="left_tool_bar"
          style={{ display: "flex", flexGrow: 1, flexDirection: "column" }}
        >

          <div className="left_bar_container">
            <div
              style={{ cursor: "pointer", paddingTop: 7 }}
              data-tooltip-id="browse_spaces"
              data-tooltip-content="Your Spaces"
              data-tooltip-place="right"
              onClick={() => handleIconClick(props.toggleHome)}
            >
              <Tooltip id="browse_spaces" />
              <center>
                <ExploreIcon style={{ color: "var(--purple)", fontSize: 28 }} />
              </center>
            </div>
            <hr className="bar_col" />
            <div
              style={{ marginTop: 20, cursor: "pointer" }}
              data-tooltip-id="coming_soon:calendars"
              data-tooltip-content="Coming Soon: Calendars"
              data-tooltip-place="right"
            >
              <Tooltip id="coming_soon:calendars" />
              <center>
                <CalendarMonthIcon style={{ opacity: 0.6, fontSize: 28 }} />
                <div className="tag">SOON</div>
              </center>
            </div>
            <div
              style={{ marginTop: 20, cursor: "pointer" }}
              data-tooltip-id="coming_soon:todo"
              data-tooltip-content="Todo Lists"
              data-tooltip-place="right"
              onClick={props.toggleToDoListSidebar}
            >
              <Tooltip id="coming_soon:todo" />
              <center>
                <CheckCircleOutlineIcon
                  style={{ opacity: 0.6, fontSize: 28 }}
                />
                <div className="tag" style={{ background: "#ffc107" }}>
                  NEW
                </div>
              </center>
            </div>
            <hr className="bar_col" />
            {emojiButtons.map((item, index) => (
              <EmojiButton
                key={index}
                emoji={item[0]}
                title={item[1]}
                color={item[2]}
              />
            ))}
            <div
              style={{ marginTop: 10, cursor: "pointer" }}
              data-tooltip-id="create_collection"
              data-tooltip-content="Add Collection"
              data-tooltip-place="right"
            >
              <Tooltip id="create_collection" />
              <center style={{ position: "relative" }}>
                <a
                  href="#"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    height: "100%",
                    width: "100%",
                    zIndex: 15,
                  }}
                  onClick={() => setFlipped(!flipped)}
                ></a>
                <AddIcon style={{ opacity: 0.6 }} />
              </center>
            </div>

            <div
              className="absolute_list"
              style={{ position: "absolute", bottom: 30 }}
            >
              <div className="left_bar_cat_box">
                <div
                  className="left_bar_icon_holder"
                  data-tooltip-id="message_page"
                  data-tooltip-content="Direct Messages"
                  data-tooltip-place="right"
                  style={{ position: "relative" }}
                  onClick={() => handleMessagesClick(props.toggleMessages)}
                  role="button"
                >
                  <Tooltip id="message_page" />
                  <center style={{ marginTop: 10 }}>
                    <ChatBubbleRoundedIcon style={{ opacity: 0.6 }} />
                    <div className="notif_circle" />
                  </center>
                </div>

                <hr
                  className="bar_col"
                  style={{ marginTop: 8, marginBottom: 8 }}
                />

                <div
                  className="left_bar_icon_holder"
                  data-tooltip-id="settings_page"
                  data-tooltip-content="User Settings"
                  data-tooltip-place="right"
                  onClick={() => handleIconClick(props.toggleSettings)}
                >
                  <Tooltip id="settings_page" />
                  <center style={{ marginBottom: 10 }}>
                    <ManageAccountsRoundedIcon style={{ opacity: 0.6 }} />
                  </center>
                </div>
              </div>
              <hr className="bar_col" />

              <div
                className="left_bar_icon_box"
                data-tooltip-id="support_page"
                data-tooltip-content="Support"
                data-tooltip-place="right"
                onClick={() => {
                  props.toggleSupport();
                }}
              >
                <Tooltip id="support_page" />
                <center>
                  <HelpOutlineIcon style={{ opacity: 0.6, marginTop: -5 }} />
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSideBar;