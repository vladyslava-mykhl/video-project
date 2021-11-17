import React from "react";


export const Video = ({video, second}) => {
    const getVideo = React.createRef();
    return (
        <>
            {video && <video controls loop={true} src={`http://localhost:3000/${video}#t=${second}`} ref={getVideo} className="uploading-video"/>}
        </>
    )
}
