import { useState } from "react";
import lock from "../../../assets/userAdmission/lock.svg";
import { Link, useNavigate } from "react-router-dom";
import "../userAdmission.scss";
import bgElement from "../../../assets/userAdmission/linespass.png";
import bgElement2 from "../../../assets/userAdmission/ornamentPass.png";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { ArrowLeft } from "react-bootstrap-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRegistrationContext } from "../../../context/registrationContext";

const CreatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordValid, setPasswordValid] = useState(false);
  const { updateUser } = useRegistrationContext();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    const isValid = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(
      event.target.value,
    );
    setPasswordValid(isValid);
    setPasswordMatch(event.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordMatch(event.target.value === password);
  };

  const handleShowPassword = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === confirmPassword && passwordValid) {
      toast.success("Passwords match and are valid!");
      updateUser({ password: password });
      navigate("/SetUsername");
    } else {
      if (!passwordValid) {
        toast.error(
          "Password must be at least 8 characters long, contain at least one uppercase letter, one number, and may contain special characters (@$!%*#?&)",
        );
      } else {
        toast.error("Passwords do not match!");
      }
    }
  };

  return (
    <div className="full_create_password">
      <div className="space_block"></div>
      <img src={bgElement} alt="lines" className="bg_element" />
      <img src={bgElement2} alt="ornament" className="bg_element2" />
      <div className="transparent_block">
        <div className="back_button">
          <Link to="/setName">
            <ArrowLeft color="blue" size={24} />
          </Link>
        </div>

        <img draggable="false" src={lock} alt="lock" className="lock" />
        <div className="password_text">
          <h3>Let’s Secure Your Account!</h3>
          <h4>Challenge: Make it memorable & unguessable</h4>
        </div>
        <form className="create_password_form" onSubmit={handleSubmit}>
          <div className="input_password">
            <input
              type={showPassword.password ? "text" : "password"}
              value={password}
              placeholder="Enter Your New Password"
              onChange={handlePasswordChange}
            />
            <span
              className="password_icon"
              onClick={() => handleShowPassword("password")}
            >
              {showPassword.password ? <Eye /> : <EyeSlash />}
            </span>
          </div>
          <div className="input_confirm_password">
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              value={confirmPassword}
              placeholder="Confirm Your Password"
              onChange={handleConfirmPasswordChange}
            />
            <span
              className="password_icon"
              onClick={() => handleShowPassword("confirmPassword")}
            >
              {showPassword.confirmPassword ? <Eye /> : <EyeSlash />}
            </span>
          </div>
          {!passwordMatch && (
            <p className="error-text">Passwords do not match!</p>
          )}
          <button type="submit" className="btn_password">
            Continue
          </button>
        </form>
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

export default CreatePassword;