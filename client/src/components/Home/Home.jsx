import { useState } from "react";
import axios from "axios";
import "../../styles/Home.css";

function Home() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      return alert("Please select a file");
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.msg);
    } catch (error) {
      console.log(error);
      alert("Upload Failed");
    }
  };

  return (
    <div className="home-container">

      <div className="upload-card">

        <h1>📄 NoteGen AI</h1>

        <p className="subtitle">
          Upload your notes, PDF or document to get AI-powered summaries.
        </p>

        <form
          className="form-container"
          onSubmit={handleUpload}
        >

          <label className="upload-label">
            Choose File
          </label>

          <input
            type="file"
            onChange={handleFileChange}
          />

          {file && (
            <p className="file-name">
              Selected File: <span>{file.name}</span>
            </p>
          )}

          <button type="submit">
            Upload File
          </button>

        </form>

      </div>

    </div>
  );
}

export default Home;