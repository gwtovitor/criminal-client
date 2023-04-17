import { Form, Button, Image, } from 'react-bootstrap'
import logo from './images/logo.png'
import React, { useState } from "react";
import './signcriador.css'
import InputGroup from 'react-bootstrap/InputGroup';
import InputMask from 'react-input-mask';

function DadosBancarios() {
    const [isCheckedTermos, setischeckdTermos] = useState(false);
    const [isActivetermosButton, setisActivetermosButton] = useState(false);
    const [isCheckedAssinatura, setischeckdAssinatura] = useState(false);
    const [isActiveAssinaturaButton, setisActiveAssinaturaButton] = useState(false);

    const chekboxassinatura = (f) => {
        setisActiveAssinaturaButton(f.target.checked);
        setischeckdAssinatura(f.target.checked);
    };
    const checkAssinaturaSubmmit = (f) => {
        f.preventDefault();
    };

    const chekboxtermos = (e) => {
        setisActivetermosButton(e.target.checked);
        setischeckdTermos(e.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

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
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ fontWeight: 'bold' }}>Assinatura Mensal</Form.Label>
                        <InputGroup>
                            <InputGroup.Checkbox id="inputGroupPrepend"
                                type="checkbox"
                                onSubmit={checkAssinaturaSubmmit}
                                onChange={chekboxassinatura}

                            ></InputGroup.Checkbox>
                            <Form.Control
                                disabled={!isActiveAssinaturaButton}
                                type="text" placeholder="Valor da Assinatura (Desmarcado para R$ 0,00)" />
                        </InputGroup>
                        <Form.Group controlId="formCpf">
                            <Form.Label>CPF</Form.Label>
                            <InputMask
                                mask="999.999.999-99"

                            >
                                {(inputProps) => (
                                    <Form.Control
                                        {...inputProps}
                                        type="text"
                                        placeholder="Digite seu CPF"
                                    />
                                )}
                            </InputMask>
                        </Form.Group>
                    </Form.Group>
                    <Form onSubmit={handleSubmit}>
                        <Form.Check
                            type="checkbox"
                            label="Eu aceito os termos e condições de uso e declaro ser maior de 18 anos."
                            checked={isCheckedTermos}
                            onChange={chekboxtermos}
                        />

                        <Button
                            variant="primary"
                            className="socialnetworkssignfa-sign"
                            type="submit"
                            disabled={!isActivetermosButton}
                        >
                            <span style={{ fontWeight: 'bold' }}>Criar Conta</span>
                        </Button>
                    </Form>
                </Form>


            </div>

        </div>
    )
}
export default DadosBancarios