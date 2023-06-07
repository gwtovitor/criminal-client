import { Form, Button, Image } from 'react-bootstrap'
import logo from './images/logo.png'
import React, { useState } from "react";
import './loginfa.css'

function Loginfa() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function enviarLogin(event) {
        event.preventDefault();
        console.log(`Email: ${email}, Password: ${password}`);
        
    }

    return (
        <div className='container-loginfa'>
              <div className='container-logofa'>
                    <Image className='logo-loginfa' src={logo} alt="Logo da empresa" fluid />
                </div>
            <div className='centralcontainer-loginfa'>
                <Form id='form-loginfa'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ fontWeight: 'bold' }}>Email ou usuário</Form.Label>
                        <Form.Control type="email" placeholder="Digite seu Email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ fontWeight: 'bold' }}>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Digite sua senha" />
                    </Form.Group>
                    <a href="/reset-senha" id="esqueci-senha-link-loginfa" class="link-reset-senhafa">Esqueci a Senha</a>

                    <Button variant="primary" className='socialnetworksloginfa-login' type="submit" onClick={enviarLogin}>
                        <span style={{ fontWeight: 'bold' }}>Entrar</span>
                    </Button>
                </Form>
               

            </div>

        </div>
    )
}
export default Loginfa