import { Form, Button, Image } from 'react-bootstrap';
import logo from './images/logo.png';
import React, { useState } from "react";
import './signfa.css';
import GetPaises from './Services/getpais';
import api from '../../Services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


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
  const [dataNascimento, setDataNascimento] = useState('');
  const navigate = useNavigate();
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

    if (
      email === "" ||
      password === "" ||
      name === "" ||
      sobrenome === "" ||
      userName === "" ||
      confirmaSenha === "" ||
      dataNascimento === "" ||
      paisSelecionado === ""
    ) {
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
    } else if (password !== confirmaSenha) {
      // Verifica se as senhas são iguais
      toast.error("As senhas precisam ser iguais", {
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
          dataNascimento: formattedDataNascimento, 
          estaativo: email,
          cpf: '',
         });
         console.log(response)
        try {
          const responseProfile = await api.post("/profile", {
            creator: false,
            user: response.data._id,
            firstName: name,
            lastName: sobrenome,
            img: 'https://criminalclub-test.s3.amazonaws.com/pngtree-beautiful-romantic-full-heart-pink-background-image_276913.jpg'
          })
         
          if (responseProfile.data._id) {
            localStorage.setItem('cc_p', responseProfile.data._id)
            try {
              const login = await api.post("/login", {
                login: userName,
                password: password
              })
              if(login.data.token){
                localStorage.setItem('cc_t', login.data.token)
               // navigate('/')
              }
              
              
            } catch (error) {
              console.log(error)
            }
          }
        } catch (error) {
          return
        }
       


      } catch (error) {

        toast.error(error.response.data.message, {
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
            <Form.Control  maxLength={10} onChange={(e) => setName(e.target.value)} type="text" placeholder="Digite seu nome" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ fontWeight: 'bold' }}>Sobrenome</Form.Label>
            <Form.Control maxLength={10} onChange={(e) => setSobrenome(e.target.value)} type="text" placeholder="Digite seu sobrenome" />
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
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Nome de Usuário</Form.Label>
            <Form.Control  maxLength={13}onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Digite um nome de usuário" />
          </Form.Group>
          <Form.Label style={{ fontWeight: 'bold' }}>Selecione seu país de residência</Form.Label>
          <GetPaises onSelectPais={handleSelectPais} />
          <Form.Label style={{ fontWeight: 'bold' }}></Form.Label>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Senha</Form.Label>
            <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Digite uma Senha" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Confirme a Senha</Form.Label>
            <Form.Control onChange={(e) => setConfirmaSenha(e.target.value)} type="password" placeholder="Digite a confirmação de senha" />
          </Form.Group>

            <Form.Check
              onSubmit={handleSubmit}
              type="checkbox"
              label="Eu aceito os termos e condições de uso e declaro ser maior de 18 anos."
              checked={isChecked}
              onChange={handleCheckboxChange}
            />


        </Form>
        <div className='d-grid'>
          <Button
            variant="primary"
            className="btn btn-info text-white m-3"
            type="submit"
            disabled={!isButtonActive}
            onClick={enviarsign}
          >
            <span style={{ fontWeight: 'bold' }}>Criar Conta</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Signfa;
