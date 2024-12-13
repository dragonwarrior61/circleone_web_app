//This component allows the users to login with their passwords
import { useState } from "react";
import lock from "../../../assets/userAdmission/lock.svg";
import { useNavigate } from "react-router-dom";
import "../userAdmission.scss";
import bgElement from "../../../assets/userAdmission/linespass.png";
import bgElement2 from "../../../assets/userAdmission/ornamentPass.png";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRegistrationContext } from "../../../context/registrationContext";
import axios from "axios";

const EnterPassword = () => {
  const { userData, updateUser } = useRegistrationContext();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password === "") {
      return toast.error("Password field can not be left empty");
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        {
          email: userData.email,
          password: password,
        },
      );
      const { data } = response;
      if (data.status === "SUCCESS") {
        toast.success("Login successful!");
        updateUser({ isLoggedIn: true });
        navigate("/main");
      } else if (data.status === "FAILED") {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      toast.error("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div className="full_password">
      <div className="space_block"></div>
      <img src={bgElement} alt="lines" className="bg_element" />
      <img src={bgElement2} alt="ornament" className="bg_element2" />
      <div className="transparent_block">
        <img draggable="false" src={lock} alt="lock" className="lock" />
        <div className="password_text">
          <h3>Enter Your Password</h3>
          <h4>Keep it Secure & Confidential</h4>
        </div>
        <form className="enter_password_form" onSubmit={handleSubmit}>
          <div className="input_password">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Enter Your Password"
              onChange={handlePasswordChange}
            />
            <span className="password_icon" onClick={handleShowPassword}>
              {showPassword ? <Eye /> : <EyeSlash />}
            </span>
          </div>
          <button type="submit" className="btn_password">
            Continue
          </button>
        </form>
        <div className="forgot_password_login">
          <h5>Forgotten Password</h5>
        </div>
        <div className="costumer_pass">
          <p>
            Do you have any question? Contact<br></br>
            <b>
              <a href="/CustomerCare" target="_blank">
                Customer Care
              </a>
            </b>
          </p>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default EnterPassword;