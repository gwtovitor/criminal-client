import React, { useState, useEffect, useRef } from "react";
import "./verts.css";
import luiz from './Images/luiz.jpg'
import vitor from './Images/profile.png'
import lidia from './Images/lidia.jpg'
import jr from './Images/junior.jpg'
import Videos from "./components/Videos";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { useHistory } from "react-router-dom";

function Verts() {
    const navigate = useNavigate();
    const [muted, setMuted] = useState(false);

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
        id: 2,
        user: 'lidiabzz_',
        name: 'Lidia Beatriz',
        src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
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
        src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
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
        src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
        isMuted: false,
        showControls: true,
        isLiked: false,
        likes: 22,
        picture: jr,
        legenda: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
        date: '01/02'
      },
    ]);
    const handleMute = () => {
      setMuted((prevMuted) => !prevMuted);
    };
    
    
    const handlers = useSwipeable({
      onSwipedLeft: async () => navigate('/home'),   
    });

    return (
      <div onClick={()=>{handleMute()}}>
        {video.map((src, index) => (
        
            <Videos
              src={src.src}
              description={src.legenda}
              like={src.likes}
              id={src.id}
              channel={src.name}
              avatar={src.picture}
              date={src.date}
              key={src.id}
              muted={true}
            />
        ))}
      </div>
    );
  }

export default Verts;
