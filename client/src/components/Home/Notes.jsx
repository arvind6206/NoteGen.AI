import { useState } from "react";
import axios from "axios";
import "../../styles/Notes.css"

function Notes() {

  const [formData, setFormData] = useState({
    topic: "",
    classLevel: "",
    examType: "",
    revisionMode: false,
    includeDiagram: false,
    includeChart: false,
  });

  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const generateNotes = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await axios.post(
        "http://localhost:3000/api/v1/notes/generate-notes",
        formData,
        {
          headers: {
            token: token,
          },
        }
      );

      setNotes(res.data.data);

    } catch (error) {

      alert(error.response?.data?.msg || "Something went wrong");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="notes-container">

      <div className="notes-card">

        <h1>Generate AI Notes</h1>

        <form onSubmit={generateNotes}>

          <input
            type="text"
            name="topic"
            placeholder="Enter Topic"
            value={formData.topic}
            onChange={handleChange}
          />

          <input
            type="text"
            name="classLevel"
            placeholder="Class Level"
            value={formData.classLevel}
            onChange={handleChange}
          />

          <input
            type="text"
            name="examType"
            placeholder="Exam Type"
            value={formData.examType}
            onChange={handleChange}
          />

          <label>
            <input
              type="checkbox"
              name="revisionMode"
              checked={formData.revisionMode}
              onChange={handleChange}
            />
            Revision Mode
          </label>

          <label>
            <input
              type="checkbox"
              name="includeDiagram"
              checked={formData.includeDiagram}
              onChange={handleChange}
            />
            Include Diagram
          </label>

          <label>
            <input
              type="checkbox"
              name="includeChart"
              checked={formData.includeChart}
              onChange={handleChange}
            />
            Include Chart
          </label>

          <button type="submit">

            {loading ? "Generating..." : "Generate Notes"}

          </button>

        </form>

        {notes && (

          <div className="generated-notes">

            <h2>Generated Notes</h2>

            <pre>{notes}</pre>

          </div>

        )}

      </div>

    </div>

  );
}

export default Notes;