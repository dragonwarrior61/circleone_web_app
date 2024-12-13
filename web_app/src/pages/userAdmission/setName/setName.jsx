import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
import usernameLogo from "../../../assets/userAdmission/usernameLogo.svg";
import bgElement from "../../../assets/userAdmission/ornamentUsername.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRegistrationContext } from "../../../context/registrationContext";

const SetName = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showLastName, setShowLastName] = useState(false);
  const { updateUser } = useRegistrationContext();
  const navigate = useNavigate();

  const isValidName = (name) => {
    return /^[a-zA-Z\s]+$/.test(name);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setShowLastName(event.target.value !== "");
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValidName(firstName) || !isValidName(lastName)) {
      toast.error("Invalid Name! Please enter valid characters");
      return;
    }

    updateUser({ fName: firstName });
    updateUser({ lName: lastName });
    navigate("/CreatePassword");
  };

  return (
    <div className="full_create_username">
      <div className="space_block"></div>
      <img src={bgElement} alt="" className="bg_element" />
      <div className="transparent_block">
        <div className="modal_create_username">
          <div className="back_button">
            <Link to="/otpRegister">
              <ArrowLeft color="blue" size={24} />
            </Link>
          </div>

          <center>
            <img
              style={{ marginBottom: 30 }}
              draggable="false"
              src={usernameLogo}
              alt="logo"
              className="username_logo"
            />

            <div className="subtitles">
              <h3>Your Registered Name</h3>
              <h4>
                Ensure that this is the name recorded on your government-issued
                ID
              </h4>
            </div>
          </center>
          <form className="username_form" onSubmit={handleSubmit}>
            <div className="input_first_name">
              <input
                type="text"
                id="firstName"
                placeholder="Your First Name"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </div>
            {showLastName && (
              <div className="input_last_name">
                <input
                  type="text"
                  id="lastName"
                  placeholder="Your Last Name"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </div>
            )}
            <button type="submit">Continue </button>
          </form>
          <h5>Circlone will never display your full last name.</h5>
          <div className="costumer_pass">
            <p>
              Do you have any question? Contact<br></br>
              <b>
                <a href="/custumerCare">Customer Care</a>
              </b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetName;
