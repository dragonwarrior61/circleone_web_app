import React, { useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AvatarImg from "../../assets/holder/avatar_large.png";
import "./avatarProfile.scss";

const Avatar = ({ size = "small", showStatusIcon = true }) => {
  const [status, setStatus] = useState("online");
  const [anchorEl, setAnchorEl] = useState(null);

  const avatarSrc = localStorage.getItem("capturedImage") || AvatarImg;

  const handleStatusIconClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    handleClose();
  };

  const iconStyle = {
    borderRadius: "50%",
    boxSizing: "border-box",
  };

  const sizeToIconStyle = {
    small: { marginLeft: "-14px", marginTop: "22px", fontSize: "12px" },
    large: { marginLeft: "-20px", marginTop: "20px", fontSize: "14px" },
    xl: { marginLeft: "-25px", marginTop: "80%", fontSize: "24px" },
  };

  const sizeToContainerStyle = {
    small: { width: "12px", height: "12px" },
    large: { width: "20px", height: "20px" },
    xl: { width: "30px", height: "30px" },
  };

  return (
    <div className="avatar_status">
      <img
        src={avatarSrc}
        alt="Avatar"
        className="avatar"
        style={{
          width: size === "small" ? 40 : size === "large" ? 70 : 100,
          height: size === "small" ? 40 : size === "large" ? 70 : 100,
        }}
      />
      {showStatusIcon && (
        <div
          className="status_icon one_px_outline"
          onClick={handleStatusIconClick}
          style={sizeToIconStyle[size]}
        >
          {status === "online" && (
            <div className="icon_container" style={sizeToContainerStyle[size]}>
              <CircleIcon
                style={{
                  ...iconStyle,
                  color: "var(--green)",
                  fontSize: sizeToIconStyle[size].fontSize,
                }}
              />
            </div>
          )}
          {status === "away" && (
            <div className="icon_container" style={sizeToContainerStyle[size]}>
              <DarkModeIcon
                style={{
                  color: "var(--yellow)",
                  fontSize: sizeToIconStyle[size].fontSize,
                }}
              />
            </div>
          )}
          {status === "offline" && (
            <div className="icon_container" style={sizeToContainerStyle[size]}>
              <CircleIcon
                style={{
                  ...iconStyle,
                  color: "var(--red)",
                  fontSize: sizeToIconStyle[size].fontSize,
                }}
              />
            </div>
          )}
          {status === "working" && (
            <div className="icon_container" style={sizeToContainerStyle[size]}>
              <CircleIcon
                style={{
                  ...iconStyle,
                  color: "var(--purple)",
                  fontSize: sizeToIconStyle[size].fontSize,
                }}
              />
            </div>
          )}
        </div>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={(e) => e.stopPropagation()}
        PaperProps={{
          style: {
            width: "30ch",
            backgroundColor: "rgba(255,  255,  255,  0.8)",
          },
        }}
      >
        {["online", "away", "offline", "working"].map((state) => (
          <MenuItem
            key={state}
            onClick={() => handleStatusChange(state)}
            style={{ minHeight: "50px" }}
          >
            <ListItemIcon>
              {state === "online" && (
                <CircleIcon
                  style={{
                    color: "var(--green)",
                    fontSize: "20px",
                  }}
                />
              )}
              {state === "away" && (
                <DarkModeIcon
                  style={{ color: "var(--yellow)", fontSize: "20px" }}
                />
              )}
              {state === "offline" && (
                <CircleIcon
                  style={{
                    color: "var(--red)",
                    fontSize: "20px",
                  }}
                />
              )}
              {state === "working" && (
                <CircleIcon
                  style={{
                    color: "var(--purple)",
                    fontSize: "20px",
                  }}
                />
              )}
            </ListItemIcon>
            <ListItemText
              primary={state.charAt(0).toUpperCase() + state.slice(1)}
              secondary={
                state === "online"
                  ? "Available to chat"
                  : state === "away"
                  ? "Away for a short while"
                  : state === "offline"
                  ? "Not available"
                  : "Focused on work, slow responses"
              }
              primaryTypographyProps={{ style: { fontWeight: "bold" } }}
              secondaryTypographyProps={{ style: { fontSize: "0.8rem" } }}
            />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Avatar;