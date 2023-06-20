import { useEffect, useState } from 'react';
import api from '../../../Services/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Assinado() {
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
      setSeguidores(respondeUserFollowers.data.subscribing);
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
    }
  
    if (seguidores.length > 0) {
      fetchFollowersData();
    }
  }, [seguidores]);
  


  return (
    <div className='row mt-3'>

      <strong>Assinando {followersData.length} usuários</strong>
      <ul class="list-group mt-4" style={{marginRight: '0.5rem'}}>
        {followersData.map(d => {
          return (

            <>
              <li class="list-group-item">
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <img src={d.img} className="rounded-circle" style={{ width: '50px', height: '50px', marginRight:'0.5rem' }} alt='profile picture' />
                  <div>
                    <strong>{`${d.firstName} ${d.lastName}`}</strong>
                    <p>{d.username}</p>
                  </div>
                </div>
              </li>
            </>

          )
        })}
      </ul>

    </div>
  )
}

export default Assinado;