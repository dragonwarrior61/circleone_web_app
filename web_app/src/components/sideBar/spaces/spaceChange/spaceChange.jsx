import serverIcon from "../../../../assets/holder/server_icon.png";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./spaceChange.scss";

const TopBarLogos = ({ list, lefty }) => {
  return list.map((item, index) => {
    const scaleDownFactor = 0.15;
    const size = 1 - index * scaleDownFactor;

    const logoStyle = {
      zIndex: 9 - index,
      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${item})`,
      transform: `scale(${size})`,
    };

    return (
      <div
        key={item}
        className={`show_more_image show_more_${
          lefty ? "left" : "right"
        }_image show_more_image_${index}`}
        style={logoStyle}
      />
    );
  });
};

const SpaceChange = (props) => {
  const logoList = {
    leftLogos: [
      "https://img.freepik.com/free-vector/culture-logo-design-template_23-2149884167.jpg?w=826&t=st=1669393019~exp=1669393619~hmac=97f5f5deec78b2b1435a21d523ba19432595d5c1d2201add733ded991737c6da",
      "https://img.freepik.com/free-vector/instagram-shop-logo-design_23-2149750734.jpg?w=826&t=st=1669393050~exp=1669393650~hmac=0a69f93�",
      "https://img.freepik.com/free-vector/fitness-gym-logo-template-abstract-illustration-minimal-design-vector_53876-151333.jpg?w=826&t=st=1669393109~exp=1669393709~hmac=8ff1e026e6d449a60885f29b711f52a767d6a0eb51166b01e9e75f3ffbacbc1c",
      "https://pbs.twimg.com/profile_images/1430780789873156098/4LMIfIfX_400x400.jpg",
    ],
    rightLogos: [
      "https://yt3.ggpht.com/oY_q5vMJrSdvrFBmKNyKGXb9C85QVmvovl4atw0tNWSktY85WulCuD2OUVVuKCloDOhUdHZoD6o=s900-c-k-c0x00ffffff-no-rj",
      "https://img.freepik.com/free-vector/fitness-gym-logo-template-abstract-illustration-minimal-design-vector_53876-151333.jpg?w=826&t=st=1669393109~exp=1669393709~hmac=8ff1e026e6d449a60885f29b711f52a767d6a0eb51166b01e9e75f3ffbacbc1c",
      "",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUWSmIitxcUVqVVrV5uXSswDfjIjb_e6kUqA&usqp=CAU",
    ],
  };

  return (
    <div
      className={`content_padding channel_bar_content channel_bar_content_for_${props.pageType}`}
      id="channel_bar_content"
    >
      <div className="container_change_space">
        <div className="change_space_highlight">
          <center>
            <div
              className="change_space_highlight_inner"
              style={{ backgroundImage: "url(" + serverIcon + ")" }}
            />
          </center>
        </div>

        <div className="change_space_show_more show_more_left">
          <TopBarLogos list={logoList.leftLogos} lefty={true} />
        </div>
        <div
          className="change_space_show_more show_more_right"
          style={{ right: 15 }}
        >
          <TopBarLogos list={logoList.rightLogos} lefty={false} />
        </div>

        <div className="change_space_frame">
          <div className="change_space_button">
            <ArrowBackIosNewRoundedIcon style={{ fontSize: 15 }} />
          </div>
          <div className="change_space_display">
            <span style={{ verticalAlign: "middle" }}>Circlone™</span>
            <KeyboardArrowDownIcon
              style={{
                verticalAlign: "middle",
                float: "right",
                cursor: "pointer",
              }}
            />
          </div>

          <div className="change_space_button">
            <ArrowForwardIosRoundedIcon style={{ fontSize: 15 }} />
          </div>
        </div>

        <button
          className="btn_manage_spaces"
          onClick={props.handleManageSpacesClick}
        >
          Add a Space
        </button>
      </div>
    </div>
  );
};

export default SpaceChange;