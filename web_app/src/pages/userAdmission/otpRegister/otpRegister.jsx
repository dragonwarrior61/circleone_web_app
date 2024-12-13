import { useState, useEffect } from "react";
import axios from "axios";
import OtpInput from "react-otp-input";
import lock from "../../../assets/userAdmission/lock.svg";
import bgElement from "../../../assets/userAdmission/ornamentopt.png";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../userAdmission.scss";
import { useRegistrationContext } from "../../../context/registrationContext";

const OtpRegister = () => {
  const [otp, setOtp] = useState("");
  const [counter, setCounter] = useState(60);
  const { userData, updateUser } = useRegistrationContext();

  const navigate = useNavigate();

  const handleOtpChange = (newOtp) => {
    setOtp(newOtp.toUpperCase());
  };

  const handleResend = async (event) => {
    event && event.preventDefault();
    setCounter(60);

    const email = userData.email;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/send-otp`,
        {
          email,
        },
      );
      if (response.status === 200) {
        const uniqueIdentifier = response.data.uniqueIdentifier;
        updateUser({ uniqueIdentifier: uniqueIdentifier });
      } else if (response.status === 201) {
        toast.error(response.data.errorMessage);
      } else {
        console.log("Unexpected status code:", response.status);
      }
    } catch (error) {
      console.error("Response data:", error.response.data);
      if (error.response) {
        toast.error("Something went wrong");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { uniqueIdentifier, email } = userData;
    if (otp === "") {
      return toast.error("Please provide the OTP to complete authentication");
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/verify-otp`,
        {
          uniqueIdentifier,
          providedOTP: otp,
          email,
        },
      );
      var verifiedStatus = response.data.verified;
      if (response.status === 200) {
        updateUser({ verified: verifiedStatus });
        sessionStorage.setItem("verified", verifiedStatus);
        navigate("/setName");
      } else if (response.status === 201) {
        let errorMessage = response.data.error || "OTP Code invalid or expired";
        toast.error(errorMessage);

        updateUser({ verified: verifiedStatus });
      } else {
        console.log(response);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("OTP Code invalid or expired");
      } else {
        console.error("Response data:", error.response.data);
      }
    }
  };

  useEffect(() => {
    handleResend(); 
  }, []);

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  const inputStyle = {
    width: "3rem",
    height: "3rem",
    margin: "0 1rem",
    fontSize: "2rem",
    borderRadius: "8px",
    padding: "0.5rem",
    textAlign: "center",
    color: "#333",
    border: "2px solid grey",
    borderImage: "linear-gradient(to right, #cc2b5e, #purple) 1",
    borderImageSlice: "1",
    boxShadow: otp ? "none" : "0 0 10px rgba(0, 0, 0, 0.2)",
  };

  return (
    <div className="full_otp">
      <img src={bgElement} alt="bgElement" className="bg_element" />
      <div className="space_block"></div>
      <div className="transparent_block">
        <div className="back_button">
          <Link to="/login">
            <ArrowLeft color="blue" size={24} />
          </Link>
        </div>
        <img src={lock} alt="lock" className="lock" />
        <div className="subtitles_otp">
          <h3>Verification Code</h3>
          <p>
            We sent a verification code to your
            <br />
            email address, please enter the
            <br />
            verification code.
          </p>
        </div>
        <form className="otp_form" onSubmit={handleSubmit}>
          <div className="otp_input_container">
            <OtpInput
              value={otp}
              onChange={handleOtpChange}
              numInputs={6}
              separator={<span></span>}
              renderInput={(props, i) => (
                <input
                  {...props}
                  className={`otpInput ${
                    otp.length - 1 >= i ? "filled" : "empty"
                  } index--${i}`}
                  style={inputStyle}
                  key={i}
                />
              )}
              containerStyle={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2rem",
              }}
              isInputNum
            />
          </div>
          <button className="btn_submit" type="submit">
            Verify email
          </button>
          <button
            className="btn_send_again"
            disabled={counter > 0}
            onClick={handleResend}
          >
            Send Again {counter > 0 ? `in ${counter} seconds` : ""}
          </button>
        </form>
        <div className="costumer_pass">
          <p>
            Do you have any questions? Contact our team <br />
            <b>
              <a href="/CustomerCare" target="_blank" rel="noopener noreferrer">
                Customer Care
              </a>
            </b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpRegister;