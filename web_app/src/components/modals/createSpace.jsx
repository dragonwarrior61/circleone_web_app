import { useState, useRef } from "react";
import { Radio } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import SearchIcon from "@mui/icons-material/Search";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import CloseIcon from "@mui/icons-material/Close";
import "./modal.scss";
import "./modal.scss";

const CreateSpace = (props) => {
  const [selectedContainer, setSelectedContainer] = useState("private");
  const [setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleContainerChange = (event) => {
    setSelectedContainer(event.target.value);
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handlePrivateContainerClick = () => {
    setSelectedContainer("private");
  };

  const handlePublicContainerClick = () => {
    setSelectedContainer("public");
  };

  return (
    <div className="popup_content">
      <div className="close_button" onClick={props.collapsePopup}>
        <CloseIcon style={{ fontSize: 24 }} />
      </div>
      <h5 className="title_block">Create Space</h5>
      <div className="radio_selectors">
        <div
          className={`private_container ${
            selectedContainer === "private" ? "selected_items" : ""
          }`}
          onClick={handlePrivateContainerClick}
        >
          <Radio
            value="private"
            checked={selectedContainer === "private"}
            onChange={handleContainerChange}
            style={{ marginLeft: 160 }}
          />
          <div className="private_icon">
            <LockIcon
              style={{
                fontSize: 38,
                marginTop: 30,
                marginBottom: 20,
                color: "var(--icon-colour)",
              }}
            />
          </div>
          <h5 className="private_name">Private Space</h5>
          <p>
            Create a private space. Users will only be able to join the space if
            they have been invited by an authorised user.
          </p>
        </div>
        <div className="space_containers"></div>
        <div
          className={`public_container ${
            selectedContainer === "public" ? "selected_items" : ""
          }`}
          onClick={handlePublicContainerClick}
        >
          <Radio
            value="public"
            checked={selectedContainer === "public"}
            onChange={handleContainerChange}
            style={{ marginLeft: 160 }}
          />
          <div className="public_icon">
            <SearchIcon
              style={{
                fontSize: 38,
                marginTop: 30,
                marginBottom: 20,
                color: "var(--icon-colour)",
              }}
            />
          </div>
          <h5 className="public_name">Public Space</h5>
          <p>
            Create a public space. Your space will be displayed in our directory
            and anyone will be able to join.
          </p>
        </div>
      </div>
      <div className="space_options">
        <div className="upload_image_space" onClick={handleUploadClick}>
          <InsertPhotoIcon /> Upload Image
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
        <input
          className="name_space"
          type="text"
          name="space-name"
          id=""
          placeholder="Space Name"
        />
        <div className="select_menu_space">
          <select
            name="space-menu"
            id="form-space"
            className="form_control_space"
          >
            <option selected disabled hidden>
              Select Space Category
            </option>
          </select>
        </div>
        <button className="create_space_button">Create Space</button>
      </div>
    </div>
  );
};

export default CreateSpace;
