import React, { useState } from "react";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import twemoji from "twemoji";
import "./messageReactions.scss";

const EmojiReactor = ({ onReact }) => {
  const [showEmojis, setShowEmojis] = useState(false);
  const emojis = ["😀", "😂", "😍", "👍", "👎"];

  return (
    <div className="emoji_reactor">
      <AddReactionIcon
        style={{ fontSize: 20, color: "#7812A7" }}
        onClick={() => setShowEmojis(!showEmojis)}
      />
      {showEmojis && (
        <div className="emoji_list">
          {emojis.map((emoji, index) => (
            <span
              key={index}
              className="emoji_item"
              onClick={() => onReact(emoji)}
              dangerouslySetInnerHTML={{
                __html: twemoji.parse(emoji),
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmojiReactor;