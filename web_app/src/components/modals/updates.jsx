import { useRef } from "react";
import UpdateImg from "./assets/updatesImg.svg";
import CloseIcon from "@mui/icons-material/Close";

const UpdatesModal = (props) => {
  const containerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      props.collapsePopup();
    }
  };

  return (
    <div className="popup" onClick={handleClickOutside}>
      <div className="popup_content updates_container " ref={containerRef}>
        <div className="close_button" onClick={props.collapsePopup}>
          <CloseIcon style={{ color: "var(--match)", fontSize: 20 }} />
        </div>
        <img src={UpdateImg} alt="update" />
        <div className="update_content">
          <div className="title_update">
            <span>What’s New</span>
            <div className="update_date">July 23, 2023</div>
          </div>
          <span className="description_update">
            New features, bug fixes, and content you might’ve missed.
          </span>
          <div className="updates_info">
            <div>
              <div className="features_title">
                <span>New Features</span>
                <div className="line"></div>
              </div>
              <ul className="update_list">
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                  sequi minus accusamus nesciunt eius recusandae rem error sed
                  repellat laborum! Beatae pariatur distinctio dolor deserunt
                  saepe ut ullam ad quaerat.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                  sequi minus accusamus nesciunt eius recusandae rem error sed
                  repellat laborum! Beatae pariatur distinctio dolor deserunt
                  saepe ut ullam ad quaerat.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                  sequi minus accusamus nesciunt eius recusandae rem error sed
                  repellat laborum! Beatae pariatur distinctio dolor deserunt
                  saepe ut ullam ad quaerat.
                </li>
              </ul>
              <div className="updates_title">
                <span>Updates</span>
                <div className="line"></div>
              </div>
              <ul className="update_list">
                <li>
                  Lorem ipsum dolor sit amet consectetur. Phasellus in vitae
                  viverra quam facilisis vel
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatesModal;
