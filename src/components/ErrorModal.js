import React from "react";

const ErrorModal = ({errorMessage="Server couldn't response, please try again later.",closeModal}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex:1000
      }}>
      <div
        style={{
          width: "70%",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "5px",
        }}>
        <h1 className="text-center">Error</h1>
        <p className="text-center">{errorMessage}</p>
        <div className="d-flex justify-content-center">
            <button onClick={closeModal} className="btn btn-primary">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;