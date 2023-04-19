import React, { useState, useRef, useEffect } from "react";
import "./verts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeMute,
  faHeart,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

function Verts() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef(null);

  function togglePlay() {
    setIsPlaying(!isPlaying);
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  }

  function toggleMute() {
    setIsMuted(!isMuted);
    const video = videoRef.current;
    video.muted = !video.muted;
  }

  useEffect(() => {
    if (showControls) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showControls]);

  function handleMouseMove() {
    setShowControls(true);
  }

  const videos = [    "https://assets.mixkit.co/videos/preview/mixkit-mysterious-pale-looking-fashion-woman-at-winter-39878-large.mp4",    "https://edisciplinas.usp.br/pluginfile.php/5196097/mod_resource/content/1/Teste.mp4",    "https://assets.mixkit.co/videos/preview/mixkit-mysterious-pale-looking-fashion-woman-at-winter-39878-large.mp4",    "https://assets.mixkit.co/videos/preview/mixkit-mysterious-pale-looking-fashion-woman-at-winter-39878-large.mp4",    "https://edisciplinas.usp.br/pluginfile.php/5196097/mod_resource/content/1/Teste.mp4",    "https://edisciplinas.usp.br/pluginfile.php/5196097/mod_resource/content/1/Teste.mp4",  ];

  return (
    <div>
      {videos.map((videoSrc) => (
        <div
          className="verts-player-container"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setShowControls(false)}
        >
          <video
            ref={videoRef}
            className="verts-player"
            src={videoSrc}
            onClick={togglePlay}
          />
          {showControls && (
            <div className="play-button-verts">
              <button className="verts-play-pause-button" onClick={togglePlay}>
                {isPlaying ? (
                  <FontAwesomeIcon icon={faPause} />
                ) : (
                  <FontAwesomeIcon icon={faPlay} />
                )}
              </button>
            </div>
          )}
          <div className="verts-controls">
            <button className="verts-mute-button">
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button className="verts-mute-button" onClick={toggleMute}>
              <FontAwesomeIcon icon={faComment} />
            </button>
            <button className="verts-mute-button" onClick={toggleMute}>
              {isMuted ? (
                <FontAwesomeIcon icon={faVolumeMute} />
              ) : (
                <FontAwesomeIcon icon={faVolumeUp} />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Verts;