import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Dashboard } from "./pages";
import {
  Login,
  Profile,
  Site,
  CreatePassword,
  EnterPassword,
  SetName,
  Username,
  OtpRegister,
  SelectAvatar,
  DirectMessages,
} from "./components";
import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/setusername" exact element={<Username />} />
        <Route path="/otpRegister" exact element={<OtpRegister />} />
        <Route path="/setName" exact element={<SetName />} />
        <Route path="/createpassword" exact element={<CreatePassword />} />
        <Route path="/enterpassword" exact element={<EnterPassword />} />
        <Route path="/selectAvatar" exact element={<SelectAvatar />} />
        <Route path="/profile/:id" exact element={<Profile />} />
        <Route path="/site/:id" exact element={<Site />} />
        <Route path="/main" exact element={<Dashboard />} />
        <Route path="/directmessages" exact element={<DirectMessages />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
