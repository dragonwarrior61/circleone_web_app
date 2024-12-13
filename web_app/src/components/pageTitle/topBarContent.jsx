import LinkIcon from "@mui/icons-material/Link";
import MessageIcon from "@mui/icons-material/Message";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SupportIcon from '@mui/icons-material/Support';

const TopBarContent = ({ title, logo, desc, children }) => {
  return (
    <>
      <div className="page_icon" style={{ opacity: "0.5", marginRight: 10 }}>
        {logo === "link" && <LinkIcon style={{ transform: "rotate(40deg)" }} />}
        {logo === "message" && <MessageIcon />}
        {logo === "support" && <SupportIcon />}
        {logo === "gear" && <ManageAccountsIcon />}
      </div>
      <span>{title}</span>

      {desc && (
        <span
          className="page_description"
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            position: "absolute",
            maxWidth: "50vw",
          }}
        >
          {desc}
        </span>
      )}

      <div
        className="right-side-content"
        style={{ position: "absolute", right: 0, top: "13px" }}
      >
        {children}
      </div>
    </>
  );
};

export default TopBarContent;