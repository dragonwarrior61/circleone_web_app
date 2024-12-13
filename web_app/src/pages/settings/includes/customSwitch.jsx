import React, { useState } from "react";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import "./customSwitch.scss";

const CustomSwitch = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleSwitch = () => setIsActive(!isActive);

  return (
    <div
      className={`switch_container ${isActive ? "active" : "inactive"}`}
      onClick={toggleSwitch}
    >
      <div className="switch_circle">
        {isActive ? (
          <DoneIcon alt="Tick Purple" className="switch_icon" />
        ) : (
          <CloseIcon alt="Close Icon" className="close_icon switch_icon" />
        )}
      </div>
    </div>
  );
};

export default CustomSwitch;
