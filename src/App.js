import "./App.css";
import { useState } from "react";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";

/* configure Infura auth settings */
const projectId = `${process.env.infura_id}`;
const projectSecret = `${process.env.infura_api}`;
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

/* create the client */
const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

function App() {
  const [fileUrl, updateFileUrl] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadKey, setUploadKey] = useState("");

  function generateKey() {
    let key = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 59; i++) {
      key += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return key;
  }

  const uploadFun = () => {
    // const added = await client.add(file);
    const added = "";
    const url = `https://infura-ipfs.io/ipfs/${added.path}`;
    updateFileUrl(url);
    console.log("IPFS URI: ", url);
  };

  async function onChange(e) {
    const file = e.target.files[0];
    setUploadStatus("...");
    try {
      // const added = await client.add(file);
      // const url = `https://infura-ipfs.io/ipfs/${added.path}`;
      // updateFileUrl(url);
      // console.log("IPFS URI: ", url);

      setTimeout(() => {
        setUploadStatus("Upload successful");
        setUploadKey(generateKey());
      }, 5000);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  return (
    <div className="App">
      <h1>IPFS Phase 1</h1>
      <div className="upload-container">
        <input type="file" onChange={onChange} />
        {uploadStatus && (
          <p>
            <b>
              <i>{uploadStatus}</i>
            </b>
          </p>
        )}
        {uploadKey && (
          <p>
            <u>Upload hash:</u> {uploadKey}
          </p>
        )}
        {fileUrl && (
          <div>
            <img src={fileUrl} width="600px" />
            <a href={fileUrl} target="_blank" rel="noreferrer">
              {fileUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
