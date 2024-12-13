import { useState, useEffect } from "react";

import {
  HeaderSearchBar,
  MessagesBloc,
  TopBarContent,
  LeftSideBar,
  SpaceBar,
  SpaceBarHidden,
  SpaceBarShow,
  SpaceChange,
  SettingsSideBar,
  UpdatesModal,
} from "../components";

import DirectMessages from "./spacePages/messagingPage/directMessages/directMessages";
import UserProfileSettings from "./settings/userProfile/userProfile"
import PrivacySafety from "./settings/privacy&safety/privacy&safety";
import Appearance from "./settings/appearance/appearance"
import Safeguarding from "./settings/safeguarding/safeguarding"
import MyAccount from "./settings/account/myAccount"
import SupportPage from "./supportPage/supportPage";
import ReportModal from "../components/modals/report";
import LinkPage from "./spacePages/linkPage/linkPage";
import AddNewContacts from "./sendFriendReqPage/addNewContacts";
import AddNewSpace from "../components/modals/addNewSpace";
import ToDoList from "../components/sideBar/toDoList/toDoList";
import LoadingSpinner from "../components/loader/loadingSpinner";
import Error404 from "../components/errors/404";
import ErrorSideBar from "../components/errors/errorSideBar";
import FlagCircleIcon from '@mui/icons-material/FlagCircle';

// import { useRegistrationContext } from "../context/registrationContext";
// import { useNavigate } from "react-router-dom";
// import Loader from "../components/dashboardElements/loader/Loader";
// import { useRegistrationContext } from "../context/registrationContext";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  const [page, setPage] = useState({
    type: "home",
    searchHolder: "Search Circlone™",
  });
  const [isToDoListSidebarActive, setIsToDoListSidebarActive] = useState(false);
  const [showAddNewSpace, setShowNewSpace] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showSpinner] = useState(false);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [loadingDuration, setLoadingDuration] = useState("1000ms");
  const [hasContentLoadedOnce, setHasContentLoadedOnce] = useState(false);
  const [showError404, setShowError404] = useState(false);
  const [showErrorSidebar, setShowErrorSidebar] = useState(false);
  const [showUpdatesModal, setShowUpdatesModal] = useState(true);
  const [currentContentPage, setCurrentContentPage] = useState(<LinkPage />);
  const [topBarProps, setTopBarProps] = useState({
    logo: "link",
    title: "Website",
    desc: "This is a description of this Circlone page, this description is editable.",
  });

//  const { userData } = useRegistrationContext();
//  const [loading, setLoading] = useState(true);
//  const navigate = useNavigate();
//
// if (loading) {
//   return <Loader />;
// }
//  useEffect(() => {
//    if (!userData.email) {
//      navigate("/login");
//    }
//    setLoading(false);
//  }, [userData]);

