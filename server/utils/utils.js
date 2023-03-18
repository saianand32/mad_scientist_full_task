const axios = require("axios");

module.exports.compressPdf = async (buffer) => {
    const apiUrl = process.env.API_URL;
    const base64EncodedFile = buffer.toString("base64");
  
    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const requestBody = {
      Parameters: [
        {
          Name: "File",
          FileValue: {
            Name: "compressedFile.pdf",
            Data: base64EncodedFile,
          },
        },
        {
          Name: "StoreFile",
          Value: true,
        },
        {
          Name: "Presets",
          Value: "archive",
        },
      ],
    };
  
    try {
      const response = await axios.post(apiUrl, requestBody, requestConfig);
      return response.data;
    } catch (error) {
      return null;
    }
  }

  module.exports.getPdfBuffer = async(url) => {
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const pdfBuffer = Buffer.from(response.data, 'utf-8');
      return pdfBuffer;
    } catch (error) {
      console.error(error);
    }
  }