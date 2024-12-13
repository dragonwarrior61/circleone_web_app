import React, { useEffect } from "react";
import { gemoji } from "gemoji";
import { useRecoilState } from "recoil";
import { emojiSuggestionState } from "../../../../../atom";

const EmojiWhisperer = ({ text, onEmojiSelect }) => {
  const [suggestions, setSuggestions] = useRecoilState(emojiSuggestionState);

  useEffect(() => {
    const words = text.split(" ");
    const lastWord = words[words.length - 1].toLowerCase();
    const emojiSuggestions = gemoji
      .filter((e) => e.names.includes(lastWord) || e.tags.includes(lastWord))
      .map((e) => e.emoji);

    setSuggestions([...new Set(emojiSuggestions)]);
  }, [text, setSuggestions]);

  return (
    <div className="emoji_suggestions">
      {suggestions.map((emoji, index) => (
        <button key={index} onClick={() => onEmojiSelect(emoji)}>
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default EmojiWhisperer;
