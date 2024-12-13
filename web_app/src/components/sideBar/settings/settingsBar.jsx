import { useState } from "react";
import "./settingsBar.scss";
import Avatar from "../../userProfiles/avatarProfile";
import LogoutIcon from "@mui/icons-material/Logout";

const SettingsSideBar = (props) => {
  const [activeItem, setActiveItem] = useState(null);
  const [showSafeguardingDiv, setShowSafeguardingDiv] = useState(false);

  const handleItemClick = (index) => {
    setActiveItem(index);
    setShowSafeguardingDiv(false);
  };

  const handleMyAccountClick = () => {
    handleItemClick(0);
    props.handleMyAccountClick();
  };

  const handleUserProfileClick = () => {
    handleItemClick(1);
    props.handleUserProfileClick();
  };

  const handlePrivacyClick = () => {
    handleItemClick(2);
    props.handlePrivacyClick();
  };

  const handleSafeguardingClick = () => {
    handleItemClick(6);
    props.handleSafeguardingClick();
    setShowSafeguardingDiv(!showSafeguardingDiv);
  };

  const handleAppearanceClick = () => {
    handleItemClick(8);
    props.handleAppearanceClick();
  };

  return (
    <div className="setting_bar_container channel_bar_for_settings">
      <div className="settings">
        <div className="side_bar_title" style={{ position: "relative" }}>
          <div className="space_bar_cat">
            <span>Settings</span>
          </div>
        </div>
        <h6>User Settings</h6>
        <ul>
          <li
            className={activeItem === 0 ? "active" : ""}
            onClick={handleMyAccountClick}
          >
            My Account
          </li>
          <li
            className={activeItem === 1 ? "active" : ""}
            onClick={handleUserProfileClick}
          >
            User Profile
          </li>
          <li
            className={activeItem === 2 ? "active" : ""}
            onClick={handlePrivacyClick}
          >
            Privacy & Safety
          </li>
          <li
            className={activeItem === 3 ? "active" : ""}
            onClick={() => handleItemClick(3)}
          >
            Subscriptions & Payment
          </li>
        </ul>

        <h6>Family Settings</h6>
        <ul>
          <li
            className={activeItem === 4 ? "active" : ""}
            onClick={() => handleItemClick(4)}
          >
            Add Account
          </li>
          <li
            className={activeItem === 5 ? "active" : ""}
            onClick={() => handleItemClick(5)}
          >
            Family Activity
          </li>
          <li
            className={activeItem === 6 ? "active" : ""}
            onClick={handleSafeguardingClick}
          >
            Safeguarding Settings
          </li>
          <li
            className={activeItem === 7 ? "active" : ""}
            onClick={() => handleItemClick(7)}
          >
            My Guardians
          </li>
        </ul>

        <h6>App Settings</h6>
        <ul>
          <li
            className={activeItem === 8 ? "active" : ""}
            onClick={handleAppearanceClick}
          >
            Appearance
          </li>
        </ul>
      </div>
      <div className="buttons_settings">
        <button className="log_out_button">
          Log Out <LogoutIcon style={{ fontSize: 16 }} />
        </button>
        <button className="exit_button">Contact Support</button>
        {showSafeguardingDiv && (
        <div className="safeguarding_div">
          <div className="safeguarding_account">
            <Avatar size="small" showStatusIcon={true} />
            <p>
              Editing
              <span>
                @user
              </span>
            </p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default SettingsSideBar;