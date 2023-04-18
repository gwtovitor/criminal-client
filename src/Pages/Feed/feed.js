import React, { useState, useEffect } from 'react';
import './feed.css';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import more from './Images/more.svg';
import like from './Images/like.svg';
import comment from './Images/comment.svg';
import tips from './Images/dollar.svg';
import vocesabia from './Images/vocesabia.jpg'
import luiz from './Images/luiz.jpg'
import vitor from './Images/profile.png'
import lidia from './Images/lidia.jpg'
import jr from './Images/junior.jpg'
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import CottageIcon from '@mui/icons-material/Cottage';
import SendIcon from '@mui/icons-material/Send';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';


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
                "likes": 10
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
                "likes": 20
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
                "likes": 30
            },
            {
                "_id": "3",
                "author": "Lidia Beatriz",
                "profile": lidia,
                "user": "lidiabzz",
                "place": "Pernambuco, Brasil",
                "post": "Ola tudo bem? boa tarde",
                "description": "",
                "hashtags": "#hashtag5 #hashtag6",
                "likes": 30
            }
            ,
            {
                "_id": "3",
                "author": "Voce Sabia?",
                "profile": vocesabia,
                "user": "vc_sabia",
                "place": "",
                "video": "https://edisciplinas.usp.br/pluginfile.php/5196097/mod_resource/content/1/Teste.mp4",
                "description": "Descrição do post 3",
                "hashtags": "#hashtag5 #hashtag6",
                "likes": 30
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
        <div>
            <div className="container-feed">
                <div className='navlateral'>

                    <Sidebar className='navbarside-feed' collapsedWidth='50px'>
                        <Menu>
                            <MenuItem icon={<CottageIcon />}>Feed</MenuItem>
                            <MenuItem icon={<PersonalVideoIcon />}>Verts</MenuItem>
                            <MenuItem icon={<SendIcon />}>Menssagens</MenuItem>
                            <MenuItem icon={<AttachMoneyIcon />}>Finanças</MenuItem>
                            <MenuItem icon={<AccountCircleIcon />}>Perfil</MenuItem>

                        </Menu>
                    </Sidebar>

                </div>
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
                            </footer>

                        </article>

                    ))}
                </section>

            </div>
            <footer className="footer">
                <IconButton onClick={console.log('oi')}><CottageIcon /></IconButton>
                <IconButton><PersonalVideoIcon /></IconButton>
                <IconButton><SendIcon /></IconButton>
                <IconButton><AttachMoneyIcon /></IconButton>
                <IconButton><AccountCircleIcon /></IconButton>
            </footer>

        </div>
    );
}

export default Feed;
