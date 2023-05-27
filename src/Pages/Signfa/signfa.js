import { Form, Button, Image, Alert } from 'react-bootstrap';
import logo from './images/logo.png';
import React, { useState } from "react";
import './signfa.css';
import GetPaises from './Services/getpais';
import api from '../../Services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signfa() {
  const [isChecked, setIsChecked] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [paisSelecionado, setPaisSelecionado] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [userName, setUsername] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

  const handleSelectPais = (paisSelecionado) => {
    setPaisSelecionado(paisSelecionado);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    setIsButtonActive(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ...
  };

  const enviarsign = async (event) => {
    event.preventDefault();
  
    if (email === "" || password === "" || name === "" || sobrenome === "" || userName === "" || confirmaSenha === "") {
      toast.error('Preencha todos os campos', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else if (password !== confirmaSenha) {
      toast.error('As senhas precisam ser iguais', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else {
      try {
        const response = await api.post('/login', {
          username: login,
          password: senha
        });
  
        if (response.data.message === 'Username or Password invalid.') {
          toast.error('Usuário ou senha inválido', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          console.log(response.data);
        }
      } catch (error) {
        // Handle error here
      }
    }
  };
  

  return (
    <div className='container-signfa'>
      <div className='container-logofa'>
        <Image className='logo-signfa' src={logo} alt="Logo da empresa" fluid />
      </div>
      <div className='centralcontainer-signfa'>
        <Form id='form-signfa'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ fontWeight: 'bold' }}>Email</Form.Label>
            <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Digite seu Email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ fontWeight: 'bold' }}>Nome</Form.Label>
            <Form.Control onChange={(e) => setName(e.target.value)} type="text" placeholder="Digite seu nome" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ fontWeight: 'bold' }}>Sobrenome</Form.Label>
            <Form.Control onChange={(e) => setSobrenome(e.target.value)} type="text" placeholder="Digite seu sobrenome" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ fontWeight: 'bold' }}>Nome de Usuário</Form.Label>
            <Form.Control onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Digite um nome de usuário" />
            <div className='col-12 d-grid'>
              <a className='btn btn-info text-white' href="#">Verificar</a>
            </div>
          </Form.Group>
          <Form.Label style={{ fontWeight: 'bold' }}>Selecione seu país de residência</Form.Label>
          <GetPaises onSelectPais={handleSelectPais} />
          <Form.Label style={{ fontWeight: 'bold' }}></Form.Label>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ fontWeight: 'bold' }}>Senha</Form.Label>
            <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Digite uma Senha" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ fontWeight: 'bold' }}>Confirme a Senha</Form.Label>
            <Form.Control onChange={(e) => setConfirmaSenha(e.target.value)} type="password" placeholder="Digite a confirmação de senha" />
          </Form.Group>
          <Form onSubmit={handleSubmit}>
            <Form.Check
              type="checkbox"
              label="Eu aceito os termos e condições de uso e declaro ser maior de 18 anos."
              checked={isChecked}
              onChange={handleCheckboxChange}
            />

            <Button
              variant="primary"
              className="socialnetworkssignfa-sign"
              type="submit"
              disabled={!isButtonActive}
              onClick={enviarsign}
            >
              <span style={{ fontWeight: 'bold' }}>Criar Conta</span>
            </Button>
          </Form>
        </Form>
      </div>
    </div>
  );
}

export default Signfa;
