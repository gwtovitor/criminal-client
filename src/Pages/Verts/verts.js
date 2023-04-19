import React, { useState, useRef, useEffect } from "react";
import "./verts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faVolumeUp,
  faVolumeMute,
  faHeart,
  faPause,
  faHeartCirclePlus

} from "@fortawesome/free-solid-svg-icons";

function Verts() {
  
  const [hovering, setHovering] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef([]);

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };



  const handleVideoClick = (index) => {
    const video = videoRefs[index].current;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const handleMuteClick = (index) => {
  const newIsMuted = [...isMuted];
  newIsMuted[index] = !newIsMuted[index];
  setIsMuted(newIsMuted);
  const video = videoRefs[index].current;
  video.muted = !video.muted;
  };

  const handleLikeClick = (index) => {
    setVideos((prevVideos) => {
      const newVideos = [...prevVideos];
      const isLiked = newVideos[index].isLiked;
      const increment = isLiked ? -1 : 1;
      newVideos[index] = {
        ...newVideos[index],
        isLiked: !isLiked,
        likes: newVideos[index].likes + increment,
      };
      return newVideos;
    });
  };
  


  const [video, setVideos] = useState([
    {
      src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      isPlaying: false,
      isMuted: false,
      showControls: true,
      isLiked: false,
      likes: 45,
    },
    {
      src: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
      isMuted: false,
      showControls: true,
      isLiked: false,
      likes: 10
    },
    {
      src: 'https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-woman-in-a-pool-1259-large.mp4',
      isMuted: false,
      showControls: true,
      isLiked: false,
      likes: 15
     
    },
    {
      src: 'https://assets.mixkit.co/videos/preview/mixkit-red-sports-car-74-large.mp4',
      isMuted: false,
      showControls: true,
      isLiked: false,
      likes: 22
    },
  ]);
  const [isMuted, setIsMuted] = useState(Array(video.length).fill(false));

  const videoRefs = Array(video.length)
    .fill(0)
    .map(() => React.createRef());
  
  
    return (

    <div>
      {video.map((src, index) => (
        <div className="verts-player-container" key={index}>
          <video
           onMouseEnter={handleMouseEnter}
           onMouseOut={handleMouseLeave}
            className="verts-player"
            src={src.src}
            muted={src.isMuted}
            onClick={() => handleVideoClick(index)}
            ref={videoRefs[index]}
          />
          {hovering && (
            <div className="play-button-verts">
              <button className="verts-play-pause-button">
                <FontAwesomeIcon icon={playing ? faPause : faPlay} />
              </button>
            </div>
          )}
          <div className="verts-controls">
          <button className="verts-mute-button">
              <FontAwesomeIcon  onClick={() => handleLikeClick(index)} style={{ color: src.isLiked ? 'red' : 'black' }} icon={faHeart} />
            </button>
            <text style={{padding:0, marginTop: -20,  marginBottom: 10}}>{src.likes}</text>
            
            <button className="verts-mute-button">
              <FontAwesomeIcon onClick={() => handleMuteClick(index)} style={{ color: "black" }} icon={isMuted[index] ? faVolumeMute : faVolumeUp} />
            </button>
            
         
          </div>
        </div>
      ))}

    </div>
  );
}


export default Verts;