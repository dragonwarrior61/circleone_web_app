import React, { useEffect, useState } from "react";
import "./avatarSettings.scss";
import SelectedAvatarDisplay from "./avatarDisplay";
import ImageIcon from "@mui/icons-material/Image";
import CheckIcon from "@mui/icons-material/Check";
import EmojiPicker from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
/* import { toPng } from "html-to-image"; */
import CreateIcon from "@mui/icons-material/Create";

const AvatarSettings = () => {
  const avatarOptions = [
    require("../../../assets/avatars/Basket.png"),
    require("../../../assets/avatars/Duck.png"),
    require("../../../assets/avatars/Female1.png"),
    require("../../../assets/avatars/Female2.png"),
    require("../../../assets/avatars/Female3.png"),
    require("../../../assets/avatars/Female4.png"),
    require("../../../assets/avatars/Male1.png"),
    require("../../../assets/avatars/Male2.png"),
    require("../../../assets/avatars/Male3.png"),
    require("../../../assets/avatars/Male4.png"),
    require("../../../assets/avatars/Female5.png"),
    require("../../../assets/avatars/Female6.png"),
    require("../../../assets/avatars/Female7.png"),
    require("../../../assets/avatars/Male5.png"),
    require("../../../assets/avatars/Male6.png"),
    require("../../../assets/avatars/Lion.png"),
    require("../../../assets/avatars/pizzaCheesey.png"),
    require("../../../assets/avatars/Unicorn.png"),
    require("../../../assets/avatars/sushi.png"),
    require("../../../assets/avatars/Hearts1.png"),
  ];

  const nonSelectableAvatars = [
    require("../../../assets/avatars/Duck.png"),
    require("../../../assets/avatars/Basket.png"),
    require("../../../assets/avatars/Lion.png"),
    require("../../../assets/avatars/pizzaCheesey.png"),
    require("../../../assets/avatars/Unicorn.png"),
    require("../../../assets/avatars/sushi.png"),
    require("../../../assets/avatars/Hearts1.png"),
  ];

  const objectOptions = [
    require("../../../assets/objects/Flower.png"),
    require("../../../assets/objects/camera.png"),
    require("../../../assets/objects/candy.png"),
    require("../../../assets/objects/Juice.png"),
    require("../../../assets/objects/Mobile.png"),
    require("../../../assets/objects/Ring.png"),
    require("../../../assets/objects/cup.png"),
    require("../../../assets/objects/Glasses.png"),
  ];

  const backgroundGradients = [
    "linear-gradient(140.84deg, #9B76FF 2.67%, #7812A7 108.53%)",
    "linear-gradient(135deg, #FFC4DD 0%, #FF74B0 100%)",
    "linear-gradient(135deg, #FFE0CC 0%, #FFB069 100%)",
    "linear-gradient(135deg, #FFEDB8 0%, #FFCB66 100%)",
    "linear-gradient(135deg, #C4DBFF 0%, #5391F9 100%)",
    "linear-gradient(315deg, #FF5F5F 0%, #FF9696 100%)",
  ];

  const bannerColors = [
    "#E0D0E8",
    "#D9DAEE",
    "#F0D4E0",
    "#E1EFDC",
    "#F7F5CB",
    "#F1E8D6",
  ];

  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[3]);
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
    backgroundGradients[0],
  );
  const [selectedObject, setSelectedObject] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedBannerColor, setSelectedBannerColor] = useState(
    bannerColors[0],
  );
  const [uploadedBannerImage, setUploadBannerImage] = useState(null);
  const [aboutMeText, setAboutMeText] = useState("");
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadBannerImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEmojiPicker = () => {
    setEmojiPickerVisible((prevVisibility) => !prevVisibility);
  };

  const handleEmojiClick = (emojiObject) => {
    const { emoji } = emojiObject;
    setAboutMeText((prevText) => prevText + emoji);
  };

  const handleAboutMeChange = (e) => {
    if (e.target.value.length <= 200) {
      setAboutMeText(e.target.value);
    }
  };

  const handleClickOutside = (event) => {
    if (
      emojiPickerVisible &&
      !event.target.closest(".emoji_picker_container_me")
    ) {
      setEmojiPickerVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiPickerVisible]);

  /*   const handleCaptureImage = () => {
    const node = document.getElementById("selected_avatar_display");
    toPng(node)
      .then((dataUrl) => {
        localStorage.setItem("capturedImage", dataUrl);
      })
      .catch((error) => {
        console.error("Error capturing image: ", error);
      });
  }; */

  return (
    <div className="content_box">
      <div className="settings_page_title">User Profile</div>

      <div className="selected_display_section">
        <h6>Preview</h6>
        <div className="preview_container">
          <div
            className="top_color_account"
            style={{
              background: uploadedBannerImage
                ? `url(${uploadedBannerImage})`
                : selectedBannerColor,
              marginTop: 25
            }}
          ></div>

          <div className="a_info_container">
            <SelectedAvatarDisplay
              avatar={uploadedImage || selectedAvatar}
              object={selectedObject}
              backgroundGradient={selectedBackgroundColor}
            />
            <div style={{ margin: "75px 0px 0px 25px" }}>
              <div className="name_account">Julian L.</div>
              <div className="username_account">@julian.lucas</div>
            </div>
          </div>
          <div className="profile_block_preview">
            <div className="settings_section" style={{ padding: 10, marginTop: 0 }}>
              <h6>User ID: 555-BD4</h6>
            </div>
            <div className="settings_section flex_column">
              <p className="about_me_title">About me</p>
              <p>{aboutMeText}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="settings_box">
        <div className="settings_section flex_column" style={{ marginTop: 0 }}>
          <h6>Avatars</h6>
          <div className="avatars_container">
            {avatarOptions.map((avatarUrl, index) => (
              <div
                key={index}
                className={`${
                  selectedAvatar === avatarUrl ? "selected_avatar" : ""
                }`}
              >
                <div
                  key={index}
                  className={`avatar_item`}
                  onClick={() => {
                    setSelectedAvatar(avatarUrl);
                    if (nonSelectableAvatars.includes(avatarUrl)) {
                      setSelectedObject(null);
                    }
                  }}
                  style={{ background: selectedBackgroundColor }}
                >
                  {avatarUrl === selectedAvatar && (
                    <div className="tick_filter">
                      <CheckIcon className="verification_icon" />
                    </div>
                  )}
                  <img src={avatarUrl} alt={`Avatar ${index + 1}`} />
                </div>
              </div>
            ))}
          </div>

          <h6>Hand Items</h6>
          <div className="background_gradients_container" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))" }}>
            {objectOptions.map((objectUrl, index) => (
              <div
                key={index}
                className={`object_item ${
                  selectedObject === objectUrl ? "selected_object" : ""
                }`}
                onClick={() => {
                  if (!nonSelectableAvatars.includes(selectedAvatar)) {
                    setSelectedObject(objectUrl);
                  }
                }}
              >
                {objectUrl === selectedObject && (
                  <div className="tick_filter">
                    <CheckIcon className="verification_icon" />
                  </div>
                )}

                {selectedAvatar && (
                  <img src={selectedAvatar} alt="Selected Avatar"/>
                )}
                <img src={objectUrl} alt={`Object ${index + 1}`} />
              </div>
            ))}
          </div>

          <h6>Choose Avatar Background</h6>
          <div className="background_gradients_container" style={{ marginBottom: 0 }}>
            {backgroundGradients.map((gradient, index) => (
              <div
                key={index}
                className="background_gradient_item"
                style={{ background: gradient }}
                onClick={() => setSelectedBackgroundColor(gradient)}
              >
                {gradient === selectedBackgroundColor && (
                  <CheckIcon className="verification_icon"/>
                )}
              </div>
            ))}
            <div className="background_gradient_item">
              <CreateIcon className="verification_icon"/>
            </div>
          </div>

          <div className="separator">
            <span className="line_separator"></span>
            <span className="text_separator">OR</span>
            <span className="line_separator"></span>
          </div>

          <input
            type="file"
            id="imageInput"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageUpload}
          />
          <div className="or_button"
            onClick={() => document.getElementById("imageInput").click()}
          >
            <ImageIcon />
            Upload Your Own Image
          </div>
        </div>

        <div className="settings_section flex_column">
          <h6>Choose a Banner</h6>

          <div className="background_gradients_container" style={{ marginBottom: 0 }}>
              {bannerColors.map((color, index) => (
                <div
                  className="banner_circle"
                  key={index}
                  style={{ background: color }}
                  onClick={() => {
                    setSelectedBannerColor(color);
                    setUploadBannerImage(null);
                  }}
                >
                  {selectedBannerColor === color && (
                    <CheckIcon className="verification_icon"/>
                  )}
                </div>
              ))}
              <div className="banner_circle">
                <CreateIcon className="verification_icon"/>
              </div>
          </div>

          <div className="separator">
            <span className="line_separator"></span>
            <span className="text_separator">OR</span>
            <span className="line_separator"></span>
          </div>

          <input
            type="file"
            id="bannerImageInput"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleBannerImageUpload}
          />
          <div className="or_button"
            onClick={() =>
              document.getElementById("bannerImageInput").click()
            }
          >
            <ImageIcon/>
            Upload Your Own Background
          </div>
        </div>
        
        <div className="settings_section flex_column">
          <h6>About Me</h6>
          <div className="option_description">This supports markdown and links.</div>
          
          <div className="textarea_container">
            <div className="emoji_btn_me" onClick={toggleEmojiPicker}>
              <EmojiEmotionsIcon />
            </div>
            <textarea value={aboutMeText} placeholder="Add your bio" onChange={handleAboutMeChange} className="about_me_textarea"/>
            <div className="char_counter">{200 - aboutMeText.length}</div>

            {emojiPickerVisible && (
              <div className="emoji_picker_container_me">
                <EmojiPicker onEmojiClick={handleEmojiClick} emojiStyle="twitter"/>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarSettings;