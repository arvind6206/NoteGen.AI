import { useState } from "react";
import axios from "axios";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploaded(false);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      return alert("Please select a PDF");
    }

    const formData = new FormData();

    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/upload",
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.setItem("pdfId", res.data.pdfId);

      setUploaded(true);

      alert(res.data.msg);

    } catch (error) {

      console.log(error);

      alert(error.response?.data?.msg || "Upload Failed");

    }
  };

  const handleGenerate = async()=>{

    try{

        const pdfId = localStorage.getItem("pdfId");

        const token = localStorage.getItem("token");

        const res = await axios.post(

            "http://localhost:3000/api/v1/notes/generate-notes",

            {

                pdfId

            },

            {

                headers:{

                    token

                }

            }

        );

        navigate("/notes",{

            state:{

                notes:res.data.notes

            }

        });

    }

    catch(error){

        alert(error.response.data.msg);

    }

}

  return (
    <div className="home-container">

      <div className="upload-card">

        <h1>📄 NoteGen AI</h1>

        <p className="subtitle">
          Upload your PDF and generate AI-powered study notes.
        </p>

        <form
          className="form-container"
          onSubmit={handleUpload}
        >

          <label className="upload-label">
            Choose PDF
          </label>

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />

          {file && (
            <p className="file-name">
              Selected File:
              <span> {file.name}</span>
            </p>
          )}

          <button type="submit">
            Upload PDF
          </button>

          <button
            type="button"
            className="generate-btn"
            onClick={handleGenerate}
          >
            Generate Notes
          </button>

        </form>

      </div>

    </div>
  );
}

export default Home;
