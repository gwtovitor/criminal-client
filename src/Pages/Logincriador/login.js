import { Form, Button, Image } from "react-bootstrap";
import logo from "./images/logo.png";

import React, { useState } from "react";
import "./login.css";
import api from "../../Services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function enviarLogin(event) {
    event.preventDefault();

    if (email === "" || password === "") {
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
    } else {
      try {
        const response = await api.post("/login", {
          login: email,
          password: password,
        });

        if (response.data.token) {
          const user = await api.get(`user/username/${email}`);
          const profile = await api.get(`profile/user/${user.data._id}`);

          localStorage.setItem("cc_t", response.data.token);
          localStorage.setItem("cc_p", profile.data._id);
          navigate("../");
        }
      } catch (error) {
        if (error.message === "Request failed with status code 404") {
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
    <div className="container-logincriador">
      <div className="container-logocriador">
        <Image
          className="logo-logincriador"
          src={logo}
          alt="Logo da empresa"
          fluid
        />
      </div>
      <div className="centralcontainer-logincriador">
        <Form id="form-logincriador">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ fontWeight: "bold" }}>
              Email ou usuário
            </Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Digite seu Email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ fontWeight: "bold" }}>Senha</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Digite sua senha"
            />
          </Form.Group>
          <a
            href="/reset-senha"
            id="esqueci-senha-link-login"
            className="link-reset-senha"
          >
            Esqueci a Senha
          </a>

          <Button
            variant="primary"
            className="socialnetworkslogin-login"
            type="submit"
            onClick={enviarLogin}
          >
            <span style={{ fontWeight: "bold" }}>Entrar</span>
          </Button>
        </Form>
      </div>
    </div>
  );
}
export default Login;
