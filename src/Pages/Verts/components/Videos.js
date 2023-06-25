import { MoreVert } from "@mui/icons-material";
import React, { useRef, useState, useEffect } from "react";
import { ThumbUp } from "@mui/icons-material";
import "./Video.css";
import { Avatar } from "@mui/material";
import { VolumeOff, VolumeUp } from "@mui/icons-material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import api from "../../../Services/api";

function Video({
  id,
  src,
  channel,
  description,
  like,
  avatar,
  date,
  userName,
  itemId,
  muted, 
  profileId,
  onMutedChange // Adicione essa prop
}) {
  const [playing, setPlaying] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  //const [muted, setMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();



  function toggleShowFullDescription() {
    setShowFullDescription(!showFullDescription);
  }

  const shortDescription = description.split(" ").slice(0, 2).join(" ");
  const fullDescription = description.split(" ").slice(2).join(" ");

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const handleRangeChange = (event) => {
    setCurrentTime(parseFloat(event.target.value));
    videoRef.current.currentTime = parseFloat(event.target.value);
  };

  useEffect(() => {
    verificaLike();

    const handleTimeUpdate = () => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        setDuration(videoRef.current.duration);
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
      videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        videoRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const videoElement = videoRef.current;
      if (videoElement) {
        const boundingClientRect = videoElement.getBoundingClientRect();
        if (
          boundingClientRect.top >= 0 &&
          boundingClientRect.bottom <= window.innerHeight
        ) {
          videoElement.play();
          setPlaying(true);
        } else {
          videoElement.pause();
          setPlaying(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const verificaLike = () => {
    like.includes(localStorage.cc_p) ? setLiked(true) : setLiked(false);
  };

  const handleVideoPress = () => {
    if (playing) {
      setPlaying(false);
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const handleMuteClick = () => {
    const updatedMuted = !muted; // Inverte o valor de "muted"
    onMutedChange(updatedMuted); // Chama o callback do componente pai com o valor atualizado
  };

  const handleLikeClick = async () => {
    const profile = localStorage.cc_p;

    if (!liked) {
      like.push(profile);
    } else {
      const index = like.indexOf(profile);
      like.splice(index, 1);
    }

    const response = await api.patch(`vert/${itemId}`, { likes: like });

    verificaLike();
  };

  async function navegaProfile(id){
    navigate(`/profile/${id}`)
  }

  const scrollUp = () => {
    window.scrollBy({
      top: -100,
      behavior: "smooth",
    });
  };

  const scrollDown = () => {
    window.scrollBy({
      top: 100,
      behavior: "smooth",
    });
  };

  return (
    <div className="video">
      <div className="video__cc">
        <h3>{`CC ${userName}`}</h3>
      </div>
      <div className="video__buttons">
        <button
          type="button"
          onClick={scrollUp}
          className="btn btn-primary btn-circle btn-xl"
        >
          <KeyboardArrowUpIcon />
        </button>
        <button
          type="button"
          onClick={scrollDown}
          className="btn btn-primary btn-circle btn-xl"
        >
          <KeyboardArrowDownIcon />
        </button>
      </div>

      <video
        id={id}
        className="video__player"
        onClick={handleVideoPress}
        loop
        ref={videoRef}
        src={src}
        muted={muted}
      />
      <div className="video__controls">
        <input
          type="range"
          min="0"
          max={duration}
          step="0.01"
          value={currentTime}
          onChange={handleRangeChange}
        />
        <div>{formatTime(currentTime)}/</div>
        <div>{formatTime(duration)}</div>
      </div>

      <div className="shortsContainer">
        <div className="shortsVideoTop">
          <div className="shortsVideoTopIcon"></div>
        </div>
        <div className="shortsVideoSideIcons">
          <div className="shortsVideoSideIcon">
            <Avatar className="buttonsShortsSide" style={{cursor:'pointer'}} onClick={()=> {navegaProfile(profileId)}} src={avatar} />
            {liked ? (
              <ThumbUp
                className="buttonsShortsSide text-info"
                onClick={handleLikeClick}
              />
            ) : (
              <ThumbUp
                className="buttonsShortsSide"
                onClick={handleLikeClick}
              />
            )}

            <p>{like.length}</p>
          </div>
          <div onClick={handleMuteClick}>
            {muted? (
              <VolumeOff className="buttonsShortsSide" />
            ) : (
              <VolumeUp className="buttonsShortsSide" />
            )}
          </div>
          <span
            style={{ cursor: "pointer" }}
            data-toggle="modal"
            data-target={`#exampleModalLong`}
          >
            <MoreVert
              style={{ marginTop: "15px" }}
              className="buttonsShortsSide"
            />
          </span>
        </div>
        <div
          className="modal fade"
          id={"exampleModalLong"}
          tabindex="-1"
          role="dialog"
          aria-labelledby={`exampleModalLongTitle$`}
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`exampleModalLongTitle`}>
                  Comentários
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span className="xClose" aria-hidden="true">
                    &times;
                  </span>
                </button>
              </div>
              <div className="modal-body">
                <div className="comment-list d-flex flex-column">
                  <button type="button" className="btn btn-danger mt-2">
                    Denunciar Video
                  </button>
                  <button type="button" className="btn btn-primary mt-2">
                    Denunciar Perfil
                  </button>
                  <button type="button" className="btn btn-primary mt-2 mt-2">
                    Copiar Link do Perfil
                  </button>
                  <button type="button" className="btn btn-primary mt-2">
                    Copiar Link do Video
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <div
                  className="add-comment"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="shortsBottom">
          <div className="shortsDesc">
            <div className="vertsBotton">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    marginRight: "5px",
                    cursor: "pointer"
                  }}
                  onClick={()=> {navegaProfile(profileId)}}
                >
                  {channel}
                </p>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: "12px",
                  }}
                >
                  {" "}
                  - {date}
                </p>
              </div>
              {showFullDescription ? (
                <p className="description" onClick={toggleShowFullDescription}>
                  {description}
                </p>
              ) : (
                <p className="description" onClick={toggleShowFullDescription}>
                  {shortDescription}...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
