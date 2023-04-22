import React, { useState, useRef, useEffect } from "react";
import "./verts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faVolumeUp,
  faVolumeMute,
  faHeart,
  faPause,

} from "@fortawesome/free-solid-svg-icons";
import vocesabia from './Images/vocesabia.jpg'
import luiz from './Images/luiz.jpg'
import vitor from './Images/profile.png'
import lidia from './Images/lidia.jpg'
import jr from './Images/junior.jpg'
import { Image } from "react-bootstrap";

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
    { user: 'gwtovitor_',
      name: 'Vitor Augusto',
      src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      isPlaying: false,
      isMuted: false,
      showControls: true,
      isLiked: false,
      likes: 45,
      picture: vitor,
      legenda: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
    },
    { user: 'lidiabzz_',
      name: 'Lidia Beatriz',
      src: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
      isMuted: false,
      showControls: true,
      isLiked: false,
      likes: 10,
      picture: lidia,
      legenda: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
    },
    { user: 'user123_',
      name: 'User Name',
      src: 'https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-woman-in-a-pool-1259-large.mp4',
      isMuted: false,
      showControls: true,
      isLiked: false,
      likes: 15,
      picture: luiz,
      legenda: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
     
    },
    { user: 'user123_',
      name: 'User Name',
      src: 'https://assets.mixkit.co/videos/preview/mixkit-red-sports-car-74-large.mp4',
      isMuted: false,
      showControls: true,
      isLiked: false,
      likes: 22,
      picture: jr,
      legenda: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
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
        <div className="userdata">
            <Image className="profile-picture-verts" src={src.picture}/>
           <div style={{display: 'flex', flexDirection:'column'}}>
              <span style={{color: 'white'}}>{src.name}</span>
              <span style={{fontSize: '10px', color: 'white'}}>{src.user}</span>
           </div>
            </div>
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
              <FontAwesomeIcon className="control-buttons" onClick={() => handleLikeClick(index)} style={{ color: src.isLiked ? 'red' : 'black'}} icon={faHeart} />
              <FontAwesomeIcon className="control-buttonsmobile" onClick={() => handleLikeClick(index)} style={{ color: src.isLiked ? 'red' : 'white'}} icon={faHeart} />
            </button>
            <text className="text-likes">{src.likes}</text>
            
            <button className="verts-mute-button">
              <FontAwesomeIcon onClick={() => handleMuteClick(index)}  className="control-buttons" style={{ color: "black" }} icon={isMuted[index] ? faVolumeMute : faVolumeUp} />
              <FontAwesomeIcon onClick={() => handleMuteClick(index)}  className="control-buttonsmobile" style={{ color: "white" }} icon={isMuted[index] ? faVolumeMute : faVolumeUp} />
            </button>
            
         
          </div>
          <span className="legenda-verts">{src.legenda}</span>
        </div>

      ))}

    </div>
  );
}



export default Verts;