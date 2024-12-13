import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import whiteLogo from "../../../src/assets/branding/logo_icon_filled_white.png";
import ProfileView from "../userProfiles/selfProfileTopRight/profileView";

import "./headerSearchBar.scss";
import SearchBar from "../sideBar/includes/searchBar";

const HeaderSearchBar = () => {
  return (
    <header className="header_search_bar">
      <img
        className="logo_img"
        draggable="false"
        src={whiteLogo}
        data-toggle="tooltip"
        title="Home"
      />
      <div className="search_box form-control">
        <SearchBar
          placeholder="Search Circlone"
          className="search_box_input form-control"
        />
        <div style={{ width: 50, display: "inline-block" }}>
          <SearchRoundedIcon
            style={{ marginRight: 4, marginTop: -2, width: 18, opacity: "0.6" }}
          />
          <div
            style={{
              display: "inline-block",
              opacity: 0.6,
              paddingRight: 4,
              marginTop: -2,
            }}
          >
            |
          </div>
          <TuneRoundedIcon
            style={{ opacity: "0.6", marginTop: -2, width: 18 }}
          />
        </div>
      </div>
      <ProfileView />
    </header>
  );
};

export default HeaderSearchBar;
