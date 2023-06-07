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

function Profile() {
    const [backgroundImage, setBackgroundImage] = useState(Background);
    const [radioValue, setRadioValue] = useState('1');
    const [username, setUsername] = useState('Lidia Beatriz');
    const [userHandle, setUserHandle] = useState('lidiabzz');
    const [editingFunction, setEditingFunction] = useState('B L O G U E I R A');
    const [editingProfile, setEditingProfile] = useState(false);
    const [instagramLink, setInstagramLink] = useState('')
    const [tiktokLink, setTiktok] = useState('')
    const [amazonLink, setAmazon] = useState('')
    const navigate = useNavigate();
    const radios = [
        { name: 'Feed', value: '1' },
        { name: 'Fotos', value: '2' },
        { name: 'Videos', value: '3' },
    ];
    const [selectedImage, setSelectedImage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [profile, setProfile] = useState('');
    const [user, setUser] = useState('');

    const openModal = (index) => {
        setSelectedImage(index);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };


    async function getDados (){
        const id =  localStorage.getItem('cc_p')
        const token = localStorage.getItem('cc_t')
        console.log(id)
        try{
        const response =  await api.get(`/profile/${id}`)
        const responseUser =  await api.get(`/user/${response?.data.user}`)
        console.log('AQUIII' + response.data)
        console.log('Aquii22' + responseUser.data)
        setProfile(response?.data)
        setUser(responseUser?.data)
        }catch(error){
            console.log(error)
           if(error){
            Swal.fire({
                icon: 'error',
                title: 'Favor logar novamente',
                text: 'Ocorreu um erro.',
                willClose:()=>{
                    //navigate('/home')
                }
              });
                
           }
        }
     }

    useEffect(() => {
        getDados ()
      },[]);


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
        {
            src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
            width: 320,
            height: 212,
            profile: 'Luiz',
            date: '01/01/2020',
            price: 'R$ 50,00',
            legenda: 'Legenda da Foto',
            hora: '18:10',
            tags: [

                { value: "Mensagem", title: "Mensagem" },
            ],
            alt: "Boats (Jeshu John - designerspics.com)",
        },

        {
            src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
            width: 320,
            height: 212,
            profile: 'Junior Martins',
            date: '05/05/2022',
            price: 'R$ 7,00',
            legenda: 'Legenda da Foto',
            hora: '15:30',
            tags: [

                { value: "Feed", title: "Feed" },
            ],
        },
        {
            src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
            width: 320,
            height: 212,
            profile: 'Vitor Augusto',
            date: '10/05/2022',
            price: 'R$ 30,00',
            legenda: 'Legenda da Foto',
            hora: '15:22',
            tags: [
                { value: "Verts", title: "Verts" },

            ],
            caption: "After Rain (Jeshu John - designerspics.com)",
        },
        {
            src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
            width: 320,
            height: 212,
            profile: 'Vitor Augusto',
            date: '10/05/2022',
            price: 'R$ 30,00',
            legenda: 'Legenda da Foto',
            hora: '15:22',
            tags: [

                { value: "Mensagem", title: "Mensagem" },
            ],
            alt: "Boats (Jeshu John - designerspics.com)",
        },

        {
            src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
            width: 320,
            height: 212,
            profile: 'Vitor Augusto',
            date: '10/05/2022',
            legenda: 'Legenda da Foto',
            price: 'R$ 30,00',
            hora: '15:22',
            tags: [

                { value: "Feed", title: "Feed" },
            ],
        },
        {
            src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
            width: 320,
            height: 212,
            profile: 'Jose',
            date: '09/04/2023',
            legenda: 'Legenda da Foto',
            price: 'R$ 50,00',
            hora: '16:40',
            tags: [
                { value: "Verts", title: "Verts" },

            ],
            caption: "After Rain (Jeshu John - designerspics.com)",
        },
        {
            src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
            width: 320,
            height: 212,
            profile: 'Vinicius',
            date: '07/11/2023',
            legenda: 'Legenda da Foto',
            price: 'R$ 15,00',
            hora: '19:58',
            tags: [

                { value: "Mensagem", title: "Mensagem" },
            ],
            alt: "Boats (Jeshu John - designerspics.com)",
        },

        {
            src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
            width: 320,
            height: 212,
            profile: 'Lucas',
            date: '04/08/2023',
            legenda: 'Legenda da Foto',
            price: 'R$ 10,00',
            hora: '14:10',
            tags: [

                { value: "Feed", title: "Feed" },
            ],
        },
        {
            src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
            width: 320,
            height: 212,
            profile: 'Carlos',
            date: '15/05/2023',
            price: 'R$ 5,00',
            legenda: 'Legenda da Foto',
            hora: '16:30',
            tags: [

                { value: "Mensagem", title: "Mensagem" },
            ],
            alt: "Boats (Jeshu John - designerspics.com)",
        },

        {
            src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
            width: 320,
            height: 212,
            profile: 'Joao',
            date: '05/12/2022',
            price: 'R$ 10,00',
            legenda: 'Legenda da Foto',
            hora: '00:22',
            tags: [

                { value: "Feed", title: "Feed" },
            ],
        },
    ];


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleUserHandleChange = (event) => {
        setUserHandle(event.target.value);
    };
    const handleEditProfileClick = () => {
        setEditingProfile(true);
    };

    const handleSaveProfileClick = () => {
        const id =  localStorage.getItem('cc_p')
        if(username != ''){
            const attProfile = api.patch(`/profile/${id}`,{
                role:editingFunction,
                firstName: username,
                creator: true
            })
           window.location.reload();
        }
       
        setEditingProfile(false);
    };
    const handleRoleChange = (event) => {
        setEditingFunction(event.target.value);
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
                        <span>Seguidores <br /> <span style={{ fontWeight: 'normal' }}>{/*profile?.followers.length*/}</span> </span>
                        <span>Likes <br /> <span style={{ fontWeight: 'normal' }}>100k</span>   </span>
                        <span>Posts <br /> <span style={{ fontWeight: 'normal' }}>{/*profile.posts.length*/}</span></span>
                    </div>
                    <div className="dados-profile">

                        <h1 style={{ fontWeight: 'bold' }}>{`${profile.firstName} ${profile.lastName}`}</h1>
                        <h6 style={{ marginTop: '10px' }}>@{user?.username}</h6>
                        <h6 className="function-user">{profile.role}</h6>
                        {editingProfile ? (
                            <>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"  id="basic-addon1">Nome</span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Nome" onChange={handleUsernameChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                              <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Função</span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Biografia" onChange={handleRoleChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group mb-3 d-flex justify-content-center text-center align-items-center">
                                    <label style={{ marginRight: '5px' }} for="formFileSm" className="form-label">Foto de Perfil</label>
                                    <input onChange={handleFileInputChange} className="form-control form-control-sm" id="formFileSm" type="file" />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Link para o Instagram</span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Instagram" onChange={instagramChenge} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Link para o Tiktok</span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="TikTok" onChange={tiktokChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Link para o Amazon</span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Amazon List" onChange={amazonChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>

                                <Button className="buttons-profile" variant="secondary" type="submit" onClick={handleSaveProfileClick}>
                                    <span className="buttons-name-profile" style={{ fontWeight: 'bold' }}>Salvar</span>
                                </Button>
                            </>
                        ) : (
                            <Button className="buttons-profile" variant="secondary" type="submit" onClick={handleEditProfileClick}>
                                <span className="buttons-name-profile" style={{ fontWeight: 'bold' }}>Editar Perfil</span>
                            </Button>
                        )}
                    {profile?.creator ? (
                         <>
                       <div className="buttons-profile-wrapper">
                            <Button className="buttons-profile" variant="secondary" type="submit">
                                <span className="buttons-name-profile" style={{ fontWeight: 'bold' }}>Seguir</span>
                            </Button>
                            <Button className="buttons-profile" variant="secondary" type="submit">
                                <span className="buttons-name-profile" style={{ fontWeight: 'bold' }}>Assinar R$ 50</span>
                            </Button>
                            <Button className="buttons-profile" variant="secondary" type="submit">
                                <span className="buttons-name-profile" style={{ fontWeight: 'bold' }}>Pedidos</span>
                            </Button>
                        </div>
                        </>):(null)}

                    </div>
                    <div className="social-networks">
                        <button className="m-1" style={{ border: 'none', background:'none' }}>Tips <FontAwesomeIcon icon={faCoins} /></button>
                        <button className="m-1" style={{ border: 'none',background:'none' }}>Favoritar <FontAwesomeIcon icon={faStar} /></button>
                        <button className="m-1"style={{ border: 'none', background:'none'}}>Compartilhar <FontAwesomeIcon icon={faShareSquare} /></button>
                    </div>

                    <div className="social-networks">
                        {instagramLink !== '' && (
                            <button className="m-1" style={{ border: 'none' , background:'none'}}>
                                <a target="blank" style={{ textDecoration: 'none', color: 'black', marginRight: '3px' }} href={instagramLink}>Instagram</a>
                                <FontAwesomeIcon icon={faInstagram} />
                            </button>
                        )}
                        {tiktokLink !== '' && (
                            <button className="m-1" style={{ border: 'none' , background:'none'}}>
                                <a target="blank" style={{ textDecoration: 'none', color: 'black', marginRight: '3px' }} href={tiktokLink}>TikTok</a>
                                <FontAwesomeIcon icon={faTiktok} />
                            </button>
                        )}
                        {amazonLink !== '' && (
                            <button className="m-1" style={{ border: 'none' , background:'none'}}>
                                <a target="blank" style={{ textDecoration: 'none', color: 'black', marginRight: '3px' }} href={amazonLink}>Amazon</a>
                                <FontAwesomeIcon icon={faAmazon} />
                            </button>
                        )}

                    </div>



                </div>
                <div className="container-sobremim" >
                    <span style={{ fontWeight: 'bold' }}>
                        Sobre mim <br />
                        <span style={{ fontWeight: 'normal' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Maecenas eu justo ultrices, consectetur felis a, sollicitudin lectus.
                            Pellentesque sed purus ut nisl accumsan efficitur. Vivamus
                            posuere euismod ex, at convallis libero hendrerit nec. Fusce
                            pulvinar eros eget convallis consequat. Etiam ornare, justo
                            sit amet tristique venenatis, lacus orci elementum ipsum, si
                            t amet rhoncus mauris lectus in lorem. Sed mollis sapien sed
                            odio posuere maximus. Proin elementum ex ut felis iaculis,
                            vel lacinia mauris tempor. Sed ut libero nunc. In mollis,
                            metus ut convallis tincidunt, sapien nunc venenatis metus,
                            nec tincidunt orci eros ut tortor. Sed tincidunt vel ipsum
                            ac cursus.
                        </span>
                    </span>
                </div>
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
                <div className="row">
                    {images2.map((images, index) => {
                        return (
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
                        );
                    })}
                </div>
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