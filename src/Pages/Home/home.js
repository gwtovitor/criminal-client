import React from 'react';
import './home.css'
import { button } from 'bootstrap';
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
          <h1>CRIMINAL CLUB</h1>
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
