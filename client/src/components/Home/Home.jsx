import axios from 'axios'
import { useState } from 'react'

function Home() {
  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async(e) => {
    e.preventDefault()

    if(!file){
      return alert("Please select a file")
    }

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/upload", formData,{
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      alert(res.data.msg)
    } catch (error) {
      console.log(error)
      alert("Upload Failed")
    }

  }
  return (
    <div className='file-container'>
      <form
       className='form-container'
       onSubmit={handleUpload}>

        <input 
        type="file" 
        onChange={handleFileChange}/>

        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Home;