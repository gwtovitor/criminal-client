import React from "react";
import './verts.css'

function Verts() {



    return (
        <div class="player-container">
        <video className="video-verts" src="seuvideo.mp4" controls></video>
        <div class="controls">
          <button class="play-button">Play</button>
          <button class="pause-button">Pause</button>
          <button class="fullscreen-button">Fullscreen</button>
        </div>
      </div>
    )
}
export default Verts