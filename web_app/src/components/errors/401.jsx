import React from "react";
import Img401 from "../../assets/holder/Error401.svg";

const Error401 = () => {
  return (
    <div className="error_body">
      <img src={Img401} alt="error-401" className="error_image" />
      <div className="subtitles_error">
        <h6>Whoops You Hit A Roadblock</h6>
        <p>You don’t have the correct permissions to view this page</p>
      </div>
    </div>
  );
};

export default Error401;