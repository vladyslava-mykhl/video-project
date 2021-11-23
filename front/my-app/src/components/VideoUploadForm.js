import React from "react";

export const VideoUploadForm = ({handleFileChange, name, id}) => {
    return (
        <>
            <label className="custom-file-upload">
                <input type="file" accept="video/mp4,video/mov,video/x-m4v,video/*"
                       onChange={handleFileChange}/>
                { id ? "Choose other video" : name}
            </label>
        </>
    );
};
