import PersonAddIcon from "@mui/icons-material/PersonAdd";
import "./messagingBar.scss";
import avatarProfile from "../../../assets/holder/avatar_demo.png";
import Avatar from "../../userProfiles/avatarProfile";
import { useRecoilState } from "recoil";
import { contactSearchQuery } from "../../../atom";

const FriendBloc = (props) => {
  return (
    <div className="friend_container">
      <div className="img_container">
        <Avatar size="small" />
      </div>
      <div className="text_container">
        <div className="name">{props.name}</div>
        <p className="status" style={{ marginBottom: 0 }}>
          {props.status}
        </p>
      </div>
    </div>
  );
};

const MessagesBloc = (props) => {
  const contacts = [
    {
      name: "James R.",
      status: "Currently Gaming",
      avatar: avatarProfile,
      statusColor: "#04D10C",
    },
    {
      name: "Mike S.",
      status: "Unavailable",
      avatar: avatarProfile,
      statusColor: "#FF006C",
    },
  ];

  const [searchTerm] = useRecoilState(contactSearchQuery);

  return (
    <div className="messages_bar">
      <div
        className="content_padding channel_bar_content"
        style={{ paddingTop: 0 }}
        id="channel_bar_content"
      >
        <div className="button_container">
          <button
            className="add_user_plus"
            style={{
              width: "100%",
              fontWeight: 600,
              padding: 6,
              cursor: "pointer",
            }}
            onClick={props.addFriendBlocDisplay}
          >
            <PersonAddIcon />
            <div
              style={{
                display: "inline-block",
                width: "calc(100% - 48px)",
                textAlign: "center",
              }}
            >
              Send Friend Request
            </div>
          </button>
        </div>
        <div className="scrollable">
          <div className="list_container">
            <div className="friends_list">
              {contacts
                .filter((contact) =>
                  contact.name.toUpperCase().includes(searchTerm.toUpperCase()),
                )
                .map((item, index) => (
                  <FriendBloc
                    key={index}
                    name={item.name}
                    status={item.status}
                    image={item.avatar}
                    color={item.statusColor}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesBloc;