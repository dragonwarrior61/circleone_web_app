import "./linkPage.scss";

const Content = () => {
  return (
    <>
      <div className="content_box">
        <div className="content_box_inner">
          <div className="url_outer_box">
            <div className="url_box">URL</div>
            <input
              style={{
                borderRadius: 0,
                height: "100%",
                border: "1px solid #00000005",
                verticalAlign: "top",
                width: "calc(100% - 37px)",
                display: "inline-block",
                fontSize: 12,
                boxShadow: "none",
              }}
              className="form-control"
              defaultValue="https://thecirclone.com"
              placeholder="Enter website URL"
            />
          </div>
          <div
            style={{
              marginTop: 2,
              height: "100%",
              borderTop: "2px solid var(--whitesmoke-white)",
              borderTopLeftRadius: 10,
            }}
          >
            <iframe
              src="https://thecirclone.com"
              title="Circlone.com"
              style={{ borderTopLeftRadius: 10, width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;