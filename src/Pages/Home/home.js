import React from 'react';
import './home.css'
import { Image } from 'react-bootstrap';
import logo from './images/logo.png'

function Home() {
  return (
    <div className="container-sl-home">

      <div className="fa-home">
        <h1 style={{cursor:'default', userSelect:'none'}}>FÃ</h1>
        <div>
          <button type="button" id='btn-home' class="btn btn-secondary">Entrar</button>
          <button type="button" id='btn-home' class="btn btn-secondary">Cadastre-se</button>
        </div>
      </div>

      <div className='criminal-home'>
        <div className='container-logo-home'>
          <Image className="logo-home" src={logo} alt="Logo da empresa" fluid />
        </div>
      </div>

      <div className="criador-home">
        <h1 style={{cursor:'default', userSelect:'none'}}>CRIADOR</h1>
        <div>
          <button type="button" id='btn-home' class="btn btn-secondary">Entrar</button>
          <button type="button" id='btn-home' class="btn btn-secondary">Cadastre-se</button>
        </div>

      </div>

    </div>
  );
}

export default Home;
