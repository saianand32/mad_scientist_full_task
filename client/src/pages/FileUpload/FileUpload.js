import React, { useState, useEffect } from "react";
import UploadSection from "../../components/uploadSection/UploadSection";
import ViewSection from "../../components/ViewSection/ViewSection";

const PDFViewer = () => {
  const [file, setFile] = useState(null);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <>
      {!flag && (
        <UploadSection setFile={setFile} file={file} setFlag={setFlag} />
      )}
      {flag && <ViewSection setFile={setFile} file={file} setFlag={setFlag} />}
    </>
  );
};

export default PDFViewer;
