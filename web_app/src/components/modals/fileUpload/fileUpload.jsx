import { useEffect, useState } from "react";
import filesDrag from "../../../assets/misc/filesDrag.png"
import shift from '../../../assets/misc/shift.png'
import "./fileUpload.scss";

const DragDropFiles = (props) => {
  const [isVisible] = useState(true);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 35 * 1024 * 1024) {
      let messageType = "";
      if (file.type.startsWith("image/")) {
        messageType = `Image: ${file.name}`;
      } else if (file.type.startsWith("video/")) {
        messageType = `Video: ${file.name}`;
      } else if (
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/zip",
          "application/x-rar-compressed",
        ].includes(file.type)
      ) {
        messageType = `File: ${file.name}`;
      } else {
        console.error("File type not supported");
        return;
      }
      props.onFileSelected(file, messageType.split(":")[0].toLowerCase());
      document.getElementById("fileInput").value = null;
    } else if (file && file.size > 25 * 1024 * 1024) {
      console.error("File size exceeds the limit");
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      const fileBlock = document.querySelector(".file_block");
      if (fileBlock && !fileBlock.contains(event.target)) {
        handleClose();
      }
    };
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  const handleClose = () => {
    props.onClose();
  };
  const onDragOver = (event) => {
    event.preventDefault();
  };
  const onDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        props.onFileSelected(file, "image");
      } else if (file.type.startsWith("video/")) {
        props.onFileSelected(file, "video");
      }
    }
  };
  return (
    <div className="drag_container">
      {isVisible && (
        <div
          className="file_block"
          onClick={() => document.getElementById("fileInput").click()}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <img src={filesDrag} alt="files" className="file_img" />
          <div className="subtitles_files">
            <h5 className="upload_to">Upload to James L.</h5>
            <p className="text_files">
              You can add comments before uploading
              <br />
              Hold <img src={shift} alt="shift" /> to upload directly
            </p>
          </div>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
};
export default DragDropFiles;