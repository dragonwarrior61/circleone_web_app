import { useState, useEffect } from "react";
import "./modal.scss";
import AddSpaceImage from "./assets/addSpaceImage.jsx";
import CompassSpace from "./assets/compassSpace.jsx";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import JoinSpace from "./joinSpace";
import CreateSpace from "./createSpace";

const AddNewSpace = ({ handleCloseAddSpace }) => {
  const [showJoinSpace, setShowJoinSpace] = useState(false);
  const [showCreateSpace, setShowCreateSpace] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const addNewSpaceElement = document.querySelector(".popup_content");

      if (addNewSpaceElement && !addNewSpaceElement.contains(event.target)) {
        handleCloseAddSpace();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleCloseAddSpace]);

  const handleOpenJoinSpace = () => {
    setShowJoinSpace(true);
    setShowCreateSpace(false);
  };

  const handleOpenCreateSpace = () => {
    setShowCreateSpace(true);
    setShowJoinSpace(false);
  };

  return (
    <div className="popup">
      {showJoinSpace ? (
        <JoinSpace handleClose={() => setShowJoinSpace(false)} />
      ) : showCreateSpace ? (
        <CreateSpace handleClose={() => setShowCreateSpace(false)} />
      ) : (
        <div className="popup_content" style={{ padding: 0 }}>
          <div className="close_button" onClick={handleCloseAddSpace}>
            <CloseIcon style={{ fontSize: 24 }} />
          </div>
          <span className="title_block">Add a New Space</span>
          <div className="container_options_add_space">
            <div className="option_add_space" onClick={handleOpenCreateSpace}>
              <CompassSpace className="tab_icon" />
              <span>Create a Space</span>
            </div>
            <div className="option_add_space" onClick={handleOpenJoinSpace}>
              <SearchIcon className="tab_icon" />
              <span>Join a Public Space</span>
            </div>
          </div>
          <AddSpaceImage />
        </div>
      )}
    </div>
  );
};

export default AddNewSpace;
