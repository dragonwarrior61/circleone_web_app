import { useState } from "react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import Avatar from "../avatarProfile";
import "./userHover.scss";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { Divider } from "@mui/material";

const UserHover = () => {
  const [message, setMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="user_hover_container">
      <div className="top_color">
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
          style={{ height: "fit-content", marginTop: 12, marginRight: 5 }}
        >
          <MoreVertIcon
            style={{
              fontSize: 24,
              color: "var(--icon-colour)",
            }}
          />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: {
              marginLeft: "8.3px",
              marginTop: "-42px",
              width: "120px",
              backgroundColor: "var(--contrast)",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
              borderRadius: "4px",
            },
          }}
        >
          <MoreVertIcon
            style={{
              fontSize: 24,
              color: "var(--icon-colour)",
              outline: "none",
            }}
          />
          <div className="hover_sidebar_container">
            <span onClick={handleClose}>Remove Friend</span>
            <Divider />
            <span onClick={handleClose}>Block User</span>
          </div>
        </Menu>
      </div>
      <div className="hover_info_container">
        <div className="user_info_hover">
          <Avatar size="large" />
          <div className="subtitles_info_hover">
            <h6 className="name_hover">Keith H.</h6>
            <h6 className="username_hover">@keith_h</h6>
          </div>
        </div>
      </div>
      <div className="box_hover_container">
        <div className="info_hover_container ">
          <h6>About Me</h6>
          <p style={{ background: "transparent " }}>Playing games is fun!</p>
        </div>
        <div className="info_hover_container">
          <h6>Stats</h6>
          <div className="stats_hover">
            <p>10k Messages</p>
            <p>19 Spaces</p>
            <p>198k Interactions</p>
          </div>
        </div>
        <div className="info_hover_container">
          <h6>Roles</h6>
          <div className="stats_hover">
            <p>Creator</p>
            <p>Top 20 Official Space</p>
            <p>Admin</p>
            <AddIcon
              style={{
                padding: 4,
                color: "var(--icon-colour)",
                cursor: "pointer",
                background: "var(--full)",
                borderRadius: "50%",
              }}
            />
          </div>
        </div>
        <div className="message_hover">
          <div className="emoji_hover_container">
            <EmojiEmotionsIcon
              style={{ color: "var(--icon-colour)", cursor: "pointer" }}
            />
          </div>
          <input
            type="text"
            value={message}
            onChange={handleInputChange}
            placeholder="Say hey!"
          />
          <button>
            <SendIcon style={{ color: "white", fontSize: 15 }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserHover;
