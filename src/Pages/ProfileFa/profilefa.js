import React, { useState, useEffect } from "react";
import './profilefa.css'
import Background from './Images/background.jpg'
import { Button } from "react-bootstrap";


function Profilefa() {


    return (
        <div className="profile-container">
            <div className="background-profile" style={{
                backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255,0), rgba(255, 255, 255,1)), url(${Background})`,

                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                alignItems: 'center',
                flexDirection: 'column',
                display: 'flex',
                border: 'none'
            }}>
                <div className="div-central-profile">

                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center' }}>

                        <h1 style={{ fontWeight: 'bold' }}>Lidia Beatriz</h1>
                        <h6>@lidiabzz</h6>
                        <h6>10 Seguidores</h6>
                       
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Button className="buttons-profile" variant="secondary" type="submit">
                                <span className="buttons-name-profile" style={{ fontWeight: 'bold' }}>Seguir</span>
                            </Button>
                            <Button className="buttons-profile" variant="secondary" type="submit">
                                <span className="buttons-name-profile" style={{ fontWeight: 'bold' }}>Mensagem</span>
                            </Button>
                       
                        </div>

                    </div>



                </div>
                <div style={{ width: '100%', marginTop: '60px' }}>

                </div>



            </div>

        </div>


    )
}
export default Profilefa