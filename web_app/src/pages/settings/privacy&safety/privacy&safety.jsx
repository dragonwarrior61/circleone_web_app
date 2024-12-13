import React, { useState } from "react";
import "./privacy&safety.scss";
import CustomSwitch from "../includes/customSwitch";
import "../settings.scss";

const PrivacySafety = () => {
  const [selectedImageOption, setSelectedImageOption] = useState("");
  const [selectedExplicitOption, setSelectedExplicitOption] = useState("");

  const optionsImage = [
    {
      id: "option1",
      title: "Blur All Images",
      description: "All images sent by users will be blurred",
    },
    {
      id: "option2",
      title: "Filter All Images",
      description: "All images sent by users will be scanned and filtered",
    },
    {
      id: "option3",
      title: "Filter Images From Non-Friends",
      description:
        "All images sent by users that aren't friended will be scanned and filtered",
    },
    {
      id: "option4",
      title: "Don’t Filter Content",
      description: "Images will never be filtered",
    },
  ];

  const optionsExplicit = [
    {
      id: "option5",
      title: "Filter Explicit Language",
      description: "Content will be filtered for explicit language and personal information",
    },
    {
      id: "option6",
      title: "Don’t Filter Explicit Language",
      description: "Content will not be filtered for explicit language and personal information",
    },
  ];

  const dmFriendOptions = [
    {
      id: "option7",
      title: "Allow Direct Messages From Users in Mutual Spaces",
      description:
        "Users in the same spaces as you will be able to message you directly",
      state: useState(false),
    },
    {
      id: "option8",
      title: "Allow New Friend Requests",
      description: "New friend requests will be sent to you",
      state: useState(false),
    },
    {
      id: "option9",
      title: "Block Friend Requests From Non-Mutuals",
      description:
        "Friend requests from users without mutual friends or spaces will be blocked",
      state: useState(false),
    },
  ];

  return (
    <div className="content_box">
      <div className="settings_page_title">Privacy & Safety</div>
      <div className="settings_box">
        <div className="subtitles" style={{ padding: 0 }}>
          <h6>Image Filter</h6>
          <p className="learn_setting">Learn more here</p>
        </div>

        {optionsImage.map((option) => (
          <div key={option.id} className="radio_container">
            <input
              type="radio"
              id={option.id}
              name="imageFilter"
              value={option.id}
              checked={selectedImageOption === option.id}
              onChange={() => setSelectedImageOption(option.id)}
            />
            <label htmlFor={option.id}>
              <strong className="option_title">{option.title}</strong>

              <span className="option_description">
                {option.description}
              </span>
            </label>
          </div>
        ))}

        <div className="subtitles" style={{ padding: "40px 0 0 0" }}>
          <h6>Explicit Language</h6>
          <p className="learn_setting">Learn more here</p>
        </div>

        {optionsExplicit.map((option) => (
          <div key={option.id} className="radio_container">
            <input
              type="radio"
              id={option.id}
              name="languageFilter"
              value={option.id}
              checked={selectedExplicitOption === option.id}
              onChange={() => setSelectedExplicitOption(option.id)}
            />
            <label htmlFor={option.id}>
              <strong className="option_title">{option.title}</strong>

              <span className="option_description">
                {option.description}
              </span>
            </label>
          </div>
        ))}

        <div className="subtitles" style={{ padding: "40px 0 0 0" }}>
          <h6>Direct Messages & Friend Requests</h6>
        </div>
        {dmFriendOptions.map(({ id, title, description }) => (
          <div className="settings_section" key={id}>
            <div>
              <span className="option_title">{title}</span>
              <br />
              <span className="option_description">{description}</span>
            </div>
            <label>
              <CustomSwitch />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacySafety;