import React, { useState, useEffect } from "react";
import "./verts.css";
import Videos from "./components/Videos";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import api from '../../Services/api';
import { VolumeOff, VolumeUp } from "@mui/icons-material";

function Verts() {
  const navigate = useNavigate();
  const [vertsList, setVertsList] = useState([]);
  const [muted, setMuted] = useState(false);



  useEffect(() => {
    async function montaVerts() {
      const { data } = await api.get('/vert');
      const NewvertsList = [...vertsList];
      for (let i = 0; i < data.length; i++) {
        const vert = data[i];
        const profile = await api.get(`/profile/${vert.user}`);
        const getUserName = await api.get(`/user/${profile.data.user}`);

        const date = new Date(vert.createdAt);
        const day = date.getDate();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const formattedDate = `${day}/${month}`;

        const vertObj = {
          id: vert._id,
          name: `${profile.data.firstName} ${profile.data.lastName}`,
          userName: getUserName.data.username,
          src: vert.content,
          isMuted: false,
          showControls: true,
          isLiked: false,
          likes: vert.likes,
          picture: profile.data.img,
          legenda: vert.legenda,
          date: formattedDate, // Data formatada no padrão "dia/mm"
          profileID: vert.user,
        };

        if (vert.user !== localStorage.cc_p) {
          NewvertsList.push(vertObj);
        }
      }


      setVertsList(NewvertsList);
    };
    montaVerts();
  }, []);

  const handleMutedChange = (updatedMuted) => {
    setMuted(updatedMuted);
  };


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

      {vertsList.map((src, index) => (
        <div
          onTouchStart={handleTouchStart(src.profileID)}
          key={index}
        >
          <Videos
            src={src.src}
            description={src.legenda}
            like={src.likes}
            id={index}
            channel={src.name}
            userName={src.userName}
            avatar={src.picture}
            date={src.date}
            itemId={src.id}
            profileId={src.profileID}
            muted={muted}
            onMutedChange={handleMutedChange} 
          />
        </div>
      ))}
    </div>
  );
}

export default Verts;
