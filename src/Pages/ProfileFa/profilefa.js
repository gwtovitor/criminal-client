import React, { useState, useEffect } from "react";
import './profilefa.css'
import profileimg from './Images/creator.jpg'
import { Button, Image } from "react-bootstrap";


function Profilefa() {



    return (

        <div className="div-central-profilefa">
            <div>
                <Image className="profilefa-image" src={profileimg}></Image>
                <h1>Lidia Beatriz</h1>
                <h6>@lidiabzz</h6>
                <div className="seguidoresfa">
                    <span style={{ fontWeight: 'bold' }}>Seguidores</span>
                    <span>10</span>
                </div>
                <Button variant="secondary" type="submit">
                    <span className="buttons-name-profile" style={{ fontWeight: 'bold' }}>Seguir</span>
                </Button>
            </div>


        </div>







    )
}
export default Profilefa