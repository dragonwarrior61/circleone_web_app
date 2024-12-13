import React from "react";

const LoadingSpinner = ({ duration = "60s", position }) => {
  const spinnerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: position === "sidebar" ? 450 : "auto",
    left: position === "sidebar" ? 190 : "auto",
    right: "auto",
    bottom: "auto",
    zIndex: 100,
  };

  return (
    <div style={spinnerStyle}>
      <div
        style={{
          border: "4px solid var(--nearly-white)",
          borderRadius: "50%",
          borderTop: "4px solid var(--purple)",
          width: "40px",
          height: "40px",
          animation: `spin ${duration} linear infinite`,
        }}
      ></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
