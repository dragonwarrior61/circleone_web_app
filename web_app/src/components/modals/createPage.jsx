import { useState, useRef, useEffect } from "react";
import "./modal.scss";
import LockIcon from "@mui/icons-material/Lock";
import CloseIcon from "@mui/icons-material/Close";

const CreatePage = (props) => {
  const [collectionName] = useState("Page name");
  const [validPageName, setValidPageName] = useState(false);

  const checkValidPageName = (event) => {
    const name = event.target.value;
    if (name.length >= 5) setValidPageName(true);
    else setValidPageName(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);

  const popupRef = useRef(null);

  const handleClickOutside = (e) => {
    if (popupRef.current) {
      return !popupRef.current.contains(e.target);
    }
  };

  return (
    <div className="popup page_popup">
      <div
        className="create_collection_block create_page_block"
        style={{ width: "400px" }}
        ref={popupRef}
      >
        <div
          className="image_block"
          style={{ backgroundColor: "#FFC80A", position: "relative" }}
        >
          <LockIcon style={{ color: "white", fontSize: "2.5rem" }} />
          <div
            className="image_block_bg"
            style={{
              backgroundColor: "#FFC80A",
              position: "absolute",
              width: 90,
              height: 90,
              opacity: 0.6,
              zIndex: -2,
              borderRadius: "50%",
            }}
          ></div>
          <div
            className="image_block_bg"
            style={{
              backgroundColor: "#FFC80A",
              position: "absolute",
              width: 100,
              height: 100,
              opacity: 0.4,
              zIndex: -1,
              borderRadius: "50%",
            }}
          ></div>
        </div>
        <div className="title_block">
          <h5 className="title">Page Creation</h5>
        </div>

        <div
          className="close_button"
          style={{ position: "absolute", right: 5, top: 5, color: "blue" }}
        >
          <CloseIcon style={{ color: "var(--match)", fontSize: 20 }} />
          <a
            href="#"
            className="close_button_click"
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              height: "100%",
              width: "100%",
              zIndex: 15,
              cursor: "pointer",
            }}
            onClick={props.collapsePopup}
          ></a>
        </div>
        <form action="POST" className="creation_block">
          <div className="input_block">
            <label
              htmlFor="choose-name"
              style={{ width: "100%", position: "relative" }}
              className="collection_name_label"
            >
              <span
                style={{
                  maxWidth: "100%",
                  textAlign: "left",
                  overflow: "hidden",
                }}
              >
                {collectionName}
              </span>
              <input
                onInput={checkValidPageName}
                id="choose-collection-name"
                name="choose-name"
                type="text"
                placeholder="Enter page name"
              />
              <i
                className={`fa-solid fa-${validPageName ? "check" : "xmark"}`}
                style={{ position: "absolute", right: 15, bottom: 15 }}
              />
            </label>
            <div className="choose_type">
              <label htmlFor="messaging">
                <i className="fa-solid fa-message" />
                <div className="text-desc">
                  Messaging Page <span>Post images, gifts, etc</span>
                </div>
                <input
                  type="radio"
                  value="messaging"
                  name="page-type"
                  checked="true"
                />
              </label>
              <label htmlFor="content">
                <i className="fa-solid fa-file" />
                <div className="text_desc">
                  Content Page <span>Create collaborative docs</span>
                </div>
                <input type="radio" value="content" name="page-type" />
              </label>
              <label htmlFor="web">
                <i className="fa-solid fa-link" />
                <div className="text_desc">
                  Web Page<span>Share relevant websites</span>
                </div>
                <input type="radio" value="web" name="page-type" />
              </label>
            </div>
          </div>

          <button className="black_button">Create Collection</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
