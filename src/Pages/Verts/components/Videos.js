import { MoreVert } from "@mui/icons-material";
import React, { useRef, useState, useEffect } from "react";
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  function toggleShowFullDescription() {
    setShowFullDescription(!showFullDescription);
  }

  const shortDescription = description.split(' ').slice(0, 2).join(' ');
  const fullDescription = description.split(' ').slice(2).join(' ');

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const handleRangeChange = (event) => {
    setCurrentTime(parseFloat(event.target.value));
    videoRef.current.currentTime = parseFloat(event.target.value);
  };

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(videoRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(videoRef.current.duration);
    };

    videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
    videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      videoRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const videoElement = videoRef.current;
      if (videoElement) {
        const boundingClientRect = videoElement.getBoundingClientRect();
        if (boundingClientRect.top >= 0 && boundingClientRect.bottom <= window.innerHeight) {
          videoElement.play();
          setPlaying(true);
        } else {
          videoElement.pause();
          setPlaying(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <div className="video__cc"><h3>CC</h3></div>
      <div className="video__buttons">
        <button type="button" onClick={scrollUp} class="btn btn-primary btn-circle btn-xl"><KeyboardArrowUpIcon />
        </button>
        <button type="button" onClick={scrollDown} class="btn btn-primary btn-circle btn-xl"><KeyboardArrowDownIcon />
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
      <div className="video__controls">

        <input
          type="range"
          min="0"
          max={duration}
          step="0.01"
          value={currentTime}
          onChange={handleRangeChange}
        />
        <div>{formatTime(currentTime)}/</div>
        <div>{formatTime(duration)}</div>
      </div>


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
            {showFullDescription ? (
              <p className="description" onClick={toggleShowFullDescription}>{description}</p>
            ) : (
              <p className="description" onClick={toggleShowFullDescription}>{shortDescription}...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
