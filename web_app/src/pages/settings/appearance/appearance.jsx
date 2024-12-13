import React, { useState } from "react";
import "./appearance.scss";
import "../settings.scss";
import Avatar from "../../../components/userProfiles/avatarProfile";
import Tick from "../../../assets/icons/tick-icon.svg";

const Appearance = () => {
  const [selectedTheme, setSelectedTheme] = useState("light");

  const selectTheme = (theme) => {
    setSelectedTheme(theme);
  };

  return (
    <div className="content_box">
      <div className="settings_page_title">Appearance</div>
      <div className="settings_box">
        <h6> Interface Theme</h6>
        <div className="settings_section" style={{ padding: 20, marginBottom: 20 }}>
          
          <div style={{ width: 'calc(50% - 10px)' }}>
            <h5>Light Theme</h5>
            <div
              className={`theme_container light_container ${
                selectedTheme === "light" ? "selected theme_selected" : ""
              }`}
              onClick={() => selectTheme("light")}
            >
              {selectedTheme === "light" && (
                <img src={Tick} alt="Selected" className="tick_icon" />
              )}
              <span className="theme_label light_label">Light</span>
            </div>
          </div>

          <div style={{ width: 'calc(50% - 10px)' }}>
            <h5>Dark Theme</h5>
            <div
              className={`theme_container dark_container ${
                selectedTheme === "dark" ? "selected theme_selected" : ""
              }`}
              onClick={() => selectTheme("dark")}
            >
              {selectedTheme === "dark" && (
                <img src={Tick} alt="Selected" className="tick_icon" />
              )}
              <span className="theme_label dark_label">Dark</span>
            </div>
          </div>

        </div>
        <h6>Preview</h6>
        <div className="preview_appearance_container">

          <div className="msg_appearance">
            <div className="msg_appearance_subtitles">
              <Avatar showStatusIcon={false} />
              <span>James R.</span>
              <p className="settings_desc">10.01 AM</p>
            </div>
            <div className="msg_appearance_text">
              Lorem ipsum dolor sit, amet consectetur.
              <br />
              Lorem ipsum dolor sit amet consectetur. Eu quisque a in blandit at
              condimentum porta ut nisl.
            </div>
          </div>

          <div className="msg_appearance">
            <div className="msg_appearance_subtitles">
              <Avatar showStatusIcon={false} />
              <span>James R.</span>
              <p className="settings_desc">10.01 AM</p>
            </div>
            <div className="msg_appearance_text">
              Lorem ipsum dolor sit, amet consectetur.
            </div>
          </div>
          
          <div className="msg_appearance">
            <div className="msg_appearance_subtitles">
              <Avatar showStatusIcon={false} />
              <span>James R.</span>
              <p className="settings_desc">10.01 AM</p>
            </div>
            <div className="msg_appearance_text">
              Lorem ipsum dolor sit, amet consectetur.
              <br />
              Lorem ipsum dolor sit amet consectetur. Eu quisque a in blandit at
              condimentum porta ut nisl.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Appearance;