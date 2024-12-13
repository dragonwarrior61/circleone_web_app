import React, { useState } from "react";
import "../settings.scss";
import Avatar from "../../../components/userProfiles/avatarProfile";

const MyAccount = () => {
  const EMAIL = "julian-lucas@gmail.com";
  const PASSWORD = "circlone123";

  const [isEmailHidden, setEmailHidden] = useState(true);
  const [isPasswordHidden, SetPasswordHidden] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isButtonEnabled, setButtonEnabled] = useState(false);

  const getHiddenEmail = (email) => {
    const charsToShow = Math.round(email.length * 0.7);
    const visiblePortion = email.substring(email.length - charsToShow);
    const hiddenPortion = "*".repeat(email.length - charsToShow);
    return `${hiddenPortion}${visiblePortion}`;
  };

  const toggleEmailVisibility = () => {
    setEmailHidden(!isEmailHidden);
  };

  const emailDisplay = isEmailHidden ? getHiddenEmail(EMAIL) : EMAIL;

  const getHiddenPassword = (password) => {
    return "*".repeat(password.length);
  };

  const togglePasswordVisibility = () => {
    SetPasswordHidden(!isPasswordHidden);
  };

  const passwordDisplay = isPasswordHidden
    ? getHiddenPassword(PASSWORD)
    : PASSWORD;

  const handleEditProfileClick = () => {
    setIsEditingProfile(!isEditingProfile);
    setButtonEnabled(!isButtonEnabled);
  };

  return (
    <div className="content_box">
      <div className="settings_page_title">My Account</div>
      <div className="settings_box">
        <div className="top_color_account" />
        <div className="a_info_container">
          <div style={{ marginTop: "15px" }}>
            <Avatar
              size="xl"
              showStatusIcon={true}
            />
          </div>
          <div style={{ margin: '75px 0px 0px 25px' }}>
            <h6 className="name_account">Julian L.</h6>
            <h6 className="username_account">@julian.lucas</h6>
          </div>
          <button
            className="purple_settings_button"
            onClick={handleEditProfileClick}
          >
            Edit Profile
          </button>
        </div>
        <div className="settings_section">
          <div>
            <h6>Legal Name</h6>
            <p>Julian Lucas</p>
            <div className="info_status">
              <span className="verify_icon_padding">Locked</span>
            </div>
          </div>
          <button className="gray_button" disabled={!isEditingProfile}>
            Contact Support
          </button>
        </div>
        <div className="settings_section">
          <div>
            <h6>Username</h6>
            <p>@julian.lucas</p>
          </div>
          <button className="gray_button" disabled={!isEditingProfile}>
            Edit
          </button>
        </div>
        <div className="settings_section">
          <div>
            <h6>Email</h6>
            <p>{emailDisplay}</p>
            <div className="info_status">
              <span className="verify_icon_padding">Verified</span>
            </div>
          </div>
          <button
            className={`gray_button`}
            disabled={!isEditingProfile}
            onClick={toggleEmailVisibility}
          >
            Edit
          </button>
        </div>
        <div className="settings_section">
          <div>
            <h6>Password</h6>
            <p>{passwordDisplay}</p>
          </div>
          <button
            className="gray_button"
            disabled={!isEditingProfile}
            onClick={togglePasswordVisibility}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;