import React, { useState, useEffect } from "react";
import './profile.css'
import Background from './Images/creator.jpg'
import { faInstagram, faTiktok, faAmazon} from "@fortawesome/free-brands-svg-icons";
import { faStar, faShareSquare } from '@fortawesome/free-regular-svg-icons';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';



function Profile() {

    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'Feed', value: '1' },
        { name: 'Fotos', value: '2' },
        { name: 'Videos', value: '3' },
    ];

    const feed = [{
        "media": [{
            "type": "image",
            "url": "https://source.unsplash.com/random/800x600",
            "caption": "Imagem 1"
        },
        {
            "type": "image",
            "url": "https://source.unsplash.com/random/800x600",
            "caption": "Imagem 2"
        },
        {
            "type": "video",
            "url": "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
            "poster": "https://source.unsplash.com/random/800x600",
            "caption": "Vídeo 1"
        },
        {
            "type": "image",
            "url": "https://source.unsplash.com/random/800x600",
            "caption": "Imagem 3"
        },
        {
            "type": "video",
            "url": "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4",
            "poster": "https://source.unsplash.com/random/800x600",
            "caption": "Vídeo 2"
        },
        {
            "type": "image",
            "url": "https://source.unsplash.com/random/800x600",
            "caption": "Imagem 4"
        }
        ]
    }
    ];
    const images = feed[0].media.map((item) => {
        if (item.type === 'video') {
            return item.poster;
        }
        return item.url;
    });

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
                    <div className="seguidores-posts-likes">
                        <span>Seguidores <br /> <span style={{ fontWeight: 'normal' }}>10k</span> </span>
                        <span>Likes <br /> <span style={{ fontWeight: 'normal' }}>100k</span>   </span>
                        <span>Posts <br /> <span style={{ fontWeight: 'normal' }}>1k</span>   </span>
                    </div>
                    <div className="dados-profile">

                        <h1 style={{ fontWeight: 'bold' }}>Lidia Beatriz</h1>
                        <h6>@lidiabzz</h6>
                        <h6>B L O G U E I R A</h6>
                        <Button className="buttons-profile" variant="secondary" type="submit">
                                <span className="buttons-name-profile" style={{ fontWeight: 'bold' }}>Editar Perfil</span>
                        </Button>
                        <div className="buttons-profile-wrapper">
                            <Button className="buttons-profile" variant="secondary" type="submit">
                                <span className="buttons-name-profile" style={{ fontWeight: 'bold' }}>Seguir</span>
                            </Button>
                            <Button className="buttons-profile" variant="secondary" type="submit">
                                <span className="buttons-name-profile" style={{ fontWeight: 'bold' }}>Assinar R$ 50</span>
                            </Button>
                            <Button className="buttons-profile" variant="secondary" type="submit">
                                <span className="buttons-name-profile" style={{ fontWeight: 'bold' }}>Pedidos</span>
                            </Button>
                        </div>

                    </div>
                    <div className="social-networks">
                        <span>Tips <FontAwesomeIcon icon={faCoins} /></span>
                        <span>Favoritar <FontAwesomeIcon icon={faStar} /></span>
                        <span>Compartilhar <FontAwesomeIcon icon={faShareSquare} /></span>
                    </div>

                    <div className="social-networks">
                        <span>Instagram <FontAwesomeIcon icon={faInstagram} /></span>
                        <span>TikTok <FontAwesomeIcon icon={faTiktok} /></span>
                        <span>Lista Amazon <FontAwesomeIcon icon={faAmazon} /></span>
                    </div>

                    

                </div>
                <div className="container-sobremim" >
                    <span style={{ fontWeight: 'bold' }}>
                        Sobre mim <br />
                        <span style={{ fontWeight: 'normal' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Maecenas eu justo ultrices, consectetur felis a, sollicitudin lectus.
                            Pellentesque sed purus ut nisl accumsan efficitur. Vivamus
                            posuere euismod ex, at convallis libero hendrerit nec. Fusce
                            pulvinar eros eget convallis consequat. Etiam ornare, justo
                            sit amet tristique venenatis, lacus orci elementum ipsum, si
                            t amet rhoncus mauris lectus in lorem. Sed mollis sapien sed
                            odio posuere maximus. Proin elementum ex ut felis iaculis,
                            vel lacinia mauris tempor. Sed ut libero nunc. In mollis,
                            metus ut convallis tincidunt, sapien nunc venenatis metus,
                            nec tincidunt orci eros ut tortor. Sed tincidunt vel ipsum
                            ac cursus.
                        </span>
                    </span>
                </div>
                <div className="radio-buttons">
                    <ButtonGroup>
                        {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant={'secondary'}
                                name="radio"
                                value={radio.value}
                                checked={radioValue === radio.value}
                                onChange={(e) => setRadioValue(e.currentTarget.value)}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>


                </div>
                <div className="grid-profile">
                    {images.map((image, index) => (
                        <div
                            className='img-grid'
                            key={index} style={{
                                background: `url(${image}) no-repeat center center / cover`,

                            }}>
                        </div>
                    ))}
                </div>


            </div>

        </div>


    )
}
export default Profile