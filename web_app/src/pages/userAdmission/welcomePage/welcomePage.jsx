import circloneLogo from "../../../assets/userAdmission/circloneLogo.png";
import bgElement from "../../../assets/userAdmission/ornamentWelcome.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegistrationContext } from "../../../context/registrationContext";
const WelcomePage = () => {
  const navigate = useNavigate();
  const { userData, updateUser } = useRegistrationContext();
  const email = userData.email;
  const sendOTP = async () => {
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
        navigate("/");
      } else if (response.status === 201) {
        toast.error(response.data.errorMessage);
        navigate("/");
      }
    } catch (error) {
      console.error("Response data:", error.response.data);
      if (error.response) {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="welcome_page_container">
      <img src={bgElement} alt="" className="bg_element" />
      <div className="logo_welcome">
        <img src={circloneLogo} alt="logo" />
      </div>
      <div className="welcome_subtitles">
        <h5>Welcome To Circlone</h5>
        <p className="text_welcome">
          The inclusive social space, built around a safer and more vibrant
          society.
        </p>
        <p className="hashtag_welcome">#WeAreJustGettingStarted</p>
      </div>
      <div className="welcome_button">
        <button onClick={sendOTP}>Get Started</button>
      </div>
    </div>
  );
};

export default WelcomePage;
