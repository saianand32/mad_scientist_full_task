import React, { useState } from "react";
import "./UploadSection.css";
import axios from "axios";
import Button from "@mui/material/Button";
import { uploadFileRoute } from "../../utils/APIRoutes";
const MAX_FILE_SIZE = 6 * 1024 * 1024;

function UploadSection({ file, setFile, setFlag, setViewLoading }) {
  const [label, setLabel] = useState("Choose a PDF");
  const [upload, setUpload] = useState(false);

  const handleFileSelect = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) {
      return;
    }
    setUpload(true);
    if (uploadedFile.size > MAX_FILE_SIZE) {
       alert('file larger than 6 Mb size = '+ ((uploadedFile.size)/(1024*1024)).toFixed(3)+" Mb")
    }
      setFile(uploadedFile);
      setLabel(uploadedFile.name);
  };

  const handleFileSendToDbAndView = async () => {
    console.log(file);
    const formData = new FormData();
    formData.append("pdf", file);
    setFlag(true);
    try {
      const response = await axios.post(uploadFileRoute, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        maxContentLength: 1000 * 1024 * 18, 
        maxBodyLength: 1000 * 1024 * 18, 
      });
      setViewLoading(false);
      alert(response.data.message);
    } catch (error) {
      setViewLoading(false);
      alert("exceeding header length / cyclic platform error");
      console.error(error);
    }
  };
  

  return (
    <div className="mainUploadContainer">
      <div className="uploadcontainer">
        <div className="codrops-header">
          <h1>PDF Viewer</h1>
        </div>
        <div className="content">
          <div className="box">
            <input
              type="file"
              accept="application/pdf"
              name="file-1[]"
              id="file-1"
              className="inputfile inputfile-1"
              onChange={handleFileSelect}
            />
            <label for="file-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="17"
                viewBox="0 0 20 17"
              >
                <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
              </svg>{" "}
              <span>{label}</span>
            </label>
          </div>
        </div>
        {upload && (
          <div className="btnContainer">
            <Button
              style={{
                color: "white",
                backgroundColor: "#9c43ff",
                marginTop: "3rem",
                fontWeight: "bold",
              }}
              onClick={handleFileSendToDbAndView}
            >
              Upload And View PDF
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadSection;
