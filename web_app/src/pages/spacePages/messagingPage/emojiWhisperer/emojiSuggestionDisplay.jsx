import React from "react";
import { useRecoilValue } from "recoil";
import { emojiSuggestionState } from "../../../../../atom";

const EmojiSuggestionsDisplay = () => {
  const suggestions = useRecoilValue(emojiSuggestionState);

  return (
    <div className="emoji_suggestions_display">
      {suggestions.map((emoji, index) => (
        <span key={index}>{emoji} </span>
      ))}
    </div>
  );
};

export default EmojiSuggestionsDisplay;
