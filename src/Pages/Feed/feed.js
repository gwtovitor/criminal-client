import React, { useState, useEffect } from 'react';
import './feed.css';
import more from './Images/more.svg';
import like from './Images/like.svg';
import comment from './Images/comment.svg';
import tips from './Images/dollar.svg';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../Services/api';


function Feed() {
    const [feed, setFeed] = useState([]);
    const [position, setPosition] = useState(0);
    const [newComment, setNewComment] = useState('');
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleAddComment = (comment) => {
        // Logic to add the comment
    };



    async function montaFeed(id) {
        const posts = await api.get(`feed/${id}`);
        console.log(posts)
        const newFeed = [...feed];

        for (const p of posts.data) {

            if (p != null) {
                const postData = await api.get(`/post/${p}`);

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
                    "comentarios": postData.data.comments,
                    "createdAt": postData.data.createdAt // Adicione a propriedade createdAt ao objeto postObj
                };

                newFeed.push(postObj); // Adiciona o novo objeto ao array newFeed
            } else {
                console.log('null')
            }


        }

        // Ordena o array newFeed com base na propriedade createdAt, dos mais novos para os mais antigos
        newFeed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setFeed(newFeed); // Atualiza o estado do array feed com o novoFeed
    }




    useEffect(() => {

        montaFeed(localStorage.cc_p);

        function handleScroll() {
            setPosition(window.pageYOffset);
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    function handleLike(id) {
        // implementation
    }

    ;

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
                                <button type="button" onClick={() => handleLike(post._id)}>
                                    <img src={like} alt="like" />

                                </button>
                                <img src={comment} alt="comment" />
                                <img src={tips} alt="tips" />
                            </div>
                            <strong>{post.likes} curtidas</strong>
                            <p>{post.description}</p>
                            {Object.entries(post.comentarios).slice(0, 2).map(([nome, comentario]) => (
                                <div>
                                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '6px', alignItems: 'center' }} key={nome}>
                                        <Avatar style={{ marginRight: '5px' }} src={comentario.picture}></Avatar>
                                        <div style={{ marginTop: '5px', display: 'flex', flexDirection: 'row' }}>
                                            <p style={{ fontWeight: 'bold' }}>{nome}</p>
                                            <span style={{ cursor: 'pointer' }} data-toggle="modal" data-target={`#exampleModalLong${post._id}`}>
                                                <p>: {comentario.comentario}</p>
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            ))}

                            <div className="add-comment" style={{ display: 'flex', alignItems: 'center' }}>
                                <input type="text" value={newComment} style={{ marginRight: '5px', flex: 1 }} onChange={handleCommentChange} />
                                <button className="btn btn-primary" onClick={handleAddComment}>Comentar</button>
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
                                            <div className="add-comment" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                                <input type="text" value={newComment} style={{ marginRight: '5px', flex: 1 }} onChange={handleCommentChange} />
                                                <button className="btn btn-primary" onClick={handleAddComment}>Comentar</button>
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
