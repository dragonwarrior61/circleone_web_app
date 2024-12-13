import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, SupportPage } from "./pages";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";
import "./App.scss";

import {
  Login,
  Site,
  CreatePassword,
  SetName,
  SelectAvatar,
  Username,
  Password,
  OtpRegister,
  WelcomePage,
  SpacePopup,
  SettingsSideBar,
  AddNewSpace,
  ReportTool,
  UserHover,
  UpdatesModal,
  CreateSpace,
} from "./components";

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <ToastContainer position="bottom-right" />
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/setusername" exact element={<Username />} />
          <Route path="/otpRegister" exact element={<OtpRegister />} />
          <Route path="/setName" exact element={<SetName />} />
          <Route path="/createpassword" exact element={<CreatePassword />} />
          <Route path="/password" exact element={<Password />} />
          <Route path="/selectAvatar" exact element={<SelectAvatar />} />
          <Route path="/site/:id" exact element={<Site />} />
          <Route path="/main" exact element={<Dashboard />} />
          <Route path="/welcome" exact element={<WelcomePage />} />
          <Route path="/space" exact element={<SpacePopup />} />
          <Route path="/support" exact element={<SupportPage />} />
          <Route path="/settingsBar" exact element={<SettingsSideBar />} />
          <Route path="/addSpace" exact element={<AddNewSpace />} />
          <Route path="/report" exact element={<ReportTool />} />
          <Route path="/addSpace" exact element={<AddNewSpace />} />
          <Route path="/userHover" exact element={<UserHover />} />
          <Route path="/addSpace" exact element={<AddNewSpace />} />
          <Route path="/update" exact element={<UpdatesModal />} />
          <Route path="/createSpace" exact element={<CreateSpace />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;