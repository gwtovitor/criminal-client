import { Form, Button, Image } from 'react-bootstrap'
import logo from './images/logo.png'
import React, { useState } from "react";
import './signfa.css'
import GetPaises from './Services/getpais';

function Signfa() {
    const [isChecked, setIsChecked] = useState(false);
    const [isButtonActive, setIsButtonActive] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        setIsButtonActive(e.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // ...
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function enviarsign(event) {
        event.preventDefault();
        console.log(`Email: ${email}, Password: ${password}`);
    }


    return (
        <div className='container-signfa'>
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
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ fontWeight: 'bold' }}>Confirme a Senha</Form.Label>
                        <Form.Control type="password" placeholder="Digite a confirmação de senha" />
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
                        >
                            <span style={{ fontWeight: 'bold' }}>Criar Conta</span>
                        </Button>
                    </Form>
                </Form>


            </div>

        </div>
    )
}
export default Signfa