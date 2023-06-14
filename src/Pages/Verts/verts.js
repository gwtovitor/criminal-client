import React, { useState, useEffect, useRef } from "react";
import "./verts.css";
import luiz from './Images/luiz.jpg'
import vitor from './Images/profile.png'
import lidia from './Images/lidia.jpg'
import jr from './Images/junior.jpg'
import Videos from "./components/Videos";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import api from '../../Services/api';

function Verts() {
  const navigate = useNavigate();
  const [video, setVideos] = useState([]);
  // const [video, setVideos] = useState([
  //   {
  //     id: '6480040fa6e855ec74c90ce0',
  //     user: 'gwtovitor_',
  //     name: 'Vitor Augusto',
  //     src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
  //     isPlaying: false,
  //     isMuted: false,
  //     showControls: true,
  //     isLiked: false,
  //     likes: 45,
  //     picture: vitor,
  //     legenda: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
  //     date: '18/05',
  //     profileID: '6480040fa6e855ec74c90ce0',
  //   },
  //   {
  //     id: '647ff3f6a6e855ec74c90c2a',
  //     user: 'lidiabzz_',
  //     name: 'Lidia Beatriz',
  //     src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
  //     isMuted: false,
  //     showControls: true,
  //     isLiked: false,
  //     likes: 10,
  //     picture: lidia,
  //     legenda: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
  //     date: '05/04',
  //     profileID: '647ff3f6a6e855ec74c90c2a',

  //   },
  //   {
  //     id: '647f62feae63101807e85518',
  //     user: 'user123_',
  //     name: 'Luizs',  
  //     src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
  //     isMuted: false,
  //     showControls: true,
  //     isLiked: false,
  //     likes: 15,
  //     picture: luiz,
  //     legenda: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
  //     date: '06/03',
  //     profileID: '647f62feae63101807e85518',

  //   },
  //   {
  //     id: '64800051a6e855ec74c90c9f',
  //     user: 'user123_',
  //     profileID: '64800051a6e855ec74c90c9f',
  //     name: 'Junior Martins',
  //     src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
  //     isMuted: false,
  //     showControls: true,
  //     isLiked: false,
  //     likes: 22,
  //     picture: jr,
  //     legenda: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
  //     date: '01/02'
  //   },
  // ]);
  useEffect(() => {
    const montaVerts = async () => {
      const { data } = await api.get('/vert');

      if (data.length > 0) {
        data?.forEach(async vert => {
          const profile = await api.get(`/profile/${vert.user}`);
          const vertObj = {
            id: vert._id,
            name: `${profile.data.firstName} ${profile.data.lastName}`,
            src: vert.content,
            isMuted: false,
            showControls: true,
            isLiked: false,
            likes: vert.likes.length,
            picture: profile.data.img,
            legenda: vert.legenda,
            date: '06/03',
            profileID: vert.user,
          };

          if (vert.user !== localStorage.cc_p) setVideos(videos => [...videos, vertObj]);
        });
      }
    };

    montaVerts();
  }, []);

  const handleSwipe = (videoId) => {
    navigate(`/profile/${videoId}`);
  };

  const handleTouchStart = (id) => (event) => {
    const startX = event.touches[0].clientX;
    const handleTouchEnd = (event) => {
      const endX = event.changedTouches[0].clientX;
      const deltaX = startX - endX;
      if (deltaX > 100) {
        handleSwipe(id);
      }
      document.removeEventListener("touchend", handleTouchEnd);
    };
    document.addEventListener("touchend", handleTouchEnd);
  };

  return (
    <div>
      {video.map((src, index) => (
        <div
          key={video.id}
          onTouchStart={handleTouchStart(src.profileID)}
        >
          <Videos
            src={src.src}
            description={src.legenda}
            like={src.likes}
            id={index}
            channel={src.name}
            avatar={src.picture}
            date={src.date}
            itemId={src.profileID}
          />
        </div>
      ))}
    </div>
  );
}

export default Verts;