//  if (loading) {
//    return (
//      <div
//        style={{
//          height: "100vh",
//          width: "100%",
//          display: "flex",
//          justifyContent: "center",
//          alignItems: "center",
//        }}
//      >
//        <LoadingSpinner />
//      </div>
//    );
//  }

  useEffect(() => {
    if (!hasContentLoadedOnce) {
      setIsContentLoading(true);
      setHasContentLoadedOnce(true);
      const startTime = Date.now();

      const loadContent = async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));

        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        setLoadingDuration(`${duration}s`);

        if (duration > 60) {
          setShowError404(true);
          setShowErrorSidebar(true);
        }

        setIsContentLoading(false);
      };

      loadContent();
    }
  }, [page.type, hasContentLoadedOnce]);

  const updateContentPageWithSpinner = async (newContentPage) => {
    if (!hasContentLoadedOnce) {
      setIsContentLoading(true);
      setHasContentLoadedOnce(true);
      await new Promise((resolve) => setTimeout(resolve, 100));

      setCurrentContentPage(newContentPage);
      setIsContentLoading(false);
    } else {
      setCurrentContentPage(newContentPage);
    }
  };

  const toggleToDoListSidebar = () => {
    if (!isToDoListSidebarActive) {
      setPage({ type: "todoList", searchHolder: "Search Todo List" });
      setIsToDoListSidebarActive(true);
    }
  };

  const toggleMessages = () => {
    setPage({ type: "messaging", searchHolder: "Search Friends List" });
    updateContentPageWithSpinner(<DirectMessages />);

    setTopBarProps({
      logo: "message",
      title: "Luis Otero",
      desc: "",
    });
  };

  const toggleSettings = () => {
    setPage({ type: "settings", searchHolder: "Search Circlone" });
    setTopBarProps({
      logo: "gear",
      title: "Managing Settings",
    });
  };

  const renderCurrentSideBar = () => {
    switch (page.type) {
      case "home":
        return <SpaceBar />;
      case "settings":
        return (
          <SettingsSideBar
            handleMyAccountClick={handleMyAccountClick}
            handleUserProfileClick={handleUserProfileClick}
            handlePrivacyClick={handlePrivacyClick}
            handleSafeguardingClick={handleSafeguardingClick}
            handleAppearanceClick={handleAppearanceClick}
          />
        );
      case "todoList":
        return <ToDoList pageType={page.type} />;
      case "messaging":
        return <MessagesBloc addFriendBlocDisplay={addFriendBlocDisplay} />;
      default:
        return <SpaceBar />;
    }
  };

  const toggleSupport = () => {
    updateContentPageWithSpinner(<SupportPage />);
    setTopBarProps({
      logo: "support",
      title: "Support",
      desc: "Swing by our help haven for guidance through the meme vines and emoji oceans! 🌊",
    });
  };

  const toggleReportModal = () => {
    setShowReportModal(true)
  }

  const addFriendBlocDisplay = () => {
    updateContentPageWithSpinner(<AddNewContacts />);
  };

  const handleMyAccountClick = () => {
    updateContentPageWithSpinner(<MyAccount />);
  };

  const handleUserProfileClick  = () => {
    updateContentPageWithSpinner(<UserProfileSettings />);
  };

  const handleSafeguardingClick = () => {
    updateContentPageWithSpinner(<Safeguarding />);
  };

  const handleAppearanceClick= () => {
    updateContentPageWithSpinner(<Appearance />);
  };

  const handlePrivacyClick = () => {
    updateContentPageWithSpinner(<PrivacySafety />);
  };

  const toggleHome = () => {
    updateContentPageWithSpinner(<LinkPage />);
    setTopBarProps({
      logo: "link",
      title: "Website",
      desc: "This is a description of this Circlone page, this description is editable.",
    });
    setPage({ type: "home", searchHolder: "Search Circlone" });
    setIsToDoListSidebarActive(false);
  };

  const handleManageSpacesClick = () => {
    setShowNewSpace((prevState) => !prevState);
  };

  const handleCloseAddSpace = () => {
    setShowNewSpace(false);
  };

  const overlayAddNewSpaceStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div
      style={{
        backgroundColor: "#EFEFEF",
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      <div className="search_bar">
        <HeaderSearchBar />
      </div>
      <LeftSideBar
        toggleToDoListSidebar={toggleToDoListSidebar}
        toggleMessages={toggleMessages}
        toggleSettings={toggleSettings}
        toggleHome={toggleHome}
        toggleSupport={toggleSupport}
      />
      {isContentLoading && (!page.type || !currentContentPage) && (
        <LoadingSpinner position="sidebar" duration={loadingDuration} />
      )}
      <div
        className={`channel_bar channel_bar_for_${page.type}`}
        id="channel_bar"
        style={{ display: showSpinner ? "none" : "block" }}
      >
        <SpaceChange
          searchHolder={page.searchHolder}
          pageType={page.type}
          handleManageSpacesClick={handleManageSpacesClick}
        />
        {showErrorSidebar ? <ErrorSideBar /> : renderCurrentSideBar()}
      </div>
      <div className="d-inline-block">
        <div className="top_channel_box_1" id="channel_top">
          <SpaceBarShow />
        </div>
        <div className="top_channel_box_2" id="closed_top">
          <SpaceBarHidden />
        </div>
      </div>
      <div
        className="content_top_bar d-inline-block"
        style={{ position: "absolute" }}
      >
        <TopBarContent {...topBarProps} />
      </div>
      
      <FlagCircleIcon className="report_button" onClick={() => { toggleReportModal() }}  />

      {showReportModal && (
        <ReportModal collapsePopup={() => setShowReportModal(false)}/>
      )}

      {showAddNewSpace && (
        <div style={overlayAddNewSpaceStyle}>
          <AddNewSpace handleCloseAddSpace={handleCloseAddSpace} />
        </div>
      )}

      {isContentLoading ? (
        <LoadingSpinner duration={loadingDuration} />
      ) : showError404 ? (
        <Error404 />
      ) : (
        currentContentPage
      )}
      {showUpdatesModal && (
        <div style={overlayAddNewSpaceStyle}>
          <UpdatesModal collapsePopup={() => setShowUpdatesModal(false)} />
        </div>
      )}
    </div>
  );
};

export default Home;