import React, { useState, useEffect } from "react";
import "./feed.css";
import more from "./Images/more.svg";
import comment from "./Images/comment.svg";
import loading from "./Images/loading.gif";
import tips from "./Images/dollar.svg";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";
import { ThumbUp } from "@mui/icons-material";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from 'react-bootstrap/Carousel';
import imgPNG from './Images/pngpadrao.png'

var idsPassados = [];

function Feed() {
  const [feed, setFeed] = useState([]);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const idUser = localStorage.getItem("cc_p");
  const [likedPosts, setLikedPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [newComentarios, setComentarios] = useState({});
  const [newFeed, setNewFeed] = useState([]);
  const [feedGet, setFeedGet] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [commentsFeed, setCommmentsFeed] = useState([]);

  const handleCommentChange = (event, postId) => {
    setCommentInputs((prevInputs) => ({
      ...prevInputs,
      [postId]: event.target.value,
    }));
  };

  async function handleAddComment(postId) {
    const comment = commentInputs[postId];
    if (!comment) {
    } else {
      const userData = await api.get(`/profile/${idUser}`);
      const objetoComentario = {
        userName: `${userData.data.firstName} ${userData.data.lastName}`,
        content: comment,
        date: Date.now(),
        profilePicture: userData.data.img,
      };

      const getComentarios = await api.get(`/post/${postId}`);
      const newComentarios = getComentarios.data.comments;
      const comentariosOK = [...newComentarios, objetoComentario];
      comentariosOK.sort((a, b) => new Date(b.date) - new Date(a.date));
      const postComentarioPost = await api.patch(`/post/${postId}`, {
        comments: comentariosOK,
      });
      setCommmentsFeed((prevCommentsFeed) => {
        return { ...prevCommentsFeed, [postId]: comentariosOK };
      });
      const updatedCommentInputs = { ...commentInputs };
      updatedCommentInputs[postId] = ""; // Limpar o valor do input
      setCommentInputs(updatedCommentInputs);
    }
  }

  async function montaFeed(id) {
    if (!localStorage.cc_p || !localStorage.cc_t) return navigate("/home");
    const posts = await api.get(`feed/${id}`);
    montaPosts(posts.data);
  }

  async function montaFeed(id) {
    if (!localStorage.cc_p || !localStorage.cc_t) {
      return navigate("/home");
    }
    const posts = await api.get(`feed/${id}`);
    await montaPosts(posts.data);
  }

  async function montaPosts(feedProps) {
    const newFeed = [...feed];
    const postDates = {};
    const fetchPostDataPromises = [];

    for (const postId of feedProps) {
      if (postId != null) {
        const fetchPromise = api.get(`/post/${postId}`).then((response) => {
          const postData = response.data;
          postDates[postData._id] = new Date(postData.createdAt);
        });
        fetchPostDataPromises.push(fetchPromise);
      }
    }

    await Promise.all(fetchPostDataPromises);

    let sortedPostIds = Object.keys(postDates).sort(
      (a, b) => postDates[b] - postDates[a]
    );
    sortedPostIds = sortedPostIds.filter(
      (postId) => !idsPassados.includes(postId)
    );
    for (let i = 0; i < sortedPostIds.length && i < 10; i++) {
      const postId = sortedPostIds[i];
      idsPassados.push(postId);
      if (postId == undefined) {
        break;
      }

      const postData = await api.get(`/post/${postId}`);
      const profileData = await api.get(`profile/${postData.data.user}`);

      const comentarios = postData.data.comments.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setCommmentsFeed((prevCommentsFeed) => {
        return { ...prevCommentsFeed, [postData.data._id]: comentarios };
      });

      const postObj = {
        _id: postData.data._id,
        price: postData.data.price,
        profileId: profileData.data._id,
        author: `${profileData.data.firstName} ${profileData.data.lastName}`,
        profilePicture: profileData.data.img,
        content: postData.data.content,
        user: "vc_sabia",
        description: postData.data.legenda,
        likes: postData.data.likes.length,
        comentarios: comentarios,
        createdAt: postData.data.createdAt,
        liked: postData.data.likes.includes(idUser) ? true : false,
        agendamentoPost: postData.data.agendamentoPost,
        fotoCapa: postData.data.fotoCapa,
      };

      if (
        postObj.agendamentoPost &&
        new Date(postObj.agendamentoPost) > new Date()
      ) {
        // Fazer algo caso o post esteja agendado para o futuro
      } else {
        newFeed.push(postObj);
        console.log(postObj)

      }
    }

    setFeed(newFeed);
    setCarregando(false);
  }

  useEffect(() => {
    montaFeed(localStorage.cc_p);
  }, []);

  useEffect(() => {
    function handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        montaFeed(localStorage.cc_p);
        setCarregando(true);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [feed]);

  async function handleLike(post) {
    try {
      const postLike = await api.get(`post/${post._id}`);
      const oldLikes = postLike.data.likes;

      if (oldLikes.includes(idUser)) {
        const newLikes = oldLikes.filter((id) => id !== idUser);
        await api.patch(`post/${post._id}`, { likes: newLikes });
        post.likes--;
        post.liked = false;
        setLikedPosts(likedPosts.filter((id) => id !== post._id));
      } else {
        const newLikes = [...oldLikes, idUser];
        await api.patch(`post/${post._id}`, { likes: newLikes });
        post.likes++;
        post.liked = true;
        setLikedPosts([...likedPosts, post._id]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function verificaImg(price, capa, index, img) {
    if (price != '0,00') {
      if (capa == true) {
        if (index != 0) {
          return imgPNG
        }
      } else {
        return imgPNG
      }
    } else {
      return img
    }
  }
  function verificaVid(price, capa, index) {
    if (price != '0,00') {
      if (capa == true) {
        if (index != 0) {
          return false
        }
      } else {
        return false
      }
    } else {
      return true
    }
  }

  function verificaBlur(price, capa, index) {
    if (price != '0,00') {
      if (capa == true) {
        if (index != 0) {
          return 'blur-effect'
        }
      } else {
        return 'blur-effect'
      }
    } else {
      return 'videoplayer-feed'
    }

  }

  return (
    <div className="container-feed">
      <section id="post-list">
        {feed.length !== 0 ? (
          feed.map((post, index) => (
            <article key={post._id}>
              <header>
                <div
                  className="user-info"
                  onClick={() => {
                    navigate(`profile/${post.profileId}`);
                  }}
                >
                  <div className="user-info-row">
                    <img
                      src={post.profilePicture}
                      alt="Foto do usuário"
                      className="user-avatar"
                    />
                    <div className="user-info-column">
                      <span>{post.author}</span>
                      <span>
                        {new Date(post.createdAt).toLocaleDateString([], {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}{" "}
                        {new Date(post.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {"   "}
                      </span>
                    </div>
                  </div>
                </div>
                <img src={more} alt="Mais" />
              </header>

              <Carousel>
                {post.content.map((contentPost, index) => (
                  <Carousel.Item >
                    {contentPost.endsWith('.mp4') ? (
                      <div style={{ position: 'relative' }}>
                        {post.price !== '0,00' && (
                          post.fotoCapa ? (
                            index != 0 && (
                              <div className="price-overlay">
                                Você precisa pagar {post.price} para liberar o conteúdo
                              </div>
                            )
                          ) : (
                            <div className="price-overlay">
                              Você precisa pagar {post.price} para liberar o conteúdo
                            </div>
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
                            CC@{post.user}
                          </h6>
                        </div>
                        {verificaVid(post.price, post.fotoCapa, index, contentPost) ? (
                          <video
                            className={verificaBlur(post.price, post.fotoCapa, index)}
                            controls
                          >
                            <source src={contentPost} type="video/mp4" />
                          </video>
                        ) : (
                          <img
                            style={{ width: '100%' }}
                            className={verificaBlur(post.price, post.fotoCapa, index)}
                            src={verificaImg(post.price, post.fotoCapa, index, contentPost)}
                            alt="A imagem do Post"
                          />
                        )}

                      </div>
                    ) : (
                      <div style={{ position: 'relative' }}>
                        {post.price !== '0,00' && (
                          post.fotoCapa ? (
                            index != 0 && (
                              <div className="price-overlay">
                                Você precisa pagar {post.price} para liberar o conteúdo
                              </div>
                            )
                          ) : (
                            <div className="price-overlay">
                              Você precisa pagar {post.price} para liberar o conteúdo
                            </div>
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
                            CC@{post.user}
                          </h6>
                        </div>
                        <img
                          style={{ width: '100%' }}
                          className={verificaBlur(post.price, post.fotoCapa, index)}
                          src={verificaImg(post.price, post.fotoCapa, index, contentPost)}
                          alt="A imagem do Post"
                        />
                      </div>
                    )}
                  </Carousel.Item>
                ))}
              </Carousel>


              <footer>
                <div className="actions">
                  {post.liked ? (
                    <ThumbUp
                      style={{ color: "blue", marginRight: "0.5rem" }}
                      onClick={() => handleLike(post)}
                    />
                  ) : (
                    <ThumbUp
                      style={{ color: "black", marginRight: "0.5rem" }}
                      className="buttonsShortsSide"
                      onClick={() => handleLike(post)}
                    />
                  )}
                  <img src={comment} alt="comment" />
                  <img src={tips} alt="tips" />
                </div>
                <strong>{post.likes} curtidas</strong>
                <p>{post.description}</p>
                {commentsFeed[post._id].slice(0, 2).map((comentario, index) => (
                  <div
                    key={index}
                    style={{ cursor: "pointer" }}
                    className="mb-2"
                    data-toggle="modal"
                    data-target={`#exampleModalLong${post._id}`}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "6px",
                        alignItems: "center",
                      }}
                      key={index}
                    >
                      <Avatar
                        style={{ marginRight: "5px" }}
                        src={comentario.profilePicture}
                      ></Avatar>
                      <div
                        style={{
                          marginTop: "5px",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <p style={{ fontWeight: "bold" }}>
                          {comentario.userName}
                        </p>
                        <span>
                          <p>: {comentario.content}</p>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  className="add-comment"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <input
                    className="form-control border-black"
                    type="text"
                    value={commentInputs[post._id] || ""}
                    style={{ marginRight: "5px", flex: 1 }}
                    onChange={(event) => handleCommentChange(event, post._id)}
                  />
                  <button
                    className="btn text-white fw-semibold"
                    style={{ backgroundColor: "#e46f80" }}
                    onClick={() => handleAddComment(post._id)}
                  >
                    Comentar
                  </button>
                </div>
                <div
                  className="modal fade"
                  id={`exampleModalLong${post._id}`}
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby={`exampleModalLongTitle${post._id}`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5
                          className="modal-title"
                          id={`exampleModalLongTitle${post._id}`}
                        >
                          Comentários
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >

                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="comment-list">
                          {commentsFeed[post._id].map((comentario, index) => (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                margin: "5px",
                                alignItems: "center",
                              }}
                              key={index}
                            >
                              <div
                                style={{
                                  marginTop: "5px",
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Avatar
                                  className="close"
                                  data-dismiss="modal"
                                  onClick={() => {
                                    navigate(`profile/${post.profileId}`);
                                  }}
                                  style={{
                                    marginRight: "6px",
                                    cursor: "pointer",
                                  }}
                                  src={comentario.profilePicture}
                                />
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                  }}
                                >
                                  <p
                                    className="close"
                                    data-dismiss="modal"
                                    onClick={() => {
                                      navigate(`profile/${post.profileId}`);
                                    }}
                                    style={{
                                      fontWeight: "bold",
                                      cursor: "pointer",
                                    }}
                                  >
                                    {comentario.userName}
                                  </p>
                                  <p>: {comentario.content}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="modal-footer">
                        <div
                          className="add-comment"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <input
                            className="form-control border-black"
                            type="text"
                            value={commentInputs[post._id] || ""}
                            style={{ marginRight: "5px", flex: 1 }}
                            onChange={(event) => handleCommentChange(event, post._id)}
                          />
                          <button
                            className="btn text-white fw-semibold"
                            style={{ backgroundColor: "#e46f80" }}
                            onClick={() => handleAddComment(post._id)}
                          >
                            Comentar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
            </article>
          ))
        ) : (
          //   <p style={{ textAlign: "center" }}>Carregando...</p>
          <div className="align-loading">
            <img className="img-loading" src={loading} alt="loading..."></img>
          </div>
        )}
        {carregando ? (
          <div className="align-loading">
            <img
              className="mb-4 img-loading"
              src={loading}
              alt="loading..."
            ></img>
          </div>
        ) : null}
      </section>
    </div >
  );
}

export default Feed;
