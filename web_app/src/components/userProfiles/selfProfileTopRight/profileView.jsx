import { useEffect, useState } from "react";
import Avatar from "../avatarProfile";
import NotificationsIcon from '@mui/icons-material/Notifications';
import UserHover from "../profileTooltip/userHover";
import "./profileView.scss";

const ProfileView = () => {
  const [experience, setExperience] = useState(0);
  const [level, setLevel] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const lastLoaded = localStorage.getItem("lastLoaded");
    const currentDate = new Date().getTime();

    if (!lastLoaded || currentDate - lastLoaded >= 24 * 60 * 60 * 1000) {
      setLevel((prevLevel) => prevLevel + 1);
      setExperience((prevExperience) => prevExperience + 0.5);
      localStorage.setItem("lastLoaded", currentDate);
    }
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="profile_view_container">
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="avatar_profile">
          <Avatar size="small" />
        </div>
        {isHovered && <UserHover />}
      </div>
      <div className="profile_info">
        <div className="username_profile_view">
          <h5>@Keith H.</h5>
          <p>Online</p>
          <div className="experience_profile">
            <div className="experience_bar_container">
              <div
                className="experience_bar_progress"
                style={{ width: `${experience}%` }}
              ></div>
            </div>
            <span className="level_indicator">Lvl {level}</span>
          </div>
        </div>
      </div>
      <div className="notifications" style={{ position: "relative" }}>
        <NotificationsIcon style={{ fill: "var(--yellow)" }} className="one_px_outline" alt="notification"/>
        <div className="notifications_counter">10</div>
      </div>
    </div>
  );
};

export default ProfileView;