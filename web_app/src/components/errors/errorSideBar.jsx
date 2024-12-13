import React from "react";
import Logo from "../../assets/branding/circloneLogo.svg";

const ErrorSideBar = () => {
  return (
    <div className="error_sidebar_body">
      <div className="error_sidebar_container">
        <img src={Logo} alt="logo" className="logo_error" />
        <div className="error_sidebar_subtitles">
          <h6>Scott had an accident, we couldn’t load the navigator</h6>
          <p>Do you need Help? Please Contact</p>
          <span>Costumer Care</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorSideBar;