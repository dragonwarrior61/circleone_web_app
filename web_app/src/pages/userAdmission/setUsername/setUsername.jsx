import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
import usernameLogo from "../../../assets/userAdmission/usernameLogo.svg";
import bgElement from "../../../assets/userAdmission/ornamentUsername.png";
import "../userAdmission.scss";
import { useRegistrationContext } from "../../../context/registrationContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Username = () => {
  const { userData, updateUser } = useRegistrationContext();
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const handleUserFieldChange = (e) => {
    setUsername(e.target.value);
    setError(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "") {
      return toast.error("Please provide a username to check");
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/find-user`,
        { username: username },
      );
      if (response.data.exist === false) {
        setError(false);
        await updateUser((prevUserData) => ({ ...prevUserData, username }));
        console.log("Signup request payload:", { ...userData, username });
        try {
          const signUpResponse = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/auth/signup`,
            { ...userData, username },
          );
          if (signUpResponse.status === 200) {
            console.log(signUpResponse);
            toast.success("New User created successfully");
            const newUniqueIdentifier = signUpResponse.data.user._id;
            updateUser({ uniqueIdentifier: newUniqueIdentifier });
            navigate("/selectAvatar");
          } else {
            console.log("Unexpected status code:", signUpResponse.status);
          }
        } catch (error) {
          console.error("Error signing up:", error);
        }
      } else if (response.data.exist === true) {
        console.log(response.data.message);
        toast.error("Username is already taken. Please choose another.");
        setError(true);
        return; // Terminate the function if the username is taken
      }
    } catch (error) {
      toast.error("Something went wrong while checking the username.");
    }
  };
  return (
    <div className="full_create_username">
      <div className="space_block"></div>
      <img src={bgElement} alt="" className="bg_element" />
      <div className="transparent_block">
        <div className="modal_create_username">
          <div className="back_button">
            <Link to="/createpassword">
              <ArrowLeft color="blue" size={24} />
            </Link>
          </div>
          <img
            draggable="false"
            src={usernameLogo}
            alt="logo"
            className="username_logo"
          />
          <center>
            <div className="subtitles">
              <h3>Select Your Username</h3>
              <h4>
                Make it special and make sure not to<br></br>include personal
                information
              </h4>
            </div>
          </center>
          <form className="username_form" onSubmit={handleSubmit}>
            <div className="input_first_name">
              <input
                type="text"
                id="username"
                placeholder="Your Username"
                value={username}
                onChange={handleUserFieldChange}
              />
            </div>
            {error && <div className="error">{error}</div>}
            <button type="submit">Create Account</button>
          </form>

          <div className="costumer_pass">
            <p>
              Do you have any question? Contact<br></br>
              <b>
                <a href="/costumerCare">Customer Care</a>
              </b>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Username;
