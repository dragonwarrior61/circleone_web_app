import { createContext, useContext, useState } from "react";

const registrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    isLoggedIn: "",
    username: "",
    fName: "",
    lName: "",
    uniqueIdentifier: "",
    verified: "",
  });

  const updateUser = (newUserData) => {
    setUserData((prevUserData) => ({ ...prevUserData, ...newUserData }));
  };

  return (
    <registrationContext.Provider value={{ userData, updateUser }}>
      {children}
    </registrationContext.Provider>
  );
};

export const useRegistrationContext = () => {
  return useContext(registrationContext);
};