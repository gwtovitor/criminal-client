import React, { useState, useRef, useEffect } from "react";
import "./verts.css";
import luiz from './Images/luiz.jpg'
import vitor from './Images/profile.png'
import lidia from './Images/lidia.jpg'
import jr from './Images/junior.jpg'
import Videos from "./components/Videos";

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
      id: 1,
      user: 'gwtovitor_',
      name: 'Vitor Augusto',
      src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      isPlaying: false,
      isMuted: false,
      showControls: true,
      isLiked: false,
      likes: 45,
      picture: vitor,
      legenda: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      date: '18/05'
    },
    {
      id: 2 ,
      user: 'lidiabzz_',
      name: 'Lidia Beatriz',
      src: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
      isMuted: false,
      showControls: true,
      isLiked: false,
      likes: 10,
      picture: lidia,
      legenda: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      date: '05/04'
    },
    {
      id: 3,
      user: 'user123_',
      name: 'User Name',
      src: 'https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-woman-in-a-pool-1259-large.mp4',
      isMuted: false,
      showControls: true,
      isLiked: false,
      likes: 15,
      picture: luiz,
      legenda: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      date: '06/03'

    },
    {
      id: 4,
      user: 'user123_',
      name: 'User Name',
      src: 'https://assets.mixkit.co/videos/preview/mixkit-red-sports-car-74-large.mp4',
      isMuted: false,
      showControls: true,
      isLiked: false,
      likes: 22,
      picture: jr,
      legenda: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      date: '01/02'
    },
  ]);
  const [isMuted, setIsMuted] = useState(Array(video.length).fill(false));

  const videoRefs = Array(video.length)
    .fill(0)
    .map(() => React.createRef());

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    

  return (

    <div>
      {video.map((src, index) => {
       
        return(
          <Videos
          src={src.src}
          description={src.legenda}
          like={src.likes}
          id={src.id}
          channel={src.name}
          avatar={src.picture}
          date={src.date}
        />  
        ) })}

    </div>
  );
}



export default Verts;