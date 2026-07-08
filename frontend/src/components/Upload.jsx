import React, { useRef, useState } from 'react'
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

function Upload({setResult}) {

    const [file, setFile] = useState(null)

    const [isDragOver, setIsDragOver] = useState(false)

    const uploadRef = useRef(null)

    const handleChange = (e) => {
        console.log(uploadRef.current.files[0])
        setFile(uploadRef.current.files[0])
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        console.log("Dragging over")
        setIsDragOver(true)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        console.log("Dropped")
        setFile(e.dataTransfer.files[0])
        setIsDragOver(false)
    }

    const handleClick = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();

    // "file" must match upload.single("file")
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(response.data);

      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

    return (
        <>
            <div className="upload-container"
            style={{opacity:`${isDragOver? 0.5 : 1}`}}
                onClick={() => uploadRef.current.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={()=>setIsDragOver(false)}
            >
                <input type="file" ref={uploadRef} onChange={handleChange} />
                <CloudUploadIcon fontSize='large'/>
                <h3>Drag & drop to upload Video/Image</h3>
                <p>{file && file.name}</p>
            </div>

            <Button variant="contained" size='small' onClick={handleClick}><h3>Upload Media</h3></Button>
            
        </>
    )
}

export default Upload
