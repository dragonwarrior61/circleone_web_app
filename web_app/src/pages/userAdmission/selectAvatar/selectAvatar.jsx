import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegistrationContext } from "../../../context/registrationContext";
import Loader from "../../../components/loader/Loader.jsx";
import bgElement from "../../../assets/userAdmission/ornamentAvatar.png";
import AvatarList from "./avatars/avatars.jsx";
import AvatarObjects from "./avatarObjects/avatarObjects.jsx";
import BackgroundList from "./backgrounds/backgrounds.jsx";
import "./selectAvatar.scss";

const SelectAvatar = () => {
  const { userData } = useRegistrationContext();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const avatars = [
    {
      image: require("./avatars/assets/avatars/Basket.png"),
      type: "non-human",
    },
    {
      image: require("./avatars/assets/avatars/Duck.png"),
      type: "non-human",
    },
    {
      image: require("./avatars/assets/avatars/Female1.png"),
      type: "human",
    },
    {
      image: require("./avatars/assets/avatars/Female2.png"),
      type: "human",
    },
    {
      image: require("./avatars/assets/avatars/Female3.png"),
      type: "human",
    },
    {
      image: require("./avatars/assets/avatars/Female4.png"),
      type: "human",
    },
    {
      image: require("./avatars/assets/avatars/Male1.png"),
      type: "human",
    },
    {
      image: require("./avatars/assets/avatars/Male2.png"),
      type: "human",
    },
    {
      image: require("./avatars/assets/avatars/Male3.png"),
      type: "human",
    },
    {
      image: require("./avatars/assets/avatars/Male4.png"),
      type: "human",
    },
    {
      image: require("./avatars/assets/avatars/Female5.png"),
      type: "human",
    },
    {
      image: require("./avatars/assets/avatars/Female6.png"),
      type: "human",
    },
    {
      image: require("./avatars/assets/avatars/Female7.png"),
      type: "human",
    },
    {
      image: require("./avatars/assets/avatars/Male5.png"),
      type: "human",
    },
    {
      image: require("./avatars/assets/avatars/Male6.png"),
      type: "human",
    },
    {
      image: require("./avatars/assets/avatars/Lion.png"),
      type: "non-human",
    },
    {
      image: require("./avatars/assets/avatars/pizzaCheesey.png"),
      type: "non-human",
    },
    {
      image: require("./avatars/assets/avatars/Unicorn.png"),
      type: "non-human",
    },
    {
      image: require("./avatars/assets/avatars/sushi.png"),
      type: "non-human",
    },
    {
      image: require("./avatars/assets/avatars/Hearts1.png"),
      type: "non-human",
    },
  ];

  const backgrounds = [
    "linear-gradient(to top left, #FF5F5F, #000000)",
    "linear-gradient(to top left, #FFC3DD, #FFFFFF)",
    "linear-gradient(to top left, #9B76FF, #FFFFFF)",
    "linear-gradient(to top left, #C3DBFF, #FFFFFF)",
  ];

  const objects = [
    require("./avatarObjects/assets/Flower.png"),
    require("./avatarObjects/assets/camera.png"),
    require("./avatarObjects/assets/candy.png"),
    require("./avatarObjects/assets/Juice.png"),
  ];

  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(0);
  const [selectedBackground, setSelectedBackground] = useState(backgrounds[0]);
  const [selectedObject, setSelectedObject] = useState();
  // Holds the data of the user-uploaded image, initially null (no image uploaded).
  const [uploadedImage, setUploadedImage] = useState(null);
  // A boolean flag to indicate whether an image has been uploaded, initially false.
  const [imageUploaded] = useState(false);
  const [hasPreExistingAvatar, sethasPreExistingAvatar] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData.email) {
      navigate("/login");
    }
    setLoading(false);
  }, [userData]);

  if (loading) {
    return <Loader />;
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file type. Only JPEG and PNG are allowed.");
        return;
      }

      // Check file size
      const maxSizeInBytes = 8 * 1024 * 1024; // 8MB
      if (file.size > maxSizeInBytes) {
        toast.error("File size must not exceed 8MB.");
        return;
      }

      //Delete object when you upload image
      setSelectedObject(null);

      // Create a new blob from the file
      const blob = new Blob([file], { type: file.type });

      // Create a FormData object and append the blob to it
      const formData = new FormData();
      formData.append("image", blob, file.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        sethasPreExistingAvatar(false);
        toast.success("Image uploaded successfully.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    // Check if an avatar is selected or an image is uploaded
    if (!selectedAvatarIndex && !uploadedImage) {
      toast.error("Please select an avatar or upload an image.");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    const userId = userData._id;
    formData.append("uniqueIdentifier", userId);
    formData.append("hasPreExistingAvatar", hasPreExistingAvatar);

    //  Append selected avatar image to form data
    if (hasPreExistingAvatar === true) {
      formData.append("avatarName", avatars[selectedAvatarIndex].image);
      formData.append("avatarObject", selectedObject);
      formData.append("avatarBackground", selectedBackground);

      try {
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/image/avatar-upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        // Handle successful request
        toast.success("Profile Avatar saved successfully");
        navigate("/welcome");
      } catch (error) {
        // Handle request error
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.errorMessage);
        } else {
          toast.error(
            "An error occurred while saving the profile picture. Please try again.",
          );
        }
      }
    }
    if (hasPreExistingAvatar === false) {
      const base64Response = await fetch(uploadedImage);
      const blob = await base64Response.blob();

      // Create a File object from the Blob
      const file = new File([blob], "uploadedImage.png", { type: blob.type });

      // Append the File to FormData
      formData.append("image", file);

      try {
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/image/image-upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        // Handle successful request
        toast.success("Profile picture saved successfully");
        navigate("/login");
      } catch (error) {
        // Handle request error
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.errorMessage);
        } else {
          toast.error(
            "An error occurred while saving the profile picture. Please try again.",
          );
        }
      }
    }
  };

  const handleAvatarClick = (index) => {
    setSelectedAvatarIndex(index);
    setSelectedObject(null);
    sethasPreExistingAvatar(true);

    //delete the uploaded image when the user select an avatar
    if (uploadedImage) {
      setUploadedImage(null);
    }
    /* console.log(index); */
  };

  const handleBackgroundClick = (background) => {
    setSelectedBackground(background);
    sethasPreExistingAvatar(true);
  };

  const handleObjectClick = (object) => {
    if (!uploadedImage && !isNonHumanAvatar) {
      setSelectedObject(object);
      sethasPreExistingAvatar(true);
    }
  };

  const selectedAvatar = uploadedImage || avatars[selectedAvatarIndex].image;
  const isNonHumanAvatar =
    !uploadedImage && avatars[selectedAvatarIndex].type === "non-human";

  return (
    <div className="full_select_avatar">
      <div
        style={{ backgroundImage: `url(${bgElement})` }}
        alt="bg-element"
        className="bg_element"
      ></div>
      <div className="space_block"></div>
      <div className="transparent_block">
        <div className="subtitles">
          <h3>Create Your Profile Picture</h3>
        </div>
        <div className="avatar_container">
          <div
            className="avatar_show"
            style={{
              background: selectedBackground,
              borderRadius: "10px",
              position: "relative",
              marginLeft: "20px",
            }}
          >
            {selectedAvatar && (
              <img src={selectedAvatar} alt="Selected Avatar" />
            )}
            {selectedObject && !imageUploaded && (
              <img
                src={selectedObject}
                alt="Selected Object"
                className="selected_object"
                style={{ position: "absolute", bottom: 0, left: 0 }}
              />
            )}
          </div>
          <div className="options">
            <div className="a_options">
              <div className="avatar_options">
                <AvatarList
                  avatars={avatars}
                  selectedBackground={selectedBackground}
                  handleAvatarClick={handleAvatarClick}
                />
              </div>
            </div>
            <div className="avatar_objects">
              <h5>Select object</h5>
              <div className="objects">
                <AvatarObjects
                  selectedAvatar={selectedAvatar}
                  objects={objects}
                  selectedObject={selectedObject}
                  handleObjectClick={handleObjectClick}
                  objectsDisabled={imageUploaded || isNonHumanAvatar}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg_and_btn">
          <div className="bg">
            <h5>Select a background color</h5>
            <BackgroundList
              backgrounds={backgrounds}
              handleBackgroundClick={handleBackgroundClick}
            />
          </div>
          <div className="btn_avatar">
            <button
              className="btn_photo"
              onClick={() => fileInputRef.current.click()}
            >
              Upload new photo
            </button>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              ref={fileInputRef}
            />
            <button className="btn_save" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectAvatar;
