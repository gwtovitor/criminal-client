import React, { useState, useEffect } from "react";
import './profile.css'
import Background from './Images/creator.jpg'
import { faInstagram, faTiktok, faAmazon } from "@fortawesome/free-brands-svg-icons";
import { faStar, faShareSquare } from '@fortawesome/free-regular-svg-icons';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import api from "../../Services/api";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";

function Profile() {
    const { id } = useParams();
    const [backgroundImage, setBackgroundImage] = useState(Background);
    const [radioValue, setRadioValue] = useState('1');
    const [username, setUsername] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [editingFunction, setEditingFunction] = useState('');
    const [editingProfile, setEditingProfile] = useState(false);
    const [isCreator, setIscCreator] = useState(false);
    const [instagramLink, setInstagramLink] = useState('')
    const [tiktokLink, setTiktok] = useState('')
    const [amazonLink, setAmazon] = useState('')
    const [bio, setBio] = useState('')
    const [networks, setNetworks] = useState('')
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [newfollowing, setNewFallowing] = useState([]);
    const url = window.location.href;
    const userId = url.split("/profile/")[1];
    const idUser = localStorage.getItem('cc_p');
    const token = localStorage.getItem('cc_t')
    const radios = [
        { name: 'Feed', value: '1' },
        { name: 'Fotos', value: '2' },
        { name: 'Videos', value: '3' },
    ];
    const [selectedImage, setSelectedImage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [profile, setProfile] = useState('');
    const [user, setUser] = useState('');
    const [isYou, setIsYou] = useState(false);
    const [sigo, setSigo] = useState(false);


    const openModal = (index) => {
        setSelectedImage(index);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };


    async function getDados() {
        if (idUser === userId) {
            setIsYou(true)

        } else {
            setIsYou(false)
        }
        try {
            const response = await api.get(`/profile/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const responseUser = await api.get(`/user/${response?.data.user}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(response.data)
            console.log(responseUser.data)

            setUser(responseUser?.data)

            if (response.data) {
                setProfile(response?.data)
                setPosts(response?.data.posts)
                setUsername(response.data.firstName)
                setSobrenome(response.data.lastName)
                setNetworks(response.data.networks)
                setBio(response.data.bio)
                setEditingFunction(response.data.role)
                setNewFallowing(response.data.following)
                setIscCreator(response?.data.creator)
            }

        } catch (error) {
            console.log(error)
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

    async function verificaseguidor() {

        try {

            const verificaseg = await api.get(`/profile/${idUser}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const seguidoresUser = verificaseg.data.following
            if (seguidoresUser.includes(userId)) {
                setSigo(true)
                console.log('sigos')
            } else {
                setSigo(false)
                console.log('n sigo')
            }

        } catch (error) {

        }

    }

    useEffect(() => {
        getDados()
        verificaseguidor()
    }, []);

    async function seguir() {
        if (idUser !== userId && sigo != true) {
            newfollowing.push(userId); // Adiciona userId ao array newfollowing

            const _enviarseguir = await api.patch(`/profile/${idUser}`, {
                following: newfollowing
            });

            window.location.reload();
        } else {
            newfollowing.pop(userId);
            const _enviarseguir = await api.patch(`/profile/${idUser}`, {
                following: newfollowing
            });
            window.location.reload();

        }
    }


    const images2 = [
        {
            src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
            width: 320,
            height: 212,
            profile: 'Lidia Beatriz',
            date: '05/02/2023',
            price: 'R$ 15,00',
            hora: '22:00',
            legenda: 'Legenda da Foto',
            tags: [
                { value: "Verts", title: "Verts" },

            ],
            caption: "After Rain (Jeshu John - designerspics.com)",
        },
    ];


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEditProfileClick = () => {
        setEditingProfile(true);
    };

    const handleSaveProfileClick = () => {
        const attProfile = api.patch(`/profile/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            role: editingFunction,
            firstName: username,
            bio: bio,
            lastName: sobrenome,
            creator: true

        })
        window.location.reload();


        setEditingProfile(false);
    };


    const handleRoleChange = (event) => {
        setEditingFunction(event.target.value);
    };
    const sobrenomeChange = (event) => {
        setSobrenome(event.target.value);
    };
    const bioChange = (event) => {
        setBio(event.target.value);
    };
    const instagramChenge = (event) => {
        setInstagramLink(event.target.value);
    };
    const tiktokChange = (event) => {
        setTiktok(event.target.value);
    };
    const amazonChange = (event) => {
        setAmazon(event.target.value);
    };

    const handleFileInputChange = (e) => {
        const files = e.target.files;

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.readAsDataURL(files[i]);

            reader.onload = (e) => {
                const newImages = e.target.result;
                setBackgroundImage(newImages);
            };
        }
    };
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text)
          .then(() => {
            toast.success("URL copiada para a área de transferência", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
          .catch(() => {
            toast.error("Falha ao copiar para a área de transferência", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      }
      

    function seguidores(seguidores) {
        if (seguidores
            == undefined) {
            return '0'

        } else {
            const value = seguidores.length
            return value
        }
    }

    return (
        <div className="profile-container">
            <div className="background-profile" style={{
                backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255,0), rgba(255, 255, 255,1)), url(${backgroundImage})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                alignItems: 'center',
                flexDirection: 'column',
                display: 'flex',
                border: 'none'
            }}>
                <div className="div-central-profile">
                    <div className="seguidores-posts-likes">
                        <span>Seguidores <br /> <span style={{ fontWeight: 'normal' }}>{seguidores(profile?.followers)}</span> </span>
                        <span>Likes <br /> <span style={{ fontWeight: 'normal' }}>100k</span>   </span>
                        <span>Posts <br /> <span style={{ fontWeight: 'normal' }}>{seguidores(profile.posts)}</span></span>
                    </div>
                    <div className="dados-profile">

                        <h1 style={{ fontWeight: 'bold', margin: 3 }}>{`${profile.firstName} ${profile.lastName}`}</h1>
                        <h6 style={{ marginTop: '10px' }}>@{user?.username}</h6>
                        <h6 className="function-user">{profile.role}</h6>
                        {isYou ? (<Button className="buttons-profile" variant="secondary" type="submit" onClick={handleEditProfileClick}>
                            <span className="buttons-name-profile" style={{ fontWeight: 'bold' }}>Editar Perfil</span>
                        </Button>) : (null)}
                        {editingProfile ? (
                            <>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Nome</span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Nome" value={username} onChange={handleUsernameChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Sobrenome</span>
                                    </div>
                                    <input type="text" className="form-control" value={sobrenome} placeholder="Sobrenome" onChange={sobrenomeChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Função</span>
                                    </div>
                                    <input type="text" className="form-control" value={editingFunction} placeholder="Função" onChange={handleRoleChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Biografia</span>
                                    </div>
                                    <input type="text" className="form-control" value={bio} placeholder="Biografia" onChange={bioChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group mb-3 d-flex justify-content-center text-center align-items-center">
                                    <label style={{ marginRight: '5px' }} for="formFileSm" className="form-label">Foto de Perfil</label>
                                    <input onChange={handleFileInputChange} className="form-control form-control-sm" id="formFileSm" type="file" />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Link para o Instagram</span>
                                    </div>
                                    <input type="text" className="form-control" value={instagramLink} placeholder="Instagram" onChange={instagramChenge} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Link para o Tiktok</span>
                                    </div>
                                    <input type="text" className="form-control" value={tiktokLink} placeholder="TikTok" onChange={tiktokChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Link para o Amazon</span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Amazon List" value={amazonLink} onChange={amazonChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>

                                <Button className="buttons-profile" variant="secondary" type="submit" onClick={handleSaveProfileClick}>
                                    <span className="buttons-name-profile" style={{ fontWeight: 'bold' }}>Salvar</span>
                                </Button>
                            </>
                        ) : (
                            null
                        )}


                        {profile?.creator ? (
                            <>
                                <div className="buttons-profile-wrapper">
                                    {isYou ? (null)
                                    : (<><Button className="buttons-profile m-2" onClick={() => { seguir() }} variant={sigo ? 'danger' : 'secondary'} type="submit">
                                    <span className="buttons-name-profile" style={{ fontWeight: sigo? 'normal' : 'bold', fontSize: sigo? '12px': '15px' }}>{sigo ? 'Deixar de Seguir' : 'Seguir'}</span>
                                </Button>
                                    <Button className="buttons-profile m-2" variant="secondary" type="submit">
                                        <span className="buttons-name-profile" style={{ fontWeight: 'bold' }}>Assinar R$ 50</span>
                                    </Button>
                                    <Button className="buttons-profile m-2" variant="secondary" type="submit">
                                        <span className="buttons-name-profile" style={{ fontWeight: 'bold' }}>Pedidos</span>
                                    </Button></>)}

                                </div>
                            </>) : (null)}

                    </div>
                    <div className="social-networks">
                        {isCreator ? (
                            isYou ? null : (
                                <>
                                    <button className="m-1" style={{ border: 'none', background: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        Tips <FontAwesomeIcon style={{ marginLeft: '0.5rem' }} icon={faCoins} />
                                    </button>
                                    <button className="m-1" style={{ border: 'none', background: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        Favoritar <FontAwesomeIcon style={{ marginLeft: '0.5rem' }} icon={faStar} />
                                    </button>
                                    <button  className="m-1" onClick={()=>{copyToClipboard(url)}} style={{ border: 'none', background: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        Copiar URL do Perfil <FontAwesomeIcon style={{ marginLeft: '0.5rem' }} icon={faShareSquare} />
                                    </button>
                                </>
                            )
                        ) : null}
                    </div>


                    <div className="social-networks">
                        {instagramLink !== '' && (
                            <button className="m-1" style={{ border: 'none', background: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <a target="blank" style={{marginRight:'0.2rem', textDecoration: 'none', color: 'black', }} href={instagramLink}>Instagram</a>
                                <FontAwesomeIcon style={{marginRight:'0.5rem'}} icon={faInstagram} />
                            </button>
                        )}
                        {tiktokLink !== '' && (
                            <button className="m-1" style={{ border: 'none', background: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft:'0,5rem' }}>
                                <a target="blank" style={{ textDecoration: 'none', color: 'black',marginRight:'0.2rem' }} href={tiktokLink}>TikTok</a>
                                <FontAwesomeIcon style={{marginRight:'0.5rem'}} icon={faTiktok} />
                            </button>
                        )}
                        {amazonLink !== '' && (
                            <button className="m-1" style={{ border: 'none', background: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft:'0,5rem'  }}>
                                <a target="blank" style={{marginRight:'0.2rem', textDecoration: 'none', color: 'black', }} href={amazonLink}>Amazon</a>
                                <FontAwesomeIcon style={{marginRight:'0.5rem', marginTop:'3px'}} icon={faAmazon} />
                            </button>
                        )}

                    </div>



                </div>
                {profile.bio ? (<div className="container-sobremim" >
                    <span style={{ fontWeight: 'bold' }}>
                        Biografia<br />
                        <span style={{ fontWeight: 'normal' }}>
                            {profile?.bio}
                        </span>
                    </span>
                </div>) : (null)}
                <div className="radio-buttons">
                    <ButtonGroup>
                        {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant={'secondary'}
                                name="radio"
                                value={radio.value}
                                checked={radioValue === radio.value}
                                onChange={(e) => setRadioValue(e.currentTarget.value)}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>


                </div>
                {profile?.creator && (
                    <div className="row">
                        {posts.length > 0 ? (
                            posts.map((images, index) => (
                                <div className="col-lg-4 col-md-5">
                                    <img
                                        src={images.src}
                                        className="w-100 shadow-1-strong rounded mb-1"
                                        alt="Boat on Calm Water"
                                        style={{ margin: '0', padding: '0', cursor: 'pointer' }}
                                        width={images.width}
                                        height={images.height}
                                        onClick={() => { openModal(index) }}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="mb-5">
                                <p>Nenhuma postagem</p>
                            </div>
                        )}
                    </div>
                )}

                <Modal show={showModal} onHide={closeModal} centered>
                    <Modal.Header closeButton>

                    </Modal.Header>
                    <Modal.Body style={{ flexDirection: 'column' }} className="d-flex justify-content-center align-items-center">
                        <img src={images2[selectedImage].src} className="img-fluid" alt="Imagem Modal" />
                        <span>{images2[selectedImage].legenda}</span>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="secondary">
                            Arquivar
                        </Button>
                        <Button variant="secondary">
                            Editar Legenda
                        </Button>
                        <div className="form-check-reverse text-start form-switch">
                            <input className="form-check-input" style={{ width: '2.5rem', height: '1.5rem' }} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                            <label className="form-check-label mt-1" style={{ marginRight: '8px' }} for="flexSwitchCheckDefault">Desativar Comentários</label>
                        </div>
                        <Button variant="danger">
                            Excluir Foto
                        </Button>

                        <Button variant="secondary" onClick={closeModal}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>
            
            </div>

        </div>


    )
}
export default Profile