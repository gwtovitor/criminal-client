import { useEffect, useState } from 'react';
import api from '../../../Services/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Seguindo() {
  const [data, setData] = useState([]);
  const [seguindo, setSeguindo] = useState([])
  const [seguidores, setSeguidores] = useState([])
  const [followersData, setFollowers] = useState([])
  const idUser = localStorage.getItem('cc_p');
  const token = localStorage.getItem('cc_t')
  const navigate = useNavigate();
  
  useEffect(() => {
    getDados();
  }, []);
  
  async function getDados() {
    try {
      const respondeUserFollowers = await api.get(`/profile/${idUser}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setSeguidores(respondeUserFollowers.data.following);
    } catch (error) {
      console.log(error);
      if (error) {
        Swal.fire({
          icon: 'error',
          title: 'Favor logar novamente',
          text: 'Ocorreu um erro.',
          willClose: () => {
            //navigate('/home')
          }
        });
      }
    }
  }
  
  useEffect(() => {
    async function fetchFollowersData() {
      const followersData = [];
  
      for (const p of seguidores) {
        try {
          const response = await api.get(`/profile/${p}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          const userResponse = await api.get(`/user/${response.data.user}`);
          const { username } = userResponse.data;
          const { firstName, lastName, img, _id } = response.data;
       
  
          const followerData = {
            firstName,
            lastName,
            img,
            username,
            _id
          };
  
          followersData.push(followerData);
        } catch (error) {
          console.log(`Erro ao obter dados do seguidor ${p}:`, error);
        }
      }
  
      setFollowers(followersData);
      console.log(followersData)
    }
  
    if (seguidores.length > 0) {
      fetchFollowersData();
    }
  }, [seguidores]);
  


  return (
    <div className='row mt-3'>
      <div className='col-10'>
        <strong>{followersData.length} Usuarios</strong>
        <div className='row mt-1'>
          {
            followersData.map(d => {
              return (
                <div className='row mt-1'>
                  <a className='link-dark link-underline-opacity-0 col-12 col-lg-10 mt-3' style={{marginLeft: '10px', cursor:'pointer'}}  onClick={() => { navigate(`../profile/${d._id}`) }}>
                    <div className='row mt-1'>
                      <div className="col-3 col-lg-10">
                        <img src={d.img} className="rounded-circle" style={{ width: '50px', height: '50px' }} alt='profile picture' />
                      </div>
                      <div className="col-8 ms-1">
                        <strong>{`${d.firstName} ${d.lastName}`}</strong>
                        <p>{d.username}</p>
                      </div>
                    </div>
                  </a>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Seguindo;