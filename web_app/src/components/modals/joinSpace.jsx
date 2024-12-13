import { useState, useEffect } from "react";
import JoinCompass from "./assets/joinCompass.svg";
import SearchIcon2 from "./assets/search.svg";
import CloseIcon from "@mui/icons-material/Close";
import CircloneIcon from "./assets/circlone_space_icon.svg";
import AnimalIcon from "./assets/animal_icon.svg";
import CircloneBanner from "./assets/circlone_img_space.svg";
import AnimalBanner from "./assets/the_animal.svg";
import BasketballBanner from "./assets/baskeball_image.svg";
import Verified from "./assets/official.svg";
import BasketballIcon from "./assets/basketball_icon.svg";
import "./modal.scss";

const JoinSpace = ({ handleClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const addNewSpaceElement = document.querySelector(".popup_content");

      if (addNewSpaceElement && !addNewSpaceElement.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleClose]);

  const spaces = [
    {
      id: 1,
      name: "Circlone™",
      banner: CircloneBanner,
      icon: CircloneIcon,
      users: 1283,
      interactions: "55k",
      description:
        "Circlone is a multi-media social media platform for tweens. Join the server!",
      verified: true,
    },
    {
      id: 2,
      name: "The Animal Club",
      banner: AnimalBanner,
      icon: AnimalIcon,
      users: 1283,
      interactions: "55k",
      description: "A server for animal lovers, dog lovers, cat lovers.",
      verified: false,
    },
    {
      id: 3,
      name: "Basketball 101",
      banner: BasketballBanner,
      icon: BasketballIcon,
      users: 1283,
      interactions: "55k",
      description:
        "We just absolutely love basketball. Will you get it through the hoop?",
      verified: false,
    },
  ];

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    const filteredSpaces = spaces.filter((space) =>
      space.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setSearchResults(filteredSpaces);
  };

  return (
    <div className="popup_content">
      <div className="close_button" onClick={handleClose}>
        <CloseIcon style={{ fontSize: 24 }} />
      </div>
      <img src={JoinCompass} style={{ marginTop: 50 }} />
      <div className="join_form_container">
        <h6 className="title_block">Join a Public Space</h6>
        <div className="search_spaces">
          <div className="search_icon">
            <img src={SearchIcon2} />
          </div>
          <input
            className="input_search_space"
            type="text"
            value={searchTerm}
            placeholder="Search Spaces..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleSearch(e.target.value);
            }}
          />
        </div>
        {searchResults.length > 0 && (
          <div className="search_results">
            {searchResults.map((result) => (
              <div key={result.id} className="search_result_card">
                <img
                  src={result.banner}
                  alt="Space Banner"
                  style={{ height: "100%" }}
                />
                <div className="space_divider">
                  <div className="space_info">
                    <div className="space_subtitles">
                      <div>
                        {result.verified && (
                          <img
                            src={Verified}
                            alt="Verified"
                            style={{ display: "inline-block" }}
                          />
                        )}
                        <h5 className="space_name_result">{result.name}</h5>
                      </div>
                      <div className="users_interactions_space">
                        <p>
                          {result.users} Users | {result.interactions}{" "}
                          Interactions
                        </p>
                      </div>
                    </div>
                    <img src={result.icon} className="space_icon" />
                  </div>
                  <p className="description_space_result">
                    {result.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinSpace;
