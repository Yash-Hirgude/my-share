import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [devices, setDevices] = useState([
    "Device 1", "Device 2", "Device 3", "Device 4", "Device 5", "Device 6", "Device 7", "Device 8", "Device 9", "Device 10", 
    "Device 11", "Device 12", "Device 13", "Device 14", "Device 15", "Device 16", "Device 17", "Device 18", "Device 19", 
    "Device 20", "Device 21", "Device 22", "Device 23", "Device 24", "Device 25", "Device 26", "Device 27", "Device 28", 
    "Device 29", "Device 30", "Device 31", "Device 32", "Device 33", "Device 34", "Device 35"
  ]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767); // If the width is less than or equal to 767px
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]);
  };

  const handleSendFiles = (deviceName) => {
    if (selectedFiles.length === 0) {
      document.getElementById("fileInput").click();
    } else {
      const fileNames = selectedFiles.map((file) => file.name).join(", ");
      alert(`Sending files to ${deviceName}: ${fileNames}`);
    }
  };

  return (
    <div
      className="container mt-0 p-0 border rounded shadow bg-light"
      style={{
        minHeight: "100vh", // Ensures full screen height
        padding: 0, // Remove padding for no space between div and browser
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // This ensures the content is spaced correctly
        margin: 0, // Remove margin to avoid space between div and browser
      }}
    >
      <h2 className="text-center mb-4 text-primary">File Sharing & Device Discovery</h2>

      <div className="row w-100" style={{ flexGrow: 1, overflow: "hidden" }}>
        <div
          className="col-md-6 p-3"
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Center the list vertically
            alignItems: "center", // Center the list horizontally
            borderRight: isMobile ? "none" : "1px solid rgba(0, 0, 0, 0.1)", // Hide border on mobile
            paddingBottom: isMobile ? "0" : "1rem", // Remove padding-bottom in mobile view
          }}
        >
          <h4 className="text-secondary">Available Devices</h4>
          <button className="btn btn-primary mb-3 w-100" onClick={() => setDevices([...devices, "Device X", "Device Y"])}>
            Refresh Devices
          </button>

          <div
            className="overflow-auto w-100"
            style={{
              flex: 1,
              maxHeight: "calc(100vh - 85px)", // Subtract the header and button height to allow scrolling
              paddingBottom: "0", // Remove extra space below the list
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Center the list horizontally
            }}
          >
            <ul className="list-group w-100" style={{ maxWidth: "100%" }}>
              {devices.map((device, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {device}
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "rgba(169, 169, 169, 0.3)",
                      color: "#333",
                      border: "1px solid rgba(169, 169, 169, 0.5)",
                      fontSize: "14px",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSendFiles(device)}
                  >
                    Send
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-md-6 p-3 d-flex flex-column align-items-center" style={{ minHeight: "200px" }}>
          <h4 className="text-secondary text-center" style={{ display: isMobile ? "none" : "block" }}>Select Files</h4> {/* Hide on mobile */}
          <input
            type="file"
            id="fileInput"
            className="d-none"
            multiple
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Mobile only notification and button */}
      {isMobile && ( // Always show the button in mobile view
        <>
          {selectedFiles.length > 0 && ( // Show notification only if files are selected
            <div
              className="position-fixed bottom-0 start-0 p-3 w-100"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
                borderRadius: "5px",
                fontSize: "14px",
                zIndex: 10,
                marginBottom: "70px", // Prevents overlap with the button
              }}
            >
              {selectedFiles.length > 0 ? `${selectedFiles.length} File(s) Selected` : ""}
            </div>
          )}

          <button
            className="btn btn-success position-fixed bottom-0 start-0 w-100"
            style={{
              zIndex: 10,
              backgroundColor: "#28a745",
              border: "none",
            }}
            onClick={() => document.getElementById("fileInput").click()}
          >
            Select Files
          </button>
        </>
      )}
    </div>
  );
};

export default Home;