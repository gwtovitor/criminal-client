import { useEffect, useState } from 'react';
import api from '../../../Services/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { Avatar } from '@mui/material';
function UserDocs() {
    const [documentoAtual, setDocAtual] = useState('')
    const [notActiveUser, setNotActiveUsers] = useState([])
    const idUser = localStorage.getItem('cc_p');
    const token = localStorage.getItem('cc_t')
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    function openModal(docAtual){
        setShowModal(true);
        setDocAtual(docAtual)
        console.log(docAtual)
    };
    const closeModal = () => {
        setShowModal(false);
        setDocAtual('')
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

                    let rgFrente = '';
                    let rgVerso = '';
                    let selfie = '';
                    let cpfFoto = '';

                    try {
                        const documentos = await api.get(`/documentos/user/${user._id}`);
                        rgFrente = documentos.data[0].rgfrente;
                        rgVerso = documentos.data[0].rgverso;
                        selfie = documentos.data[0].rgself;
                        cpfFoto = documentos.data[0].cpf;
                    } catch (error) {
                      //  console.log(`Erro ao obter documentos do usuário ${user._id}:`, error);
                    }

                    const userWithInfo = {
                        ...user,
                        Nome,
                        rgFrente,
                        rgVerso,
                        selfie,
                        cpfFoto
                    };

                    notActiveUsersWithNames.push(userWithInfo);
                } catch (error) {
                 //   console.log(`Erro ao obter dados do usuário ${user._id}:`, error);
                }
            }

            setNotActiveUsers(notActiveUsersWithNames);
            console.log(notActiveUsersWithNames)
        } catch (error) {
            // Tratar erros
        }
    }

    async function aprovaUser(id) {
        try {
          await api.patch(`/user/${id}`, {
            isActive: true
          });
      
          // Remover o usuário aprovado da lista notActiveUser
          setNotActiveUsers(prevUsers => prevUsers.filter(user => user._id !== id));
        } catch (error) {
          console.log(`Erro ao aprovar usuário ${id}:`, error);
        }
      }

      
    return (
        <div className='row mt-3'>

            <strong>Usuarios nao ativos {notActiveUser.length}</strong>
            <ul className="list-group mt-4" style={{ marginLeft: '1rem', marginBottom: '3rem' }}>
                {notActiveUser.map(d => {
                    return (

                        <>
                            <li className="list-group-item" key={d._id} >
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div>
                                        <strong>{`Nome: ${d.Nome}`}</strong>
                                        <p>{`Nome de Usuário: ${d.username}`}</p>
                                        <p>{`Data de Criação: ${d.createdAt}`}</p>
                                        <p>{`CPF: ${d.cpf}`}</p>
                                        <p>{`Email: ${d.email}`}</p>
                                        <div className='row'>
                                            <Button onClick={()=> {openModal(d.rgFrente)}}className='mb-1' variant="primary">RG Frente</Button>
                                            <Button onClick={()=> openModal(d.rgVerso)}className='mb-1' variant="primary">RG Verso</Button>
                                            <Button onClick={()=> openModal(d.cpfFoto)} className='mb-1' variant="primary">CPF</Button>
                                            <Button onClick={()=> openModal(d.selfie)} className='mb-1' variant="primary">Selfie</Button>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <Button  variant="success" onClick={()=>{aprovaUser(d._id)}}>Aprovar</Button>
                                                <Button  variant="danger">Reprovar</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>

                        </>

                    )
                })}
            </ul>
            <Modal show={showModal} onHide={closeModal} centered>
                <Modal.Body style={{ flexDirection: 'column', maxHeight: '100vh', width: '100%' }} className="d-flex justify-content-center align-items-center">
                    <img src={documentoAtual} alt={documentoAtual} style={{ maxWidth: '100%' }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeModal} variant="primary">Fechar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UserDocs;