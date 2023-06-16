import React, { useState, useEffect } from "react";
import "./verts.css";
import Videos from "./components/Videos";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import api from '../../Services/api';

function Verts() {
  const navigate = useNavigate();
  const [vertsList, setVertsList] = useState([]);
  
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
        console.log(vert.createdAt);
      
        if (vert.user !== localStorage.cc_p) {
          NewvertsList.push(vertObj);
        }
      }
      
  
      setVertsList(NewvertsList);
      console.log(vertsList)
    };
    montaVerts();
  }, []);

  

  return (
    
    <div>

      {vertsList.map((src, index) => (
        <div
         // onTouchStart={handleTouchStart(src.profileID)}
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
          />
        </div>
      ))}
    </div>
  );
}

export default Verts;
