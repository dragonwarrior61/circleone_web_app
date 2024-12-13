import React from "react";

const ContentPageContext = React.createContext({
  currentContentPage: null,
  setCurrentContentPage: () => {},
});

export default ContentPageContext;