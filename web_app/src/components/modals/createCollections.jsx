import { useState, useRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./modal.scss";
import twemoji from "twemoji";

const emojiList = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "😂",
  "🤣",
  "😍",
  "😘",
  "😗",
  "😙",
  "😚",
  "😋",
  "😛",
  "😝",
  "😜",
  "🤪",
  "🤨",
  "🧐",
  "🤓",
  "😎",
  "🤩",
  "🥳",
  "😏",
  "😒",
  "😞",
  "😔",
  "😟",
  "😕",
  "🙁",
  "☹️",
  "😣",
  "😖",
  "😫",
  "😩",
  "🥺",
  "😢",
  "😭",
  "😤",
];

const bgList = [
  "#E0D0E8",
  "#D9DAEE",
  "#F0D4E0",
  "#E1EFDC",
  "#F7F5CB",
  "#F1E8D6",
];

const EmojiList = ({ list, handleItemClick }) => {
  return (
    <div className="choose_block_list">
      {list.map((item, index) => (
        <div
          key={`${index}-${item}`}
          className="item_container_modal"
          onClick={() => handleItemClick(item)}
          dangerouslySetInnerHTML={{
            __html: twemoji.parse(item),
          }}
        ></div>
      ))}
    </div>
  );
};

const BgList = ({ list, handleItemClick, selectedBg }) => {
  return (
    <div className="bg_list choose_block_list">
      {list.map((item) => (
        <div
          key={item}
          className={`${
            selectedBg === item ? "selected_items" : ""
          } bg_item_container item_container_modal`}
          title={item}
          style={{
            background: item,
          }}
          onClick={() => handleItemClick(item)}
        >
          {selectedBg === item && (
            <DoneIcon
              className="bg_icon"
              style={{ color: "white", fontSize: "2rem" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const HomePopup = (props) => {
  const [emoji, setEmoji] = useState("😀");
  const [bgColor, setBgColor] = useState("#E0D0E8");
  const [emojiListCollapsed, setEmojiListCollapsed] = useState(true);
  const [bgListCollapsed, setBgListCollapsed] = useState(true);
  const [validCollectionName, setValidCollectionName] = useState(false);

  const handleEmojiItemClick = (emoji) => {
    setEmoji(emoji);
  };

  const handleBgItemClick = (item) => {
    setBgColor(item);
  };

  const collapseEmojiList = () => {
    setEmojiListCollapsed(!emojiListCollapsed);
  };

  const collapseBgList = () => {
    setBgListCollapsed(!bgListCollapsed);
  };

  const checkValidCollectionName = (event) => {
    const name = event.target.value;
    if (name.length >= 5) setValidCollectionName(true);
    else setValidCollectionName(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);

  const popupRef = useRef(null);

  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      document.getElementById("collection_popup_close_button").click();
    }
  };

  return (
    <div className="popup">
      <div className="create_collection_block popup_content" ref={popupRef}>
        <div className="title_block">Create a Collection</div>
        <div
          className="image_block"
          dangerouslySetInnerHTML={{
            __html: twemoji.parse(emoji),
          }}
          style={{ backgroundColor: bgColor }}
        ></div>
        <div
          className="close_button"
          id="collection_popup_close_button"
          onClick={props.collapsePopup}
        >
          <CloseIcon style={{ fontSize: 24 }} />
        </div>
        <form action="POST" className="creation_k">
          <div className="input_block">
            <div
              className={`choose_block choose_block_${
                emojiListCollapsed ? "visible" : "collapsed"
              }`}
            >
              <div
                className="modal_field"
                placeholder="Choose an emoji"
                onClick={collapseEmojiList}
              >
                Select an icon
                <KeyboardArrowDownIcon
                  className="choose_block_button_icon"
                  style={{
                    transform: emojiListCollapsed
                      ? "rotate(0deg)"
                      : "rotate(180deg)",
                  }}
                />
              </div>
              <EmojiList
                list={emojiList}
                handleItemClick={handleEmojiItemClick}
              />
            </div>
            <div
              className={`choose_bg choose_block choose_block_${
                bgListCollapsed ? "visible" : "collapsed"
              }`}
            >
              <div className="modal_field" onClick={collapseBgList}>
                Choose a background
                <KeyboardArrowDownIcon
                  className="choose_block_button_icon"
                  style={{
                    transform: bgListCollapsed
                      ? "rotate(0deg)"
                      : "rotate(180deg)",
                  }}
                />
              </div>
              <BgList
                list={bgList}
                handleItemClick={handleBgItemClick}
                selectedBg={bgColor}
              />
            </div>
            <label
              htmlFor="choose-name"
              style={{ width: "100%", position: "relative" }}
            >
              <input
                onInput={checkValidCollectionName}
                className="choose_block modal_field "
                id="choose-collection-name"
                name="choose-name"
                type="text"
                placeholder="Enter the collection name"
              />
              {validCollectionName ? (
                <DoneIcon
                  style={{
                    position: "absolute",
                    bottom: 12,
                    right: 23,
                  }}
                />
              ) : (
                <CloseIcon
                  style={{
                    position: "absolute",
                    bottom: 12,
                    right: 23,
                  }}
                />
              )}
            </label>
          </div>
          <button className="black_button">Create Collection</button>
        </form>
      </div>
    </div>
  );
};

export default HomePopup;
