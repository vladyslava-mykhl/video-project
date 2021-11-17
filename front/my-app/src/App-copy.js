import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React, {useState, useRef} from "react";


function App() {

    const [file, setFile] = useState(null);

    const onUpload = async(e) => {
        try {
            const data = new FormData()
            data.append('video', file)
            console.log(file)
            const headers = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            };
            const url = "http://localhost:3000/upload-video"
            await axios.post(url, data, headers).then((resp => console.log("Video Upload", resp))).catch((err) => console.log(err))
        } catch (e) {
            console.log(e)
        }
    }


  return (
    <div className="App">
      <div className="video-upload">
        <label className="custom-file-upload">
          <input type="file" accept="video/mp4,video/x-m4v,video/*" onChange={e => setFile(e.target.files[0])}
          Upload Video
        </label>
        <button className="video-upload-button" onClick={onUpload}>
        Save
      </button>
       <video className="uploading-video"/>
    </div>
</div>
  );
}

export default App;
