import React from "react";
import styled from 'styled-components';

export const VideoUploadForm = ({handleFileChange, name, id}) => {
    return (
        <>
            <CustomFileUpload> 
                <input type="file" accept="video/mp4,video/mov,video/x-m4v,video/*"
                       onChange={handleFileChange}/>
                { id ? "Choose other video" : name}
            </CustomFileUpload>
        </>
    );
};

const CustomFileUpload = styled.label`
  -webkit-box-shadow: 0px 5px 10px 2px rgba(7, 35, 56, 0.3);
  -moz-box-shadow: 0px 5px 10px 2px rgba(7, 35, 56, 0.3);
  box-shadow: 0px 5px 10px 2px rgba(7, 35, 56, 0.3);
  text-align: center;
  width: 300px;
  height: 280px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 90%;
  input {
    display: none;
  }
`;