import React, { useState, useEffect } from 'react';
import './feed.css';
import more from './Images/more.svg';
import like from './Images/like.svg';
import comment from './Images/comment.svg';
import tips from './Images/dollar.svg';
import vocesabia from './Images/vocesabia.jpg'
import luiz from './Images/luiz.jpg'
import vitor from './Images/profile.png'
import lidia from './Images/lidia.jpg'
import jr from './Images/junior.jpg'
import { Avatar } from '@mui/material';


function Feed() {
    const [feed, setFeed] = useState([]);
    const [position, setPosition] = useState(0);
    const [newComment, setNewComment] = useState('');

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };


    const handleAddComment = (comment) => {
        // Logic to add the comment
    };


    const json =
        [
            {
                "_id": "1",
                "profile": vitor,
                "author": "Vitor Augusto",
                "user": "gwtovitor_",
                "place": "Pernambuco, Brasil",
                "image": "https://picsum.photos/200",
                "description": "Descrição do post 1",
                "hashtags": "#hashtag1 #hashtag2",
                "likes": 10,
                "comentarios": {
                    Vitor: { "id": 1, "curtidas": 12, "comentario": "que bom", "picture": vitor },
                    Lidia: { "id": 2, "curtidas": 5, "comentario": ":D", "picture": lidia },
                    Luiz: { "id": 3, "curtidas": 22, "comentario": "Top demais", "picture": luiz },
                    Junior: { "id": 4, "curtidas": 1, "comentario": "Isso ai", "picture": jr },
                    Lucas: { "id": 5, "curtidas": 3, "comentario": "kkkkkkkkkk", "picture": vocesabia },


                }
            },
            {
                "_id": "2",
                "author": "Joseraldo Martins",
                "profile": jr,
                "user": "joseraldo_martins",
                "place": "Massachusetts, Estados Unidos",
                "image": "https://picsum.photos/300",
                "description": "Descrição do post 2",
                "hashtags": "#hashtag3 #hashtag4",
                "likes": 20,
                "comentarios": {
                    Lucas: { "id": 5, "curtidas": 3, "comentario": "kkkkkkkkkk", "picture": vocesabia },
                    Junior: { "id": 4, "curtidas": 1, "comentario": "Isso ai", "picture": jr },
                    Vitor: { "id": 1, "curtidas": 12, "comentario": "que bom", "picture": vitor },
                    Lidia: { "id": 2, "curtidas": 5, "comentario": ":D", "picture": lidia },
                    Luiz: { "id": 3, "curtidas": 22, "comentario": "Top demais", "picture": luiz },
                }
            },
            {
                "_id": "3",
                "author": "Luiz",
                "profile": luiz,
                "user": "luiz_",
                "place": "Washington, D.C, Estados Unidos",
                "image": "https://picsum.photos/700",
                "description": "Descrição do post 3",
                "hashtags": "#hashtag5 #hashtag6",
                "likes": 30,
                "comentarios": {
                    Vitor: { "id": 1, "curtidas": 12, "comentario": "que bom", "picture": vitor },
                    Lidia: { "id": 2, "curtidas": 5, "comentario": ":D", "picture": lidia },
                    Luiz: { "id": 3, "curtidas": 22, "comentario": "Top demais", "picture": luiz },
                    Junior: { "id": 4, "curtidas": 1, "comentario": "Isso ai", "picture": jr },
                    Lucas: { "id": 5, "curtidas": 3, "comentario": "kkkkkkkkkk", "picture": vocesabia },
                }
            },
            {
                "_id": "4",
                "author": "Lidia Beatriz",
                "profile": lidia,
                "user": "lidiabzz",
                "place": "Pernambuco, Brasil",
                "post": "Ola tudo bem? boa tarde",
                "description": "",
                "hashtags": "#hashtag5 #hashtag6",
                "likes": 30,
                "comentarios": {
                    Luiz: { "id": 3, "curtidas": 22, "comentario": "Top demais", "picture": luiz },
                    Vitor: { "id": 1, "curtidas": 12, "comentario": "que bom", "picture": vitor },
                    Lidia: { "id": 2, "curtidas": 5, "comentario": ":D", "picture": lidia },
                    Junior: { "id": 4, "curtidas": 1, "comentario": "Isso ai", "picture": jr },
                    Lucas: { "id": 5, "curtidas": 3, "comentario": "kkkkkkkkkk", "picture": vocesabia },
                }
            }
            ,
            {
                "_id": "5",
                "author": "Voce Sabia?",
                "profile": vocesabia,
                "user": "vc_sabia",
                "place": "",
                "video": "https://edisciplinas.usp.br/pluginfile.php/5196097/mod_resource/content/1/Teste.mp4",
                "description": "Descrição do post 3",
                "hashtags": "#hashtag5 #hashtag6",
                "likes": 30,
                "comentarios": {
                    Junior: { "id": 4, "curtidas": 1, "comentario": "Isso ai", "picture": jr },
                    Lidia: { "id": 2, "curtidas": 5, "comentario": ":D", "picture": lidia },
                    Luiz: { "id": 3, "curtidas": 22, "comentario": "Top demais", "picture": luiz },
                    Vitor: { "id": 1, "curtidas": 12, "comentario": "que bom", "picture": vitor },
                    Lucas: { "id": 5, "curtidas": 3, "comentario": "kkkkkkkkkk", "picture": vocesabia },
                }
            },
            {
                "_id": "6",
                "author": "Voce Sabia?",
                "profile": vocesabia,
                "user": "vc_sabia",
                "place": "",
                "video": "https://assets.mixkit.co/videos/preview/mixkit-winter-fashion-cold-looking-woman-concept-video-39874-large.mp4",
                "description": "Descrição do post 3",
                "hashtags": "#hashtag5 #hashtag6",
                "likes": 30,
                "comentarios": {
                    Lucas: { "id": 5, "curtidas": 3, "comentario": "SADASDASD", "picture": vocesabia },
                    Luiz: { "id": 3, "curtidas": 22, "comentario": "ASDSADASDASD demais", "picture": luiz },
                    Vitor: { "id": 1, "curtidas": 12, "comentario": "que bom", "picture": vitor },
                    Lidia: { "id": 2, "curtidas": 5, "comentario": ":D", "picture": lidia },
                    Junior: { "id": 4, "curtidas": 1, "comentario": "Isso ai", "picture": jr },

                }
            }
        ]


    useEffect(() => {
        setFeed(json);
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

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (

        <div className="container-feed">
            <section id="post-list">
                {feed.map((post) => (
                    <article key={post._id}>
                        <header>
                            <div className="user-info">
                                <div className="user-info-row">
                                    <img
                                        src={post.profile}
                                        alt="Foto do usuário"
                                        className="user-avatar"
                                    />


                                    <div className="user-info-column">
                                        <span>{post.author}</span>
                                        <span style={{ fontWeight: "normal" }}>{post.place}</span>

                                    </div>
                                </div>
                            </div>
                            <img src={more} alt="Mais" />
                        </header>

                        {post.image && (
                             <div style={{ position: "relative" }}>
                                <div style={{ position: "absolute", top: '60%', left: "3%" }}>
                                    <h6 style={{color:'rgba(255, 255, 255, 0.6)', opacity:'0.8', cursor:'default', userSelect:'none'}}>CC@{post.user}</h6>
                                </div>
                                <img style={{ width: '100%' }} src={post.image} alt="A imagem do Post" />
                            </div>
                        )}

                        {post.post && (
                            <p style={{ paddingLeft: "20px", paddingTop: "20px" }}>
                                {post.post}
                            </p>
                        )}

                        {post.video && (
                            <div style={{ position: "relative" }}>
                                  <div style={{ position: "absolute", top: '60%', left: "3%" }}>
                                    <h6 style={{color:'rgba(255, 255, 255, 0.6)', opacity:'0.8', cursor:'default', userSelect:'none'}}>CC@{post.user}</h6>
                                </div>
                                <video className='videoplayer-feed' controls>
                                    <source src={post.video} type="video/mp4" />
                                </video>
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
