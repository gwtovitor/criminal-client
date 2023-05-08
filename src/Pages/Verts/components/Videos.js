import { MoreVert } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { ThumbUp } from "@mui/icons-material";
import "./Video.css";
import { ArrowBack } from "@mui/icons-material";
import { Avatar } from "@mui/material";

function Videos({
  id,
  src,
  channel,
  description,
  like,
  avatar
}) {
  const [playing, setPlaying] = useState(false);
  const [subs, setSubs] = useState(false);

  const videoRef = useRef(null);
  const handleVideoPress = () => {
    if (playing) {
      setPlaying(false);
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      setPlaying((play) => !play);
    }
  };

  const handleSubscribe = () => {
    setSubs((sub) => !sub);
  };

  return (
    <div className="video">
      <video
        id={id}
        className="video__player"
        onClick={handleVideoPress}
        loop
        ref={videoRef}
        src={src}
      />

      <div className="shortsContainer">
        <div className="shortsVideoTop">
          <div className="shortsVideoTopIcon">
            <ArrowBack />
          </div>
          <div className="shortsVideoTopIcon">
            <MoreVert />
          </div>
        </div>
        <div className="shortsVideoSideIcons">
          <div className="shortsVideoSideIcon">
            <ThumbUp />
            <p>{like}</p>
          </div>

        </div>
        <div className="shortsBottom">
          <div className="shortsDesc">
          
                  <p className="description">{description}</p>
          
          </div>
          <div className="shortDetails">
            <Avatar
              src={
               {avatar}
              }
            />
            <p>{channel}</p>
     
          </div>
        </div>
      </div>
    </div>
  );
}

export default Videos;
