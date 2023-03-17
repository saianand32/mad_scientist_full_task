import React, { useState, useEffect } from "react";
import { getAllFilesRoute } from "../../utils/APIRoutes";
import { pdfjs } from "react-pdf";
import "./AllFiles.css";
import Loader from "../../components/Loader/Loader";
import axios from "axios";
import PDFcard from "../../components/PDFcards/PDFcards";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = () => {
  const [loading, setLoading] = useState(true);
  const [allPdfs, setAllPdfs] = useState([]);

  useEffect(() => {
    getAllPdfs();
  }, []);

//   const bufferToBase64 = (buffer) => {
//     let binary = "";
//     const bytes = new Uint8Array(buffer);
//     for (let i = 0; i < bytes.byteLength; i++) {
//       binary += String.fromCharCode(bytes[i]);
//     }
//     return btoa(binary);
//   };

  const getAllPdfs = async () => {
    try {
      const resp = await axios.get(getAllFilesRoute);
      console.log(resp.data);
      setAllPdfs(resp.data.files);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

//   const getById = async () => {
//     try {
//       const id = "641380b0bb3df124512168e6";
//       const response = await axios.get(getFileByIdRoute + "/" + id);
//       console.log(response.data.file.data.data);
//       const bufferData = response.data.file.data.data;
//       const base64Data = bufferToBase64(bufferData);
//       console.log(base64Data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

  const formattedFileName = (name) => {
    let newString = name.substring(0, name.length - 4);
    if (newString.length <= 5) {
      return newString + ".pdf";
    } else {
      newString = newString.substring(0, 5);
      return newString + "....pdf";
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="mainpdfcontainer">
          <div className="allfilesHeading">
            <h1>All Files in DB</h1>
          </div>
          <div className="allPdfDiv">
            {allPdfs.map((e) => {
              return (
                <PDFcard
                  key={e._id}
                  filename={formattedFileName(e.filename)}
                  _id={e._id}
                  setLoading={setLoading}
                  setAllPdfs={setAllPdfs}
                  allPdfs={allPdfs}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default PDFViewer;
