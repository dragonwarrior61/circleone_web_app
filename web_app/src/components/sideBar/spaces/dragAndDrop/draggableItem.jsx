import SettingsIcon from '@mui/icons-material/Settings';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';

const DraggableItem = ({ item, handleCategoryAddition }) => {

  return (
    <div className="page_title">
      <span>
        {item.icon === "LinkRoundedIcon" && <LinkRoundedIcon sx={{ fontSize: 19 }} style={{ transform: "rotate(40deg)"}} />}
        {item.icon === "ForumRoundedIcon" && <ForumRoundedIcon sx={{ fontSize: 19 }} />}
        {item.icon === "LeaderboardRoundedIcon" && <LeaderboardRoundedIcon sx={{ fontSize: 19 }} />}
        {item.icon === "ArticleRoundedIcon" && <ArticleRoundedIcon sx={{ fontSize: 19 }} />}
      </span>
      <span style={{ opacity: "0.5" }}>| </span>
      {item.name}
      <span
        className="gear_container"
        style={{ position: "absolute", right: 9, top: 9 }}
        onClick={handleCategoryAddition}
      >
        <SettingsIcon style={{ fontSize: "small" }}/>
      </span>
    </div>
  );
};

export default DraggableItem;