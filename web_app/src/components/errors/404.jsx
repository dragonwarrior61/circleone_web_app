import React from "react";
import Img404 from "../../assets/holder/Error404.svg";
import "./error.scss";

const Error404 = () => {
  return (
    <div className="error_body content_box">
      <img src={Img404} alt="error-404" className="error_image" />
      <div className="subtitles_error">
        <h6>Lost? It’s a Great Show!</h6>
        <p>
          Need help? <u>Contact Support</u>
        </p>
      </div>
    </div>
  );
};

export default Error404;
