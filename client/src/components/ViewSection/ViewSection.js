import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Loader from '../Loader/Loader'
import Warn from "../../components/Warn/Warn";
import "./ViewSection.css";

function ViewSection({ file, setFile, setFlag, viewLoading, setViewLoading }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(0.6);
  const [dimensionTrue, setDimensionTrue] = useState(0.6);
  const [fullScreen, setFullScreen] = useState(false);


  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 720) {
        setDimensionTrue(true);
      } else {
        setDimensionTrue(false);
      }
    }
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function handleZoomIn() {
    if (scale < 1.6) setScale(scale + 0.1);
  }

  function handleZoomOut() {
    if (scale > 0.4) setScale(scale - 0.1);
  }

  function handleNextPage() {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  }

  function handlePreviousPage() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  }

  function handleFullScreen() {
    setFullScreen(!fullScreen);
    const elem = document.querySelector(".pdf-document");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  }
  function handleReset() {
    setFile(null);
    setViewLoading(true)
    setFlag(false);
  }

  return (
    <>
    {
      viewLoading ? <Loader/>
      :
      <>
      {dimensionTrue ? (
        <div className="viewContainer">
          <div className="pdf-controls" style={{ marginTop: "12vh" }}>
            <button className="control-button" onClick={handlePreviousPage}>
              Previous Page
            </button>
            <button className="control-button">
              Page {pageNumber}/{numPages}
            </button>
            <button className="control-button" onClick={handleNextPage}>
              Next page
            </button>
          </div>
          <div className="pdf-controls">
            <button className="control-button" onClick={handleFullScreen}>
              Full Screen View
            </button>
            <button className="control-button" onClick={handleReset}>
              Reset
            </button>
          </div>
          <div className="pdf-controls">
            <button className="control-button" onClick={handleZoomIn}>
              Zoomin
            </button>
            <button className="control-button" onClick={handleZoomOut}>
              ZoomOut
            </button>
          </div>
          <div className="pdf-outer-container">
            <div
              className="pdf-container"
              style={{ transform: `scale(${scale})` }}
              id="pdfContainerId"
            >
              <Document
                className="pdf-document"
                file={file}
                onLoadSuccess={handleDocumentLoadSuccess}
                width="300px"
                style={{ width: "300px" }}
              >
                <Page className="pdf-page" pageNumber={pageNumber} />
              </Document>
            </div>
          </div>
        </div>
      ) : (
        <Warn setFlag={setFlag} />
      )}
    </>
    }
    </>
  );
}

export default ViewSection;
