import { Form, Button, Image, } from 'react-bootstrap'
import logo from './images/logo.png'
import React, { useState } from "react";
import './signcriador.css'
import GetPaises from './Services/getpais';
import api from '../../Services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import InputMask from 'react-input-mask';


function Signcriador() {

  const [paisSelecionado, setPaisSelecionado] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [userName, setUsername] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const navigate = useNavigate();
  const [isCheckedTermos, setischeckdTermos] = useState(false);
  const [isActivetermosButton, setisActivetermosButton] = useState(false);
  const [cpf, setCPF] = useState('');
  const [isCPFComplete, setIsCPFComplete] = useState(false);
  const [isCheckedAssinatura, setischeckdAssinatura] = useState(false);
  const [isActiveAssinaturaButton, setisActiveAssinaturaButton] = useState(false);
  const [price, setPrice] = useState('')

  const handleCPFChange = (e) => {
    const cpfValue = e.target.value;
    const cpfWithoutFormatting = cpfValue.replace(/[^\d]/g, ""); // Remove todos os caracteres não numéricos
    setCPF(cpfWithoutFormatting);
    setIsCPFComplete(cpfWithoutFormatting.length === 11);

    if (cpfWithoutFormatting.length === 11) {
      const isValidCPF = isCPFValid(cpfWithoutFormatting);

      if (!isValidCPF) {
        toast.error("CPF inválido", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsCPFComplete(false)
      }
    } else {
      setIsCPFComplete(true)
    }
  };




  function isCPFValid(cpf) {
    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
      return false;
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    // Calcula o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit === 10 || digit === 11) {
      digit = 0;
    }
    if (parseInt(cpf.charAt(9)) !== digit) {
      return false;
    }

    // Calcula o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit === 10 || digit === 11) {
      digit = 0;
    }
    if (parseInt(cpf.charAt(10)) !== digit) {
      return false;
    }

    return true;
  }



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
      paisSelecionado === "" ||
      cpf === ""

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
    } else if (password !== confirmaSenha) {
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
    } else if (!isCPFComplete) {
      toast.error("Preencha o CPF corretamente", {
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
          cpf: cpf,
          isActive: true,
        });
        console.log(response)

        try {
          const responseUser = await api.post("/profile", {
            creator: true,
            user: response.data._id,
            firstName: name,
            lastName: sobrenome,
          })
        } catch (error) {
          console.log(error)
        }

   //     navigate('/home')

      } catch (error) {
        toast.error(error.response.data.message, {

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
  function mascaraMoeda(event) {
    const onlyDigits = event.target.value
      .split("")
      .filter(s => /\d/.test(s))
      .join("")
      .padStart(3, "0")
    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
    event.target.value = maskCurrency(digitsFloat)
  }

  function maskCurrency(valor, locale = 'pt-BR', currency = 'BRL') {
    const valorNew = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency
    }).format(valor)
    setPrice(valorNew)
    return valorNew
  }

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
            <Form.Control maxLength={10} onChange={(e) => setName(e.target.value)} type="text" placeholder="Digite seu nome" />
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
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ fontWeight: 'bold' }}>Nome de Usuário</Form.Label>
            <Form.Control maxLength={13} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Digite um nome de usuário" />
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
          <Form.Group className='mb-3' controlId="formCpf">
            <Form.Label style={{ fontWeight: 'bold' }}>CPF</Form.Label>
            <InputMask
              mask="999.999.999-99"
              onChange={handleCPFChange}

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

          <Form onSubmit={handleSubmit}>
            <Form.Check
              type="checkbox"
              label="Eu aceito os termos e condições de uso e declaro ser maior de 18 anos."
              checked={isCheckedTermos}
              onChange={chekboxtermos}
            />


          </Form>

        </Form>
        <div className='d-grid'>
          <Button
            variant="primary"
            className="btn btn-info text-white m-3"
            type="submit"
            disabled={!isCheckedTermos}
            onClick={enviarsign}
          >
            <span style={{ fontWeight: 'bold' }}>Criar Conta</span>
          </Button>
        </div>

      </div>

    </div>
  )
}
export default Signcriador