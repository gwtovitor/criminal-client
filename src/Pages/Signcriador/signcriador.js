import { Form, Button, Image, } from 'react-bootstrap'
import logo from './images/logo.png'
import React, { useState } from "react";
import './signcriador.css'
import GetPaises from './Services/getpais';
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';


function Signcriador() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function enviarsign(event) {
        event.preventDefault();
        console.log(`Email: ${email}, Password: ${password}`);
    }


    return (
        <div className='container-signcriador'>
            <div className='container-logofa'>
                <Image className='logo-signfa' src={logo} alt="Logo da empresa" fluid />
            </div>
            <div className='centralcontainer-signfa'>
                <Form id='form-signfa'>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ fontWeight: 'bold' }} >Email</Form.Label>
                        <Form.Control type="email" placeholder="Digite seu Email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ fontWeight: 'bold' }}>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Digite seu nome" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ fontWeight: 'bold' }}>Sobrenome</Form.Label>
                        <Form.Control type="text" placeholder="Digite seu sobrenome" />
                    </Form.Group>
                    <Form.Group controlId="formCpf">
                        <Form.Label style={{ fontWeight: 'bold' }}>Digite sua data de nascimento</Form.Label>
                        <InputMask
                            mask="99/99/9999"

                        >
                            {(inputProps) => (
                                <Form.Control
                                    {...inputProps}
                                    type="text"
                                    placeholder="Digite sua data de nascimento"
                                />
                            )}
                        </InputMask>
                    </Form.Group>
                    <Form.Label style={{ fontWeight: 'bold' }}></Form.Label>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ fontWeight: 'bold' }}>Nome de Usuário</Form.Label>
                        <Form.Control type="text" placeholder="Digite um nome de usuário" />
                    </Form.Group>
                    <Form.Label style={{ fontWeight: 'bold' }}>Selecione seu pais de residência</Form.Label>
                    <GetPaises />
                    <Form.Label style={{ fontWeight: 'bold' }}></Form.Label>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ fontWeight: 'bold' }}>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Digite uma Senha" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ fontWeight: 'bold' }}>Confirme a Senha</Form.Label>
                        <Form.Control type="password" placeholder="Digite a confirmação de senha" />
                    </Form.Group>
                    <Link to='/signcriador/dados'>

                        <Button
                            variant="primary"
                            className="socialnetworkssignfa-sign"
                            type="submit"
                        >
                            <span style={{ fontWeight: 'bold' }}>Proximo</span>
                        </Button>
                    </Link>
                </Form>


            </div>

        </div>
    )
}
export default Signcriador