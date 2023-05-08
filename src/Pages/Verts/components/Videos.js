import { MoreVert } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { ThumbUp } from "@mui/icons-material";
import "./Video.css";
import { Avatar } from "@mui/material";
import { VolumeOff, VolumeUp } from "@mui/icons-material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
function Video({
  id,
  src,
  channel,
  description,
  like,
  avatar
}) {
  const [playing, setPlaying] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef(null);

  const handleVideoPress = () => {
    if (playing) {
      setPlaying(false);
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };
  const handleMute = () => {
    videoRef.current.muted = !muted;
    setMuted((m) => !m);
  };

  const scrollUp = () => {
    window.scrollBy({
      top: -100,
      behavior: "smooth"
    });
  };

  const scrollDown = () => {
    window.scrollBy({
      top: 100,
      behavior: "smooth"
    });
  };

  return (
    <div className="video">

      <div className="video__buttons">
        <button type="button" onClick={scrollUp} class="btn btn-primary btn-circle btn-xl"><KeyboardArrowUpIcon/>
        </button>
        <button type="button" onClick={scrollDown} class="btn btn-primary btn-circle btn-xl"><KeyboardArrowDownIcon/>
        </button>

      </div>

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
          <div className="shortsVideoTopIcon"></div>
        </div>
        <div className="shortsVideoSideIcons">
          <div className="shortsVideoSideIcon">
            <Avatar className="buttonsShortsSide" src={avatar} />
            <ThumbUp className="buttonsShortsSide" />

            <p>{like}</p>

          </div>
          <div onClick={handleMute}>
            {muted ? <VolumeOff className="buttonsShortsSide" /> : <VolumeUp className="buttonsShortsSide" />}
          </div>
          <MoreVert style={{ marginTop: '15px' }} className="buttonsShortsSide" />
        </div>
        <div className="shortsBottom">
          <div className="shortsDesc">
            <p className="description">{description}</p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
