import './loader.scss'
import LoadingSpinner from "./loadingSpinner";

const Loader = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoadingSpinner />
    </div>
  );
};

export default Loader;
