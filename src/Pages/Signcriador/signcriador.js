import { Form, Button, Image, } from 'react-bootstrap'
import logo from './images/logo.png'
import React, { useState } from "react";
import './signcriador.css'
import { Link } from 'react-router-dom';
import GetPaises from './Services/getpais';
import api from '../../Services/api';
import {toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Signcriador() {

    const [paisSelecionado, setPaisSelecionado] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [userName, setUsername] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [dadosPreenchidos, setDadosPreenchidos] = useState(false);
    const navigate = useNavigate();

    
    const enviarsign = async (event) => {
        event.preventDefault();

        if (
            email === "" ||
            password === "" ||
            confirmaSenha === "" ||
            name === "" ||
            sobrenome === "" ||
            userName === "" ||
            confirmaSenha === "" ||
            dataNascimento === "" ||
            paisSelecionado === "" 
        ) {
            toast.error("Preencha todos os campos", {
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
        }else if (password !== confirmaSenha) {
            toast.error("As senhas precisam ser iguais", {
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
            try {
              // Divide a string da data de nascimento em partes separadas (dia, mês, ano)
              const partesDataNascimento = dataNascimento.split("/");
              const dia = parseInt(partesDataNascimento[0], 10);
              const mes = parseInt(partesDataNascimento[1], 10);
              const ano = parseInt(partesDataNascimento[2], 10);
        
              // Cria a data de nascimento com as partes separadas
              const dataNascimentoFormatada = new Date(ano, mes - 1, dia);
        
              const formattedDataNascimento = dataNascimentoFormatada.toISOString().slice(0, 10); // Formata a data como "aaaa-mm-dd"
              const response = await api.post("/user", {
                email: email,
                username: userName,
                password: password,
                paisResidencia: paisSelecionado,
                dataNascimento: formattedDataNascimento, // Utiliza a data formatada
              });
              console.log(response.data);
            if (response.data.message === "Username or Password invalid.") {
                // Exibe uma mensagem de erro se o usuário ou senha forem inválidos
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
              } else {
                console.log(response.data);
                try{
                  const responseUser = await api.post("/profile", {
                      creator: true,
                      user: response.data._id,
                      firstName: name,
                      lastName: sobrenome
                  })
                  console.log(responseUser)
                  navigate('/signcriador/dados');
                } catch (error){
      
                }
              
              }
            } catch (error) {
              // Handle error here
         }
        }
    }
    const handleSelectPais = (paisSelecionado) => {
        setPaisSelecionado(paisSelecionado);
    };

    const handleChangeDataNascimento = (e) => {
        const input = e.target.value;

        const numeros = input.replace(/\D/g, '');

        const dataFormatada = numeros.replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3');

        setDataNascimento(dataFormatada);
    };

    const validarIdade = (dataNascimento) => {
        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear();
        const regex = /^\d{2}\/\d{2}\/\d{4}$/;
      
        if (!regex.test(dataNascimento)) {
          toast.error('Formato de data inválido. Utilize o formato DD/MM/AAAA.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
      
          setDataNascimento('');
          return;
        }
      
        const anoNascimento = parseInt(dataNascimento.substr(6, 4), 10);
        const idade = anoAtual - anoNascimento;
      
        if (idade < 18) {
          toast.error('É necessário ter pelo menos 18 anos para prosseguir.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
      
          setDataNascimento('');
        }
      };
      

    return (
        <div className='container-signcriador'>
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
                        <Form.Label style={{ fontWeight: 'bold' }}>Data de nascimento</Form.Label>
                        <Form.Control
                            onChange={handleChangeDataNascimento}
                            onBlur={() => validarIdade(dataNascimento)}
                            value={dataNascimento}
                            type="text"
                            placeholder="Digite sua data de nascimento (DD/MM/AAAA)"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ fontWeight: 'bold' }}>Nome de Usuário</Form.Label>
                        <Form.Control onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Digite um nome de usuário" />
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
                        <Button
                            variant="primary"
                            className="socialnetworkssignfa-sign"
                            type="submit"
                            onClick={enviarsign}
                            
                        >
                            <span style={{ fontWeight: 'bold' }}>Proximo</span>
                        </Button>
                </Form>


            </div>

        </div>
    )
}
export default Signcriador