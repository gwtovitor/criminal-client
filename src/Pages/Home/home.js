import React from 'react';
import './home.css'
import { Image } from 'react-bootstrap';
import logo from './images/logo.png';

function Home() {
  return (
    <div className="container-sl">
      <div className="criador">
        <h1>CRIADOR</h1>
        <div className='criador-buttons'>
          <button type="button" class="btn btn-secondary">Entrar</button>
          <button type="button" class="btn btn-secondary">Cadastre-se</button>
        </div>
       
      </div>
      <div className='criminal'>
          <Image className="logo" src={logo}alt="Logo da empresa" fluid />
      </div>  
      <div className="fa">
      <h1>FÃ</h1>
      <div className='criador-buttons'>
          <button type="button" class="btn btn-secondary">Entrar</button>
          <button type="button" class="btn btn-secondary">Cadastre-se</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
