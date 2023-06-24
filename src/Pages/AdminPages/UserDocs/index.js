import { useEffect, useState } from 'react';
import api from '../../../Services/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';

function UserDocs() {
    const [data, setData] = useState([]);
    const [seguindo, setSeguindo] = useState([])
    const [users, setUsers] = useState([])
    const [notActiveUser, setNotActiveUsers] = useState([])
    const [followersData, setFollowers] = useState([])
    const idUser = localStorage.getItem('cc_p');
    const token = localStorage.getItem('cc_t')
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    
    const openModal = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };
    useEffect(() => {
        getDados();
    }, []);

    async function getDados() {
        try {
          const respondeUserFollowers = await api.get(`/user/`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
      
          const users = respondeUserFollowers.data;
          const notActiveUsers = users.filter(user => user.isActive === false);
      
          const notActiveUsersWithNames = [];
      
          for (const user of notActiveUsers) {
            try {
              const getDados = await api.get(`/profile/user/${user._id}`);
              const Nome = `${getDados.data.firstName} ${getDados.data.lastName}`;
              const documentos = await api.get(`/documentos/user/${user._id}`);
              const rgFrente = documentos.data.rgfrente
              const rgVerso = documentos.data.rgverso
              const selfie = documentos.data.rgself
              const cpf = documentos.data.cpf
              const userWithInfo = {
                ...user,
                Nome,
                rgFrente,
                rgVerso,
                selfie,
                cpf
              };
      
              notActiveUsersWithNames.push(userWithInfo);
              //console.log(notActiveUsersWithNames)
            } catch (error) {
              
            }
          }
          setNotActiveUsers(notActiveUsersWithNames);
          console.log(notActiveUser)
        } catch (error) {
          // Tratar erros
        }
      }
      


    /* useEffect(() => {
       async function fetchIsActiveUsers() {
         const usersData = [];
     
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
           fetchIsActiveUsers();
       }
     }, [seguidores]);
     
   
   */
    return (
        <div className='row mt-3'>

            <strong>Usuarios nao ativos {notActiveUser.length}</strong>
            <ul className="list-group mt-4" style={{ marginLeft: '1rem', marginBottom: '3rem' }}>
                {notActiveUser.map(d => {
                    return (

                        <>
                            <li className="list-group-item" key={d._id} >
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div onClick={()=>{openModal()}}>
                                        <strong>{`${d.Nome}`}</strong>
                                        <p>{d.username}</p>
                                        <p>{d.createdAt}</p>
                                        <div className='row'>
                                        <Button onClick={closeModal} className='mb-1' variant="primary">RG Frente</Button>
                                        <Button onClick={closeModal} className='mb-1'  variant="primary">RG Verso</Button>
                                        <Button onClick={closeModal} className='mb-1'  variant="primary">CPF</Button>
                                        <Button onClick={closeModal} className='mb-1'  variant="primary">Selfie</Button>
                                        <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                        <Button onClick={closeModal} variant="success">Aprovar</Button>
                                        <Button onClick={closeModal} variant="danger">Reprovar</Button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <Modal show={showModal} onHide={closeModal} centered>
                                <Modal.Body style={{ flexDirection: 'column', maxHeight: '100vh', width: '100%' }} className="d-flex justify-content-center align-items-center">
                                <strong>{`${d.username}`}</strong>
                                </Modal.Body>
                                <Modal.Footer>
                                
                                    <Button onClick={closeModal} variant="primary">Fechar</Button>

                                </Modal.Footer>
                            </Modal>
                        </>

                    )
                })}
            </ul>

        </div>
    )
}

export default UserDocs;