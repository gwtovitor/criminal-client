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



function Feed() {
    const [feed, setFeed] = useState([]);
    const [position, setPosition] = useState(0);


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
                    "Vitor": { "curtidas": 12, "comentario": "que bom" },
                    "Lidia": { "curtidas": 5, "comentario": ":D" },
                    "Luiz": { "curtidas": 22, "comentario": "Top demais" },
                    "Junior": { "curtidas": 1, "comentario": "Isso ai" },
                    "Lucas": { "curtidas": 3, "comentario": "kkkkkkkkkk" },


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
                    "Vitor": { "curtidas": 12, "comentario": "que bom" },
                    "Lidia": { "curtidas": 5, "comentario": ":D" },
                    "Luiz": { "curtidas": 22, "comentario": "Top demais" },
                    "Junior": { "curtidas": 1, "comentario": "Isso ai" },
                    "Lucas": { "curtidas": 3, "comentario": "kkkkkkkkkk" },


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
                    "Vitor": { "curtidas": 12, "comentario": "que bom" },
                    "Lidia": { "curtidas": 5, "comentario": ":D" },
                    "Luiz": { "curtidas": 22, "comentario": "Top demais" },
                    "Junior": { "curtidas": 1, "comentario": "Isso ai" },
                    "Lucas": { "curtidas": 3, "comentario": "kkkkkkkkkk" },


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
                    "Vitor": { "curtidas": 12, "comentario": "que bom" },
                    "Lidia": { "curtidas": 5, "comentario": ":D" },
                    "Luiz": { "curtidas": 22, "comentario": "Top demais" },
                    "Junior": { "curtidas": 1, "comentario": "Isso ai" },
                    "Lucas": { "curtidas": 3, "comentario": "kkkkkkkkkk" },


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
                    "Vitor": { "curtidas": 12, "comentario": "que bom" },
                    "Lidia": { "curtidas": 5, "comentario": ":D" },
                    "Luiz": { "curtidas": 22, "comentario": "Top demais" },
                    "Junior": { "curtidas": 1, "comentario": "Isso ai" },
                    "Lucas": { "curtidas": 3, "comentario": "kkkkkkkkkk" },


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
                    Vitor: { "curtidas": 12, "comentario": "que bom" },
                    Lidia: { "curtidas": 5, "comentario": ":D" },
                    Luiz: { "curtidas": 22, "comentario": "Top demais" },
                    Junior: { "curtidas": 1, "comentario": "Isso ai" },
                    Lucas: { "curtidas": 3, "comentario": "kkkkkkkkkk" },


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

                        {post.image && <img src={post.image} alt="A imagem do Post" />}

                        {post.post && (
                            <p style={{ paddingLeft: "20px", paddingTop: "20px" }}>
                                {post.post}
                            </p>
                        )}

                        {post.video && (
                            <video className='videoplayer-feed' controls>
                                <source src={post.video} type="video/mp4" />
                            </video>
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
                            {Object.entries(post.comentarios).map(([nome, comentario]) => (
                                <p key={nome}>{nome}: {comentario.comentario}</p>
                            ))}
                        </footer>

                    </article>

                ))}
            </section>
        </div>

    );
}

export default Feed;
