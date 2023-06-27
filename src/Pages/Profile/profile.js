import React, { useState, useEffect } from "react";
import './profile.css'
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
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function Profile() {
    const { id } = useParams();
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
    const [newSubscribing, setnewSubscribing] = useState([]);
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
    const [assino, setAssino] = useState(false);
    const formData = new FormData();
    const [selectedFile, setSelectedFile] = useState(null);
    const [dadosPosts, setDadosPosts] = useState([]);
    const [selectedContent, setSelectedContent] = useState(null);
    const [selectedLegenda, setSelectedLegenda] = useState(null)
    const [postModal, setPostModal] = useState('')
    const [price, setPrice] = useState('')
    const [priceAssinatura, setPriceAssinatura] = useState('')
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedPhoto, setSelectedPhoto] = useState('opcao1')

    const openModal = (content) => {
        setSelectedContent(content);
        setShowModal(true);
    };
    const handleImageSelection = (event) => {
        const option = event.target.value;
        setSelectedOption(option);

        switch (option) {
            case 'opcao1':
                setSelectedPhoto('https://criminalclub-test.s3.amazonaws.com/pngtree-beautiful-romantic-full-heart-pink-background-image_276913.jpg');
                break;
            case 'opcao2':
                setSelectedPhoto('https://criminalclub-test.s3.amazonaws.com/19324a087a3ff2fcd50154d9979231c5.gif');

                break;
            case 'opcao3':
                setSelectedPhoto('https://criminalclub-test.s3.amazonaws.com/p0mz9s1xs82xyx5w.jpg');
                break;
            default:
                setSelectedPhoto('');
                break;
        }

    };


    async function deletePost() {
        const deletando = await api.delete(`./post/${postModal}`)
        const responseUser = await api.get(`/profile/${idUser}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const oldPosts = responseUser.data.posts
        const newPosts = oldPosts.filter((post) => post !== postModal);
        const deletandoPost = await api.patch(`/profile/${idUser}`, {
            posts: newPosts
        })
        window.location.reload()
    }


    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }
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
            const respondeUserFollowers = await api.get(`/profile/${idUser}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setUser(responseUser?.data)
            if (response.data) {
                setProfile(response?.data)
                setPosts(response?.data.posts)
                setUsername(response.data.firstName)
                setSobrenome(response.data.lastName)
                setNetworks(response.data.networks)
                setBio(response.data.bio)
                setEditingFunction(response.data.role)
                setIscCreator(response?.data.creator)
                setNewFallowing(respondeUserFollowers.data.following)
                setnewSubscribing(respondeUserFollowers.data.subscribing)
                setPrice(response.data.valorAssinatura)
            }

        } catch (error) {
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
        const obterDados = async () => {
            const dados = await Promise.all(
                posts.map(async (id) => {
                    try {
                        if (id) {
                            const response = await api.get(`/post/${id}`);
                            const { content, legenda, likes, comments, createdAt, price, agendamentoPost, fotoCapa } = response.data;
                            return { id, content, legenda, likes, comments, createdAt, price, agendamentoPost, fotoCapa };
                        } else {
                            return null;
                        }
                    } catch (error) {
                        console.log(`Erro ao obter dados do post ${id}:`, error);
                        return null;
                    }
                })
            );

            const sortedDados = dados.filter((dado) => dado != null).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setDadosPosts(sortedDados);
            console.log(dadosPosts)
        };

        obterDados();
    }, [posts]);


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
            } else {
                setSigo(false)
            }

        } catch (error) {

        }

    }


    async function verificaAssinado() {

        try {

            const verificaseg = await api.get(`/profile/${idUser}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const seguidoresUser = verificaseg.data.subscribing
            if (seguidoresUser.includes(userId)) {
                setAssino(true)
            } else {
                setAssino(false)
            }

        } catch (error) {

        }

    }
    useEffect(() => {
        getDados()
        verificaseguidor()
        verificaAssinado()
    }, []);

    async function seguir() {
        try {
            const verificaseg = await api.get(`/profile/${idUser}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const seguidoresUser = verificaseg.data.following;

            if (idUser !== userId && sigo !== true) {
                if (seguidoresUser.includes(userId)) {
                    return;
                } else {
                    const newfollowingUpdated = [...newfollowing, userId];
                    const _enviarseguir = await api.patch(`/profile/${idUser}`, {
                        following: newfollowingUpdated
                    });
                    const verificaseg = await api.get(`/profile/${userId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const listaSeguidores = verificaseg.data.followers
                    const newSeguidores = [...listaSeguidores, userId]
                    const _enviarseguiruser = await api.patch(`/profile/${userId}`, {
                        followers: newSeguidores
                    });
                    setSigo(true);

                }
            } else {
                const newfollowingUpdated = newfollowing.filter(id => id !== userId);
                const _enviarseguir = await api.patch(`/profile/${idUser}`, {
                    following: newfollowingUpdated
                });
                const verificaseg = await api.get(`/profile/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const listaSeguidores = verificaseg.data.followers;
                const newSeguidores = listaSeguidores.filter(id => id !== userId);

                const _enviarseguiruser = await api.patch(`/profile/${userId}`, {
                    followers: newSeguidores
                });

                setSigo(false);
            }
        } catch (error) {
            // Trate o erro adequadamente
        }
    }

    async function assinar() {
        try {

            const verificaAssinante = await api.get(`/profile/${idUser}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const assinanteUser = verificaAssinante.data.subscribing;

            if (idUser !== userId && assino !== true) {

                if (assinanteUser.includes(userId)) {

                    return;

                } else {

                    const newAssinanteUpdate = [...newSubscribing, userId];
                    const _enviaAssinante = await api.patch(`/profile/${idUser}`, {
                        subscribing: newAssinanteUpdate
                    });

                    const verificaAssinante = await api.get(`/profile/${userId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    const listaAssinantes = verificaAssinante.data.subscribing
                    const newAssinantes = [...listaAssinantes, userId]
                    const _enviaAssinantesUser = await api.patch(`/profile/${userId}`, {
                        subscribing: newAssinantes
                    });
                    setAssino(true);
                    const verificaseg = await api.get(`/profile/${idUser}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const seguidoresUser = verificaseg.data.following;
                    if (seguidoresUser.includes(userId)) {
                        return;
                    } else {
                        const newfollowingUpdated = [...newfollowing, userId];
                        const _enviarseguir = await api.patch(`/profile/${idUser}`, {
                            following: newfollowingUpdated
                        });
                        const verificaseg = await api.get(`/profile/${userId}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        const listaSeguidores = verificaseg.data.followers
                        const newSeguidores = [...listaSeguidores, userId]
                        const _enviarseguiruser = await api.patch(`/profile/${userId}`, {
                            followers: newSeguidores
                        });
                        setSigo(true);

                    }
                }
            } else {
                const newAssinantesUpdate = newSubscribing.filter(id => id !== userId);
                const _enviaAssinante = await api.patch(`/profile/${idUser}`, {
                    subscribing: newAssinantesUpdate
                });
                const verificaAssinante = await api.get(`/profile/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const listaAssinantes = verificaAssinante.data.subscribing;
                const newAssinantes = listaAssinantes.filter(id => id !== userId);

                const _enviarseguiruser = await api.patch(`/profile/${userId}`, {
                    subscribing: newAssinantes
                });

                setAssino(false);

            }
        } catch (error) {
            console.log(error)
        }
    }


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEditProfileClick = () => {
        setEditingProfile(true);
    };

    async function handleSaveProfileClick() {
        try {
            const attProfile = await api.patch(`/profile/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                role: editingFunction,
                firstName: username,
                bio: bio,
                lastName: sobrenome,
                valorAssinatura: price,
                img: selectedPhoto

            })
        } catch (error) {
            console.log(error)
        }

        const formData = new FormData();


        formData.append("file", selectedFile);

        try {
            const response = await api.post("/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            const imgPath = response.data.file.location
            try {
                const attProfile = await api.patch(`/profile/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    img: imgPath
                })

            } catch (error) {
                console.log(error)
            }

        } catch (error) {
            console.log(error)
        }
        setEditingProfile(false);
        window.location.reload()
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



    function copyToClipboard(text) {
        navigator.clipboard.writeText(text)
            .then(() => {
                toast.success("Link do perfil copiado", {
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
                toast.error("Falha ao copiar link do Perfil", {
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
    function mascaraMoeda(event) {
        const onlyDigits = event.target.value
            .split("")
            .filter(s => /\d/.test(s))
            .join("")
            .padStart(3, "0")
        const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
        event.target.value = maskCurrency(digitsFloat)
    }

    function maskCurrency(valor, locale = 'pt-BR', currency = 'BRL') {
        const valorNew = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency
        }).format(valor)
        setPrice(valorNew)
        return valorNew
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        // Adiciona um zero à esquerda para dias e meses menores que 10
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
    };

    function verificaBlurVideo(price, capa) {
        if (price != '0,00') {
            if (capa == true) {
                return 'thumbnail-video'
            } else {
                return 'thumbnail-video blurred'
            }
        } else {
            return 'thumbnail-video'
        }

    }
    function verificaBlurImage(price, capa) {
        if (price != '0,00') {
            if (capa == true) {
                return 'thumbnail-image'
            } else {
                return 'thumbnail-image blurred'
            }
        } else {
            return 'thumbnail-image'
        }

    }
    function verificaBlurModal(price, capa, index) {
        if (price != '0,00') {
            if (capa == true) {
                if (index != 0) {
                    return 'blur-effect modal-content-profile'
                }else{
                    return 'modal-content-profile'
                }
            } else {
                return 'blur-effect modal-content-profile'
            }
        } else {
            return 'modal-content-profile'
        }

    }

    return (
        <div className="profile-container">
            <div className="background-profile" style={{
                backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255,0), rgba(255, 255, 255,1)), url(${profile?.img})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                alignItems: 'center',
                flexDirection: 'column',
                display: 'flex',
                borderBottom: 'solid white',

            }}>
                <div className="div-central-profile">

                    <div className="dados-profile">

                        <h1 style={{ fontWeight: 'bold', margin: 3, marginTop: '35%' }}>{`${profile.firstName} ${profile.lastName}`}</h1>
                        <h6 style={{ marginTop: '10px' }}>@{user?.username}</h6>
                        <h6 className="function-user">{profile.role}</h6>
                        <div className="seguidores-posts-likes mt-4 mb-4">
                            <span>Seguidores <br /> <span style={{ fontWeight: 'normal', }}>{seguidores(profile?.followers)}</span> </span>
                            <span>Seguindo <br /> <span style={{ fontWeight: 'normal', margin: '0 5rem' }}>{seguidores(profile?.following)}</span>   </span>
                            <span>Posts <br /> <span style={{ fontWeight: 'normal' }}>{seguidores(profile.posts)}</span></span>
                        </div>
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
                                {isCreator ? (<>
                                    <div className="input-group mb-3 d-flex justify-content-center text-center align-items-center">
                                        <label style={{ marginRight: '5px' }} for="formFileSm" className="form-label">Foto de Perfil</label>
                                        <input onChange={handleFileSelect} className="form-control form-control-sm" id="formFileSm" type="file" />
                                    </div>

                                    <div className="input-group mb-3 d-flex justify-content-center text-center align-items-center">
                                        <label style={{ marginRight: '5px' }} for="formFileSm" className="form-label">Assinatura Mensal R$</label>
                                        <input type="text"
                                            value={price}
                                            className="form-control"
                                            placeholder="Em branco para R$ 0,00"
                                            aria-label="Amount (to the nearest dollar)"
                                            onInput={mascaraMoeda} />

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
                                    </div></>) : (
                                    <div className="row" style={{ justifyContent: 'center' }}>
                                        <p>Selecione uma Foto de Perfil</p>
                                        <div className="row " style={{ justifyContent: 'center' }}>
                                            <img src="https://criminalclub-test.s3.amazonaws.com/pngtree-beautiful-romantic-full-heart-pink-background-image_276913.jpg" style={{ width: '80px', height: '100px' }}></img>
                                            <img src="https://criminalclub-test.s3.amazonaws.com/19324a087a3ff2fcd50154d9979231c5.gif" style={{ width: '80px', height: '100px' }}></img>
                                            <img src="https://criminalclub-test.s3.amazonaws.com/p0mz9s1xs82xyx5w.jpg" style={{ width: '80px', height: '100px' }}></img>
                                            <select onChange={(event) => handleImageSelection(event)}>
                                                <option value="">Selecione uma opção</option>
                                                <option value="opcao1">Coração</option>
                                                <option value="opcao2">Black GIF</option>
                                                <option value="opcao3">Emoji</option>
                                            </select>
                                        </div>
                                    </div>
                                )}

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
                                            <span className="buttons-name-profile" style={{ fontWeight: sigo ? 'normal' : 'bold', fontSize: sigo ? '0.6rem' : '15px' }}>{sigo ? 'Deixar de Seguir' : 'Seguir'}</span>
                                        </Button>

                                            <Button className="buttons-profile m-2" onClick={() => { assinar() }} variant={assino ? 'danger' : 'secondary'} type="submit">
                                                <span className="buttons-name-profile" style={{ fontWeight: assino ? 'normal' : 'bold', fontSize: assino ? '0.6rem' : '0.7rem' }}>{assino ? 'Deixar de Assinar' : `Assinar ${price != null ? price : ''}`}</span>
                                            </Button>
                                            {sigo ? (
                                                <Button className="buttons-profile m-2" variant="secondary" type="submit">
                                                    <span className="buttons-name-profile" style={{ fontWeight: 'bold' }}>Pedidos</span>
                                                </Button>) : (null)}</>)}

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
                                    <button className="m-1" onClick={() => { copyToClipboard(url) }} style={{ border: 'none', background: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        Compartilha <FontAwesomeIcon style={{ marginLeft: '0.5rem' }} icon={faShareSquare} />
                                    </button>
                                </>
                            )
                        ) : null}
                    </div>


                    <div className="social-networks">
                        {instagramLink !== '' && (
                            <button className="m-1" style={{ border: 'none', background: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <a target="blank" style={{ marginRight: '0.2rem', textDecoration: 'none', color: 'black', }} href={instagramLink}>Instagram</a>
                                <FontAwesomeIcon style={{ marginRight: '0.5rem' }} icon={faInstagram} />
                            </button>
                        )}
                        {tiktokLink !== '' && (
                            <button className="m-1" style={{ border: 'none', background: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '0,5rem' }}>
                                <a target="blank" style={{ textDecoration: 'none', color: 'black', marginRight: '0.2rem' }} href={tiktokLink}>TikTok</a>
                                <FontAwesomeIcon style={{ marginRight: '0.5rem' }} icon={faTiktok} />
                            </button>
                        )}
                        {amazonLink !== '' && (
                            <button className="m-1" style={{ border: 'none', background: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '0,5rem' }}>
                                <a target="blank" style={{ marginRight: '0.2rem', textDecoration: 'none', color: 'black', }} href={amazonLink}>Amazon</a>
                                <FontAwesomeIcon style={{ marginRight: '0.5rem', marginTop: '3px' }} icon={faAmazon} />
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
                {isCreator ? (
                    <div className="container">
                        <div className="row mb-5">
                            {dadosPosts.length <= 0 ? (
                                <p>Sem posts</p>
                            ) : (
                                <>
                                    {dadosPosts.map((dados, index) => {
                                        const currentDate = new Date();
                                        const agendamentoPostDate = new Date(dados.agendamentoPost);

                                        if (isYou || (assino && agendamentoPostDate <= currentDate)) {
                                            return (
                                                <div key={index} className="col-md-4 mb-4">
                                                    <div className="square-thumbnail">
                                                        {dados.content[0].endsWith('.mp4') ? (
                                                            <div className="thumbnail-wrapper">
                                                                <video
                                                                    className={verificaBlurVideo(dados.price, dados.fotoCapa)}
                                                                    poster={dados.thumbnail}
                                                                    onClick={() => openModal(dados)}
                                                                >
                                                                    <source src={dados.content[0]} type="video/mp4" />
                                                                </video>
                                                                {dados.price !== '0,00' && !isYou && (
                                                                    dados.fotoCapa ? (
                                                                        <>
                                                                        </>
                                                                    ) : (
                                                                        <div className="payment-message" style={{ textAlign: 'center' }}>
                                                                            Para visualizar, você precisa pagar o valor de {dados.price}
                                                                        </div>
                                                                    )
                                                                )}
                                                                {agendamentoPostDate > currentDate && isYou && (
                                                                    <div className="payment-message" style={{ textAlign: 'center' }}>
                                                                        Post agendado para {formatDate(dados.agendamentoPost)}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <div className="thumbnail-wrapper">
                                                                <img
                                                                    className={verificaBlurImage(dados.price, dados.fotoCapa)}
                                                                    src={dados.content[0]}
                                                                    alt="Imagem do post"
                                                                    onClick={() => openModal(dados)}
                                                                />

                                                                {dados.price !== '0,00' && !isYou && (
                                                                    dados.fotoCapa ? (
                                                                        <>
                                                                        </>
                                                                    ) : (
                                                                        <div className="payment-message" style={{ textAlign: 'center' }}>
                                                                            Para visualizar, você precisa pagar o valor de {dados.price}
                                                                        </div>
                                                                    )
                                                                )}
                                                                {agendamentoPostDate > currentDate && isYou && (
                                                                    <div className="payment-message" style={{ textAlign: 'center' }}>
                                                                        Post agendado para {formatDate(dados.agendamentoPost)}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p></p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}

                                    {!isYou && dadosPosts.every((dados) => assino === false) && (
                                        <p style={{ textAlign: 'center' }}>Você precisa assinar este perfil para exibir o conteúdo</p>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                ) : (
                    <p>Esse perfil não é de criador</p>
                )}





                <Modal size="md-down" centered show={showModal} onHide={closeModal} >
                    <Modal.Body className="d-flex justify-content-center align-items-center">
                        <Carousel
                            showThumbs={false}
                            showIndicators={false}
                            dynamicHeight={true}
                        >
                            {selectedContent != null && (
                                selectedContent.content.map((post, index) => (
                                    <div key={index} style={{ position: 'relative' }}>
                                        {post.endsWith('.mp4') ? (
                                            <div style={{ position: 'relative' }}>
                                                {isYou ? (selectedContent.price != '0,00' ? (
                                                    <div className="price-overlay">
                                                        Você esta vendendo esse post por: {selectedContent.price}
                                                    </div>
                                                ) : (
                                                    <></>
                                                )) : (selectedContent.price !== '0,00' && (
                                                    selectedContent.fotoCapa ? (
                                                        index != 0 && (
                                                            <div className="price-overlay">
                                                                Você precisa pagar {selectedContent.price} para liberar o conteúdo
                                                            </div>
                                                        )
                                                    ) : (
                                                        <div className="price-overlay">
                                                            Você precisa pagar {selectedContent.price} para liberar o conteúdo
                                                        </div>
                                                    )

                                                ))}
                                                <div style={{ position: 'absolute', top: '60%', left: '3%' }}>
                                                    <h6
                                                        style={{
                                                            color: 'rgba(255, 255, 255, 0.6)',
                                                            opacity: '0.8',
                                                            cursor: 'default',
                                                            userSelect: 'none',
                                                        }}
                                                    >
                                                        CC@{username}
                                                    </h6>
                                                </div>
                                                <video
                                                    className={isYou ? 'modal-content-profile' : verificaBlurModal(selectedContent.price, selectedContent.fotoCapa, index)}
                                                    controls
                                                >
                                                    <source src={post} type="video/mp4" />

                                                </video>
                                            </div>
                                        ) : (
                                            <div style={{ position: 'relative' }}>
                                                {isYou ? (selectedContent.price != '0,00' ? (
                                                    <div className="price-overlay">
                                                        Você esta vendendo esse post por: {selectedContent.price}
                                                    </div>
                                                ) : (
                                                    <></>
                                                )) : (
                                                    selectedContent.price !== '0,00' && (
                                                        selectedContent.fotoCapa ? (
                                                            index != 0 && (
                                                                <div className="price-overlay">
                                                                    Você precisa pagar {selectedContent.price} para liberar o conteúdo
                                                                </div>
                                                            )
                                                        ) : (
                                                            <div className="price-overlay">
                                                                Você precisa pagar {selectedContent.price} para liberar o conteúdo
                                                            </div>
                                                        )

                                                    )
                                                )}
                                                <div style={{ position: 'absolute', top: '60%', left: '3%' }}>
                                                    <h6
                                                        style={{
                                                            color: 'rgba(255, 255, 255, 0.6)',
                                                            opacity: '0.8',
                                                            cursor: 'default',
                                                            userSelect: 'none',
                                                        }}
                                                    >
                                                         CC@{username}
                                                    </h6>
                                                </div>
                                                <img
                                                    style={{ width: '100%' }}
                                                    className={isYou ? 'modal-content-profile' : verificaBlurModal(selectedContent.price, selectedContent.fotoCapa, index)}
                                                    src={post}
                                                    alt="A imagem do Post"
                                                />
                                            </div>
                                        )}
                                    </div>
                                )))}
                        </Carousel>
                        {selectedLegenda && <span>{`Legenda: ${selectedLegenda}`}</span>}
                    </Modal.Body>
                    <Modal.Footer>
                        {isYou ? (<><Button onClick={() => { deletePost() }} variant="danger">Deletar</Button>
                            <Button onClick={closeModal} variant="primary">Arquivar</Button></>) : (null)}
                        <Button onClick={closeModal} variant="primary">Fechar</Button>

                    </Modal.Footer>
                </Modal>

            </div>

        </div >


    )
}
export default Profile