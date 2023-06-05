import { Form, Button, Image } from 'react-bootstrap'
import logo from './images/logo.png'
import React, { useState } from "react";
import './login.css'
import api from '../../Services/api';
import { toast } from 'react-toastify';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function enviarLogin(event) {

        event.preventDefault();
        
        if (email === "" || password === "") {
          // Verifica se algum campo está vazio
          toast.error("Preencha todos os campos", {
            // Exibe uma mensagem de erro
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
            const response = await api.post("/login", {
              login: email,
              password: password,
            });
            console.log(response.data)
           
            if(response.data.token){
              localStorage.setItem("token",response.data.token);
              console.log(response.data.token)
            }
            
          } catch (error) {
            if (error.message === 'Request failed with status code 404'){
              toast.error("Usuário ou senha inválido", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          }
        }
      }
      
    

    return (
        <div className='container-logincriador'>
              <div className='container-logocriador'>
                    <Image className='logo-logincriador' src={logo} alt="Logo da empresa" fluid />
                </div>
            <div className='centralcontainer-logincriador'>
                <Form id='form-logincriador'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ fontWeight: 'bold' }} >Email</Form.Label>
                        <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Digite seu Email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ fontWeight: 'bold' }}>Senha</Form.Label>
                        <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Digite sua senha" />
                    </Form.Group>
                    <a href="/reset-senha" id="esqueci-senha-link-login" className="link-reset-senha">Esqueci a Senha</a>

                    <Button variant="primary" className='socialnetworkslogin-login' type="submit" onClick={enviarLogin}>
                        <span style={{ fontWeight: 'bold' }}>Entrar</span>
                    </Button>
                </Form>
               

            </div>

        </div>
    )
}
export default Login