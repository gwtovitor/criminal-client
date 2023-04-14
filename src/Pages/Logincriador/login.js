import { Form, Button, Image } from 'react-bootstrap'
import logo from './images/logo.png'
import React, { useState } from "react";
import './login.css'
import { Link } from 'react-router-dom';
import { FaGoogle, FaFacebookF, FaMicrosoft } from 'react-icons/fa';
function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function enviarLogin(event) {
        event.preventDefault();
        console.log(`Email: ${email}, Password: ${password}`);
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
                        <Form.Control type="email" placeholder="Digite seu Email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ fontWeight: 'bold' }}>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Digite sua senha" />
                    </Form.Group>
                    <a href="/reset-senha" id="esqueci-senha-link-login" class="link-reset-senha">Esqueci a Senha</a>

                    <Button variant="primary" className='socialnetworkslogin-login' type="submit" onClick={enviarLogin}>
                        <span style={{ fontWeight: 'bold' }}>Entrar</span>
                    </Button>
                </Form>
               

            </div>

        </div>
    )
}
export default Login