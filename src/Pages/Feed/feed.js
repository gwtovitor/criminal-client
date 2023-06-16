import React, { useState, useEffect } from 'react';
import './feed.css';
import more from './Images/more.svg';
import comment from './Images/comment.svg';
import tips from './Images/dollar.svg';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../Services/api';
import { ThumbUp } from "@mui/icons-material";

function Feed() {
    const [feed, setFeed] = useState([]);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const idUser = localStorage.getItem('cc_p');
    const [likedPosts, setLikedPosts] = useState([]);
    const [commentInputs, setCommentInputs] = useState({});
    const [newComentarios, setComentarios] = useState({})
    

    const handleCommentChange = (event, postId) => {
        setCommentInputs((prevInputs) => ({
            ...prevInputs,
            [postId]: event.target.value
        }));
    };

    async function handleAddComment(postId) {
        const comment = commentInputs[postId];
        console.log(comment);
        const postComentarios = await api.post('/comentario', {
            perfil: idUser,
            post: postId,
            content: comment,
        })
        console.log(postId)
        const getComentarios = await api.get(`/post/${postId}`)
        const newComentarios = getComentarios.data.comments
        const comentariosOK = [...newComentarios,postComentarios.data._id ]
        const postComentarioPost = await api.patch(`/post/${postId}`,{
            comments: comentariosOK
        })
        console.log(postComentarios)
    }

    async function montaFeed(id) {
        if (!localStorage.cc_p || !localStorage.cc_t) return navigate('/home');

        const posts = await api.get(`feed/${id}`);
        const newFeed = [...feed];
        
        let flag = 0
        while (flag < posts.data.length) {
            flag ++
            console.log(flag)
            if (posts.data[flag] != null) {
                const postData = await api.get(`/post/${posts.data[flag]}`);

                const profileData = await api.get(`profile/${postData.data.user}`);
                const postObj = {
                    "_id": postData.data._id,
                    "price": postData.data.price,
                    "profileId": profileData.data._id,
                    "author": `${profileData.data.firstName} ${profileData.data.lastName}`,
                    "profilePicture": profileData.data.img,
                    "user": "vc_sabia",
                    "content": postData.data.content,
                    "description": postData.data.legenda,
                    "likes": postData.data.likes.length,
                    "comentarios": '',
                    "createdAt": postData.data.createdAt,
                    "liked": postData.data.likes.includes(idUser) ? true : false,
                    "agendamentoPost": postData.data.agendamentoPost
                };
                if (postObj.agendamentoPost && new Date(postObj.agendamentoPost) > new Date()) {
                   
                } else {
                    newFeed.push(postObj);
                    console.log(postObj.comentarios)
                }
            } else {
                console.log('null')
            }
        }
        newFeed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setFeed(newFeed); 
        console.log(feed)
    }

    async function getComentarios(comentarioID) {
        try {
          var cont = 0;
          const comentarios = [];
          while (cont < comentarioID.length) {
            const montaComentarios = await api.get(`/comentario/${comentarioID[cont]}`);
            const profile = await api.get(`/profile/${montaComentarios.data.perfil}`);
            const name = `${profile.data.firstName} ${profile.data.lastName}`;
      
            const postObj = {
              "_id": montaComentarios.data._id,
              "name": name,
              "profilePicture": profile.data.img,
              "content": montaComentarios.data.content,
              "likes": montaComentarios.data.likes.length,
              "createdAt": montaComentarios.data.createdAt,
              "liked": montaComentarios.data.likes.includes(idUser) ? true : false,
            };
            comentarios.push(postObj);
            cont++;
          }
          console.log(comentarios)
          return comentarios;
        } catch (error) {
          console.error("Ocorreu um erro:", error);
          throw error; // Você pode escolher lançar o erro novamente ou retornar um objeto vazio, se preferir.
        }
      }
      
    
    useEffect(() => {
        montaFeed(localStorage.cc_p);

    }, []);



    async function handleLike(post) {
        console.log(post._id)
        try {
            const postLike = await api.get(`post/${post._id}`);
            const oldLikes = postLike.data.likes;

            if (oldLikes.includes(idUser)) {
                const newLikes = oldLikes.filter(id => id !== idUser);
                await api.patch(`post/${post._id}`, { likes: newLikes });
                post.likes--;
                post.liked = false
                setLikedPosts(likedPosts.filter(id => id !== post._id));
            } else {
                const newLikes = [...oldLikes, idUser];
                await api.patch(`post/${post._id}`, { likes: newLikes });
                post.likes++;
                post.liked = true
                setLikedPosts([...likedPosts, post._id]);
                console.log(post._id)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div className="container-feed">
            <section id="post-list">
                {feed.map((post, index) => (
                    <article key={index}>
                        <header>
                            <div className="user-info" onClick={() => { navigate(`profile/${post.profileId}`) }}>
                                <div className="user-info-row">
                                    <img
                                        src={post.profilePicture}
                                        alt="Foto do usuário"
                                        className="user-avatar"
                                    />
                                    <div className="user-info-column">
                                        <span>{post.author}</span>
                                        <span>
                                            {new Date(post.createdAt).toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                            {' '}
                                            {new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            {"   "}
                                          </span>
                                    </div>
                                </div>
                            </div>
                            <img src={more} alt="Mais" />
                        </header>
                        {post.content.endsWith('.mp4') ? (
                            <div style={{ position: "relative" }}>
                                {post.price !== '0,00' && (
                                    <div className="price-overlay">
                                        Você precisa pagar R${post.price} para liberar o conteúdo
                                    </div>
                                )}
                                <div style={{ position: "absolute", top: '60%', left: "3%" }}>
                                    <h6 style={{ color: 'rgba(255, 255, 255, 0.6)', opacity: '0.8', cursor: 'default', userSelect: 'none' }}>CC@{post.user}</h6>
                                </div>
                                <video className={`${post.price !== '0,00' ? 'blur-effect' : ''
                                    } videoplayer-feed`} controls>
                                    <source src={post.content} type="video/mp4" />
                                </video>
                            </div>
                        ) :
                            (
                                <div style={{ position: "relative" }}>
                                    {post.price !== '0,00' && (
                                        <div className="price-overlay">
                                            Você precisa pagar R${post.price} para liberar o conteúdo
                                        </div>
                                    )}
                                    <div style={{ position: "absolute", top: '60%', left: "3%" }}>
                                        <h6 style={{ color: 'rgba(255, 255, 255, 0.6)', opacity: '0.8', cursor: 'default', userSelect: 'none' }}>CC@{post.user}</h6>
                                    </div>
                                    <img style={{ width: '100%' }} className={`${post.price !== '0,00' ? 'blur-effect' : ''
                                        }`} src={post.content} alt="A imagem do Post" />
                                </div>
                            )}
                        <footer>
                            <div className="actions">
                                {post.liked ? (
                                    <ThumbUp style={{ color: 'blue', marginRight: '0.5rem' }} onClick={() => handleLike(post)} />
                                ) : (
                                    <ThumbUp style={{ color: 'black', marginRight: '0.5rem' }} className="buttonsShortsSide" onClick={() => handleLike(post)} />
                                )}
                                <img src={comment} alt="comment" />
                                <img src={tips} alt="tips" />
                            </div>
                            <strong>{post.likes} curtidas</strong>
                            <p>{post.description}</p>
                            {Object.entries(post.comentarios).slice(0, 2).map(([comentarios]) => (
                                <div>
                                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '6px', alignItems: 'center' }} key={index}>
                                        <Avatar style={{ marginRight: '5px' }} src={comentarios.profilePicture}></Avatar>
                                        <div style={{ marginTop: '5px', display: 'flex', flexDirection: 'row' }}>
                                            <p style={{ fontWeight: 'bold' }}>{comentarios.name}</p>
                                            <span style={{ cursor: 'pointer' }} data-toggle="modal" data-target={`#exampleModalLong${post._id}`}>
                                                <p>: {comentarios.content}</p>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="add-comment" style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    value={commentInputs[post._id] || ''}
                                    style={{ marginRight: '5px', flex: 1 }}
                                    onChange={(event) => handleCommentChange(event, post._id)}
                                />
                                <button className="btn btn-primary" onClick={() => handleAddComment(post._id)}>
                                    Comentar
                                </button>
                            </div>
                            <div className="modal fade" id={`exampleModalLong${post._id}`} tabindex="-1" role="dialog" aria-labelledby={`exampleModalLongTitle${post._id}`} aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id={`exampleModalLongTitle${post._id}`}>Comentários</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="comment-list">
                                                {Object.entries(post.comentarios).map(([nome, comentario]) => (
                                                    <div style={{ display: 'flex', flexDirection: 'row', margin: '5px', alignItems: 'center' }} key={comentario.id}>
                                                        <div style={{ marginTop: '5px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                            <Avatar style={{ marginRight: '6px' }} src={comentario.picture} />
                                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                                <p style={{ fontWeight: 'bold' }}>{nome}</p>
                                                                <p>: {comentario.comentario}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <div className="add-comment" style={{ display: 'flex', alignItems: 'center' }}>
                                                <input
                                                    type="text"
                                                    value={commentInputs[post._id] || ''}
                                                    style={{ marginRight: '5px', flex: 1 }}
                                                    onChange={(event) => handleCommentChange(event, post._id)}
                                                />
                                                <button className="btn btn-primary" onClick={() => handleAddComment(post._id)}>
                                                    Comentar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </footer>

                    </article>
                ))}
            </section>
        </div >
    );
}

export default Feed;
