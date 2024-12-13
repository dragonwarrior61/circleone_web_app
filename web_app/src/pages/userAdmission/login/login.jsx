import { useState } from "react";
import axios from "axios";
import { ArrowRightShort } from "react-bootstrap-icons";
import fullLogo from "../../../assets/branding/logo_full_main.svg";
import bgElement from "../../../assets/background/ornament.png";
import bgElement2 from "../../../assets/background/lines.png";
import { ToastContainer, toast } from "react-toastify";
import "../userAdmission.scss";
import { useNavigate } from "react-router-dom";
import { useRegistrationContext } from "../../../context/registrationContext";

const Login = () => {
  const navigate = useNavigate();
  const { updateUser } = useRegistrationContext();
  const [email, setEmail] = useState(sessionStorage.getItem("email") || "");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Button clicked!");
    updateUser({ email: email });
    if (!email || !isValidEmail(email)) {
      toast.error("The email is not valid.");
      console.log("Email format not valid");
      return;
    }

    if (!email) {
      toast.error("Please provide an Email to get started");
      console.log("Please enter your email.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/find-email`,
        { email },
      );
      const { exist } = response.data;
      if (exist === true) {
        console.log("Email found");
        navigate("/password");
      } else if (exist === false) {
        console.log("Email not registered.");
        navigate("/welcome");
      } else {
        console.log("Unexpected status code:", response.status);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin(event);
    }
  };

  return (
    <div className="full_sign_in">
      <div className="space_block"></div>
      <img src={bgElement} alt="" className="bg_element" />
      <img src={bgElement2} alt="" className="bg_element2" />
      <div className="transparent_block">
        <div className="modal_email">
          <img
            draggable="false"
            src={fullLogo}
            alt="logo"
            className="circlone_logo"
          />
          <div className="subtitles">
            <h3>The Inclusive Social Space</h3>
            <h4>Get Started With Circlone</h4>
          </div>
          <div className="input_email">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <ArrowRightShort />
          </div>
        </div>
        <div className="button_login">
          <button onClick={handleLogin} id="continueButton">
            Continue
          </button>
        </div>
        <div className="copyrights">
          By signing up you are in agreement with
          <br></br>our
          <a href="/terms" target="_blank" rel="noopener noreferrer">
            {" "}
            <b>Terms & Conditions</b>
          </a>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;