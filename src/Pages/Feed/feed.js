import React, { Component } from 'react';
import './feed.css';

import more from './Images/more.svg';
import like from './Images/like.svg';
import comment from './Images/comment.svg';
import tips from './Images/tips.svg';
import vocesabia from './Images/vocesabia.jpg'
import luiz from './Images/luiz.jpg'
import vitor from './Images/profile.png'
import lidia from './Images/lidia.jpg'
import jr from './Images/junior.jpg'



class Feed extends Component {
    state = {
        feed: [],
    };
    json =
        [
            {
                "_id": "1",
                "profile" : vitor,
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
                "profile" : jr,
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
                "profile" : luiz,
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
                "profile" : lidia,
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
                "profile" : vocesabia,
                "user": "vc_sabia",
                "place": "",
                "video": "https://edisciplinas.usp.br/pluginfile.php/5196097/mod_resource/content/1/Teste.mp4",
                "description": "Descrição do post 3",
                "hashtags": "#hashtag5 #hashtag6",
                "likes": 30
            }
        ]
    componentDidMount() {
        this.setState({ feed: this.json });
    }



    render() {
        return (
            <section id="post-list">
                {this.state.feed.map((post) => (
                    <article key={post._id}>
                        <header>
                            <div className="user-info">
                                <div className='user-info-row'>
                                    <img src={post.profile} alt="Foto do usuário" className="user-avatar" />
                                
                                    <div className="user-info-column">
                                        <span>{post.author}</span>
                                        <span style={{ fontWeight: 'normal' }}>{post.place}</span>
                                    </div>
                                </div>


                            </div>
                            <img src={more} alt="Mais" />
                        </header>

                        {post.image && (
                            <img
                                src={post.image}
                                alt="A imagem do Post"
                            />
                        )}

                        {post.post && <p style={{ paddingLeft: '20px', paddingTop: '20px' }}>{post.post}</p>}

                        {post.video && (
                            <video controls>
                                <source src={post.video} type="video/mp4" />
                            </video>
                        )}

                        <footer>
                            <div className="actions">
                                <button
                                    type="button"
                                    onClick={() => this.handleLike(post._id)}
                                >
                                    <img src={like} alt="like" />
                                </button>
                                <img src={comment} alt="comment" />
                                <img src={tips} alt="tips" />
                            </div>
                            <strong>{post.likes} curtidas</strong>
                            <p>
                                {post.description}
                            </p>
                        </footer>
                    </article>
                ))}
            </section>
        );
    }
}

export default Feed;
