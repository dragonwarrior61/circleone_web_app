import { atom } from "recoil";

export const dmHistoryState = atom({
  key: "dmHistory",
  default: [],
});

export const sentMessageState = atom({
  key: "sentMessage",
  default: "",
});

export const unopenedMessage = {
  name: "",
  status: "",
  avatar: "",
  statusColor: "",
};

export const contactSearchQuery = atom({
  key: "contactSearchQuery",
  default: "",
});

export const emojiSuggestionState = atom({
  key: "emojiSuggestionState",
  default: [],
});

export const messageState = atom({
  key: "messageState",
  default: "",
});