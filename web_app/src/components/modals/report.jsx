import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DragDropFiles from "./fileUpload/fileUpload";
import "./modal.scss";

const ReportModal = ({ collapsePopup }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showDragDropFiles, setShowDragDropFiles] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setDropdownVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const modalContainer = document.querySelector(".popup_content");
      const fileBlock = document.querySelector(".drag-drop-overlay");
      if (
        modalContainer &&
        !modalContainer.contains(event.target) &&
        (!fileBlock || !fileBlock.contains(event.target))
      ) {
        collapsePopup();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".custom_dropdown")) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const onClickDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const onSubmit = (evt) => {
    evt.preventDefault();
    const formTarget = evt.currentTarget;
    const formData = {
      reportMessage: formTarget.reportMessage.value,
      additionalInput: formTarget.additionalInput.value,
      // other props
    };
    console.log({ formData });
  };

  return (
    <div className="popup">
      <form onSubmit={onSubmit}>
        <div className="popup_content" style={{ maxWidth: 780 }}>
          <div className="close_button" onClick={collapsePopup}>
            <CloseIcon style={{ fontSize: 24 }} />
          </div>
          <h6 className="title_block">Report Tool</h6>

          <div className="custom_dropdown" onClick={onClickDropdown}>
            <div className="selected_category">
              {selectedCategory || "Select a Category"}
              <KeyboardArrowDownIcon
                className="choose_block_button_icon"
                style={{
                  transform: dropdownVisible
                    ? "rotate(0deg)"
                    : "rotate(180deg)",
                }}
              />
            </div>
            {dropdownVisible && (
              <div className="dropdown_list">
                {/* // IT WOULD BE GOOD TO USE BUTTON INSTEAD SPAN, REASON: BUTTON IS INTERACTIVE ELEMENT, SPAN ISN'T
                INTERACTIVE ELEMENTS CAN BE USED BY KEYBORAD, CAN BE FOCUSED, ETC. */}
                <span onClick={() => handleCategoryChange("Report a Bug")}>
                  Report a bug
                </span>
                <span
                  onClick={() => handleCategoryChange("Provide a suggestion")}
                >
                  Provide a suggestion
                </span>
                <span onClick={() => handleCategoryChange("Report a user")}>
                  Report a user
                </span>
                <span onClick={() => handleCategoryChange("Report a space")}>
                  Report a space
                </span>
              </div>
            )}
          </div>
          {["Report a user", "Report a space"].includes(selectedCategory) && (
            <div className="input_field_report">
              <input
                type="text"
                id="additionalInput"
                placeholder={
                  selectedCategory === "Report a user"
                    ? "Enter username"
                    : "Enter space ID"
                }
              />
            </div>
          )}
          <div className="report_msg">
            <textarea
              className="report_message"
              id="reportMessage"
              minLength="20"
              placeholder="Enter your report message here..."
              rows="5"
              required
            ></textarea>
            <div className="file_report_icon">
              <AttachFileIcon
                style={{ rotate: "220deg" }}
                onClick={() => setShowDragDropFiles(true)}
              />
            </div>
            <button className="submit_button">Submit</button>
          </div>
        </div>
        {showDragDropFiles && (
          <div className="drag-drop-overlay">
            <DragDropFiles onClose={() => setShowDragDropFiles(false)} />
          </div>
        )}
      </form>
    </div>
  );
};

export default ReportModal;
