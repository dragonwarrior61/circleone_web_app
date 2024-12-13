import React, { useState } from "react";
import Avatar from "../../../components/userProfiles/avatarProfile";
import CustomSwitch from "../includes/customSwitch";
import DoneIcon from '@mui/icons-material/Done';
import "./safeguarding.scss";
import "../settings.scss";

const Safeguarding = () => {
  const [checkboxStates, setCheckboxStates] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
    checkbox6: false,
    checkbox7: false,
    checkbox8: false,
    checkbox9: false,
    checkbox10: false,
    checkbox11: false,
    checkbox12: false,
    checkbox13: false,
    checkbox14: false,
    checkbox15: false,
  });

  const handleCheckboxChange = (checkboxId) => {
    setCheckboxStates((prevState) => ({
      ...prevState,
      [checkboxId]: !prevState[checkboxId],
    }));
  };

  return (
    <div className="content_box">
      <div className="settings_page_title">Safeguarding Settings</div>
      <div className="settings_box">

        <div className="settings_section flex_column" style={{ padding: 20, marginTop: 0 }}>
          <div className="subtitles" style={{ padding: 0 }}>
            <div className="option_title">Select child associated with your account</div>
            <button className="purple_settings_button" style={{ position: "relative", padding: "5px 20px", marginTop: 0 }}>
              Add Account
            </button>
          </div>
          <div className="accounts_content">
            <div className="flex_row">
              <Avatar size="small" showStatusIcon={false} />
              <div className="accounts_content_text">
                <h6 style={{ color: "var(--match)" }}>Jess Lucas</h6>
                <p>JessLucas@example.com</p>
              </div>
            </div>
            <div className="small_gray_button">
              <p>Modify Settings</p>
            </div>
          </div>
          <div className="accounts_content">
            <div className="flex_row">
              <Avatar size="small" showStatusIcon={false} />
              <div className="accounts_content_text">
                <h6 style={{ color: "var(--match)" }}>Jess Lucas</h6>
                <p>JessLucas@example.com</p>
              </div>
            </div>
            <div className="small_gray_button">
              <p>Modify Settings</p>
            </div>
          </div>
        </div>

        <div className="settings_section">
          <div>
            <div className="option_title">View @user’s messages</div>
            <div className="option_description">
              Send a request to <b>@user</b> to view their direct messages
            </div>
          </div>
          <CustomSwitch />
        </div>

        <div className="settings_section">
          <div>
            <div className="option_title">View @user’s spaces & pages</div>
            <div className="option_description">
              Send a request to <b>@user</b> to view the spaces and pages that they
              have access to
            </div>
          </div>
          <CustomSwitch />
        </div>

        <div className="settings_section">
          <div>
            <div className="option_title">Allow profile banner & picture uploads</div>
            <div className="option_description">
              Allow <b>@user</b> to upload a photo to their profile picture or banner.
              This is publicly viewable. If enabled <b>@user</b> will only be able to
              use a Circlone.
            </div>
          </div>
          <CustomSwitch />
        </div> 

        <div className="settings_section flex_column">
          <div className="option_title">Friend Requests</div>
          <div className="option_description">
            Allow <b>@user</b> to share files and images with friends via direct
            messages.
          </div>
          <div className="radio_selector">
            <input type="radio" id="radioSelect" name="radioGroup" />
            <div className="radio_label">
              Allow <b>@user</b> to accept friend requests themselves
            </div>
          </div>
          <div className="radio_selector">
            <input type="radio" id="radioSelect" name="radioGroup" />
            <div className="radio_label">
              Allow <b>@user</b> to receive friend requests, but they must be accepted
              by a parent/guardian.
            </div>
          </div>
          <div className="radio_selector">
            <input type="radio" id="radioSelect" name="radioGroup" />
            <div className="radio_label">Block all friend requests</div>
          </div>
        </div>

        <div className="settings_section flex_column">
          <div className="option_title">Extra Options</div>
          <div className="check_boxes">
            <div
              className={`custom_checkbox ${
                checkboxStates.checkbox1 ? "checked" : ""
              }`}
              onClick={() => handleCheckboxChange("checkbox1")}
            >
              {checkboxStates.checkbox1 && <DoneIcon/>}
            </div>
            <div className="radio_label">
              Block friend request from users without any mutual friendships
            </div>
          </div>
          <div className="check_boxes">
            <div
              className={`custom_checkbox ${
                checkboxStates.checkbox2 ? "checked" : ""
              }`}
              onClick={() => handleCheckboxChange("checkbox2")}
            >
              {checkboxStates.checkbox2 && <DoneIcon />}
            </div>
            <div className="radio_label">
              Allow direct messages from users with mutual spaces
            </div>
          </div>
        </div>

        <div className="settings_section flex_column">
          <div className="option_title">Shareable Content</div>
          <div className="check_boxes">
            <div
              className={`custom_checkbox ${
                checkboxStates.checkbox3 ? "checked" : ""
              }`}
              onClick={() => handleCheckboxChange("checkbox3")}
            >
              {checkboxStates.checkbox3 && <DoneIcon />}
            </div>
            <div className="radio_label">Their full name</div>
          </div>
          <div className="check_boxes">
            <div
              className={`custom_checkbox ${
                checkboxStates.checkbox4 ? "checked" : ""
              }`}
              onClick={() => handleCheckboxChange("checkbox4")}
            >
              {checkboxStates.checkbox4 && <DoneIcon />}
            </div>
            <div className="radio_label">Explicit vocabulary</div>
          </div>
          <div className="check_boxes">
            <div
              className={`custom_checkbox ${
                checkboxStates.checkbox5 ? "checked" : ""
              }`}
              onClick={() => handleCheckboxChange("checkbox5")}
            >
              {checkboxStates.checkbox5 && <DoneIcon />}
            </div>
            <div className="radio_label">Phone numbers</div>
          </div>
          <div className="check_boxes">
            <div
              className={`custom_checkbox ${
                checkboxStates.checkbox6 ? "checked" : ""
              }`}
              onClick={() => handleCheckboxChange("checkbox6")}
            >
              {checkboxStates.checkbox6 && <DoneIcon />}
            </div>
            <div className="radio_label">Email addresses</div>
          </div>
          <div className="check_boxes">
            <div
              className={`custom_checkbox ${
                checkboxStates.checkbox7 ? "checked" : ""
              }`}
              onClick={() => handleCheckboxChange("checkbox7")}
            >
              {checkboxStates.checkbox7 && <DoneIcon />}
            </div>
            <div className="radio_label">Photos & files from friends</div>
          </div>
          <div className="check_boxes">
            <div
              className={`custom_checkbox ${
                checkboxStates.checkbox8 ? "checked" : ""
              }`}
              onClick={() => handleCheckboxChange("checkbox8")}
            >
              {checkboxStates.checkbox8 && <DoneIcon />}
            </div>
            <div className="radio_label">Photos & files from all users</div>
          </div>
          <div className="option_title" style={{ marginTop: 30 }}>Viewable Content</div>
          <div className="check_boxes">
            <div
              className={`custom_checkbox ${
                checkboxStates.checkbox9 ? "checked" : ""
              }`}
              onClick={() => handleCheckboxChange("checkbox9")}
            >
              {checkboxStates.checkbox9 && <DoneIcon />}
            </div>
            <div className="radio_label">Users full names</div>
          </div>
          <div className="check_boxes">
            <div
              className={`custom_checkbox ${
                checkboxStates.checkbox10 ? "checked" : ""
              }`}
              onClick={() => handleCheckboxChange("checkbox10")}
            >
              {checkboxStates.checkbox10 && <DoneIcon />}
            </div>
            <div className="radio_label">Users full names</div>
          </div>
          <div className="check_boxes">
            <div
              className={`custom_checkbox ${
                checkboxStates.checkbox11 ? "checked" : ""
              }`}
              onClick={() => handleCheckboxChange("checkbox11")}
            >
              {checkboxStates.checkbox11 && <DoneIcon />}
            </div>
            <div className="radio_label">Explicit vocabulary</div>
          </div>
          <div className="check_boxes">
            <div
              className={`custom_checkbox ${
                checkboxStates.checkbox12 ? "checked" : ""
              }`}
              onClick={() => handleCheckboxChange("checkbox12")}
            >
              {checkboxStates.checkbox12 && <DoneIcon />}
            </div>
            <div className="radio_label">Phone numbers</div>
          </div>
          <div className="check_boxes">
            <div
              className={`custom_checkbox ${
                checkboxStates.checkbox13 ? "checked" : ""
              }`}
              onClick={() => handleCheckboxChange("checkbox13")}
            >
              {checkboxStates.checkbox13 && <DoneIcon />}
            </div>
            <div className="radio_label">Email addresses</div>
          </div>
          <div className="check_boxes">
            <div
              className={`custom_checkbox ${
                checkboxStates.checkbox14 ? "checked" : ""
              }`}
              onClick={() => handleCheckboxChange("checkbox14")}
            >
              {checkboxStates.checkbox14 && <DoneIcon />}
            </div>
            <div className="radio_label">Photos & files from friends</div>
          </div>
          <div className="check_boxes" style={{ marginBottom: 8 }}>
            <div
              className={`custom_checkbox ${
                checkboxStates.checkbox15 ? "checked" : ""
              }`}
              onClick={() => handleCheckboxChange("checkbox15")}
            >
              {checkboxStates.checkbox15 && <DoneIcon />}
            </div>
            <div className="radio_label">Photos & files from all users</div>
          </div>
        </div>

        <div className="settings_section flex_column">
          <div className="option_title">Image Filtering</div>
          <div className="radio_selector_large">
            <input type="radio" id="radioSelect" name="radioGroup" />
            <div>
              <div className="option_title">Blur all images</div>
              <div className="option_description">All images within content will be blurred</div>
            </div>
          </div>
          <div className="radio_selector_large">
            <input type="radio" id="radioSelect" name="radioGroup" />
            <div>
              <div className="option_title">Filter all images</div>
              <div className="option_description">All images will be filtered for explicit images</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Safeguarding;
