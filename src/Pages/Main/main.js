import React, { useState, useEffect } from "react";
import "./main.css";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import logo from "./images/logo.png";

import CottageIcon from "@mui/icons-material/Cottage";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar, IconButton } from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import {
  ClosedCaptionOff,
  Logout,
  Search,
  Menu as MenuHamburger,
  AddBoxOutlined,
} from "@mui/icons-material";
import { ArrowBack } from "@mui/icons-material";
import { Send } from "@mui/icons-material";
import { SendOutlined } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";
import Swal from "sweetalert2";
import { Offcanvas } from "bootstrap";

function Main() {
  const navigate = useNavigate();
  const id = localStorage.getItem("cc_p");
  const [isCreator, setIscCreator] = useState(false);
  const [myDados, setMyDados] = useState([]);
  const token = localStorage.getItem("cc_t");

  function logoff() {
    localStorage.removeItem("cc_p");
    localStorage.removeItem("cc_t");
    navigate("../home");
  }

  const updateUrlAndReload = (url) => {
    navigate(url);
    window.location.reload();
  };

  async function getDados() {
    try {
      // if (!localStorage.cc_p || !localStorage.cc_t) {
      //     navigate('/home');
      // }

      const response = await api.get(`/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMyDados(response?.data);
      setIscCreator(response?.data.creator);
    } catch (error) {
      return;
    }
  }

  function closeModal() {
    const offcanvas = document.getElementById("offcanvasNavbarMain");
    const offcanvasInstance = Offcanvas.getInstance(offcanvas);
    offcanvasInstance.hide();
    offcanvas.setAttribute("offcanvas", "offcanvas");
  }
  function closeOffCanvas() {
    const offcanvas = document.getElementById("offcanvasBottom");
    const offcanvasInstance = Offcanvas.getInstance(offcanvas);
    offcanvasInstance.hide();
    offcanvas.setAttribute("data-bs-dismiss", "offcanvas");
  }

  function closeModalLateral() {
    const offcanvas = document.getElementById("offcanvasNavbarMyCriminal");
    const offcanvass = document.getElementById("offcanvasNavbarMain");
    const offcanvasInstance = Offcanvas.getInstance(offcanvas);
    const offcanvassInstance = Offcanvas.getInstance(offcanvass);
    offcanvasInstance.hide();
    offcanvassInstance.hide();
    offcanvass.setAttribute("data-bs-dismiss", "offcanvas");
    offcanvas.setAttribute("data-bs-dismiss", "offcanvas");
  }

  function closeModalFinancas() {
    const offcanvas = document.getElementById("offcanvasNavbarFinancas");
    const offcanvass = document.getElementById("offcanvasNavbarMain");
    const offcanvasInstance = Offcanvas.getInstance(offcanvas);
    const offcanvassInstance = Offcanvas.getInstance(offcanvass);
    offcanvasInstance.hide();
    offcanvassInstance.hide();
    offcanvass.setAttribute("data-bs-dismiss", "offcanvas");
    offcanvas.setAttribute("data-bs-dismiss", "offcanvas");
  }

  useEffect(() => {
    getDados();
  }, []);

  return (
    <div className="row">
      <div className="col col-lg-3">
        <img className="logobraba" src={logo} alt="logo"></img>

        <div className="navlateral">
          <Sidebar className="navbarside-feed">
            <Menu>
              <MenuItem
                href="/verts"
                icon={<PersonalVideoIcon style={{ color: "black" }} />}
              >
                Verts
              </MenuItem>
              <MenuItem href="/" icon={<HomeIcon style={{ color: "black" }} />}>
                Feed
              </MenuItem>
              <MenuItem
                href="/mensagens"
                icon={<Send style={{ color: "black" }} />}
              >
                Mensagens
              </MenuItem>
              <MenuItem
                href="/pesquisa"
                icon={<Search style={{ color: "black" }} />}
              >
                Pesquisar
              </MenuItem>
              {isCreator ? (
                <SubMenu
                  icon={<AddBoxOutlined style={{ color: "black" }} />}
                  label="Publicar"
                >
                  <MenuItem href="/postfeed">Feed</MenuItem>
                  <MenuItem href="/postverts">Verts</MenuItem>
                  <MenuItem href="/postmsg">Mensagens</MenuItem>
                </SubMenu>
              ) : null}
              <SubMenu
                icon={<AttachMoneyIcon style={{ color: "black" }} />}
                label="Finanças"
              >
                <MenuItem href="/balanco">Balanço</MenuItem>
                <MenuItem href="/compras">Compras</MenuItem>
                <MenuItem href="/banco">Banco</MenuItem>
              </SubMenu>
              <SubMenu
                icon={<ClosedCaptionOff style={{ color: "black" }} />}
                label="My Criminal"
                className="scrollable-submenu"
              >
                <MenuItem href="/seguidores">Seguidores</MenuItem>
                <MenuItem href="/seguindo">Seguindo</MenuItem>
                <MenuItem href="/assinantes">Assinantes</MenuItem>
                <MenuItem href="/assinando">Assinando</MenuItem>
                <MenuItem href="/favoritos">Galeria</MenuItem>
                <MenuItem onClick={() => updateUrlAndReload(`/profile/${id}`)}>
                  Perfil
                </MenuItem>
                <MenuItem href="/suporte">Suporte CC</MenuItem>
                <MenuItem
                  onClick={() => {
                    logoff();
                  }}
                >
                  Sair
                </MenuItem>
              </SubMenu>
            </Menu>
          </Sidebar>
        </div>
      </div>
      <div className="col-12 col-lg-9 container-outlet mb-3">
        <Outlet />
      </div>
      <footer className="footer border-top border-dark-subtle border-2">
        <IconButton
          onClick={() => {
            closeModal();
          }}
          component={Link}
          to="/verts"
        >
          <PersonalVideoIcon style={{ color: "black", fontSize: "1.3rem" }} />
        </IconButton>
        <IconButton
          onClick={() => {
            closeModal();
          }}
          component={Link}
          to="../"
        >
          <CottageIcon style={{ color: "black" }} />
        </IconButton>
        {isCreator ? (
          <>
            {" "}
            <IconButton
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasBottom"
              aria-controls="offcanvasBottom"
            >
              <AddBoxOutlined style={{ color: "black" }} />
            </IconButton>
          </>
        ) : null}
        <IconButton
          onClick={() => {
            closeModal();
          }}
          component={Link}
          to="../"
        >
          <SendOutlined style={{ color: "black" }} />
        </IconButton>
        <IconButton
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbarMain"
          aria-controls="offcanvasNavbarMain"
          aria-label="Toggle navigation"
        >
          <MenuHamburger style={{ color: "black" }} />
        </IconButton>
      </footer>

      <div
        className="offcanvas offcanvas-bottom h-50 focus"
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
        id="offcanvasBottom"
        aria-labelledby="offcanvasBottomLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasBottomLabel">
            Postagem
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body small">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link
              className="btn btn-info text-white m-1"
              component={Link}
              to="/postverts"
              onClick={() => closeOffCanvas()}
            >
              Verts
            </Link>
            <Link
              className="btn btn-info text-white m-1"
              component={Link}
              to="/postfeed"
              onClick={() => closeOffCanvas()}
            >
              Feed
            </Link>
            <Link
              className="btn btn-info text-white m-1"
              component={Link}
              to="/verts"
              onClick={() => closeOffCanvas()}
            >
              Mensagens
            </Link>
          </div>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-end w-75 border-4 border-start border-info border-opacity-75"
        id="offcanvasNavbarMain"
        aria-labelledby="offcanvasNavbarMainLabel"
      >
        <div className="offcanvas-header">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Avatar
              style={{ marginRight: "0.5rem" }}
              src={myDados.img}
            ></Avatar>
            <strong
              className="offcanvas-title justify-content-center"
              id="offcanvasNavbarMainLabel"
            >{`${myDados.firstName} ${myDados.lastName}`}</strong>
          </div>
          <a
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></a>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item">
              <h5>
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="../pesquisa"
                >
                  <Search style={{ color: "black" }} className="me-2" />
                  Procurar
                </a>
              </h5>
            </li>
            <li className="nav-item">
              <h5>
                <a
                  className="nav-link active"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasNavbarFinancas"
                  aria-controls="offcanvasNavbarFinancas"
                  aria-current="page"
                >
                  <AttachMoneyIcon
                    style={{ color: "black" }}
                    className="me-2"
                  />
                  Finanças
                </a>
              </h5>
            </li>
            <li className="nav-item">
              <h5>
                <a
                  className="nav-link active"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasNavbarMyCriminal"
                  aria-controls="offcanvasNavbarMyCriminal"
                  aria-current="page"
                >
                  <ClosedCaptionOff
                    style={{ color: "black" }}
                    className="me-2"
                  />
                  My Criminal
                </a>
              </h5>
            </li>
            <li className="nav-item">
              <h5>
                <Link
                  className="nav-link active"
                  aria-current="page"
                  component={Link}
                  onClick={() => updateUrlAndReload(`/profile/${id}`)}
                >
                  <AccountCircleIcon
                    style={{ color: "black" }}
                    className="me-2"
                  />
                  Perfil
                </Link>
              </h5>
            </li>
            <li className="nav-item">
              <h5>
                <Link
                  className="nav-link active"
                  aria-current="page"
                  onClick={() => {
                    logoff();
                  }}
                  to={"./home"}
                >
                  <Logout style={{ color: "black" }} className="me-2" />
                  Sair
                </Link>
              </h5>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-end w-75 border-4 border-start border-info border-opacity-75"
        id="offcanvasNavbarMyCriminal"
        aria-labelledby="offcanvasNavbarMyCriminalLabel"
      >
        <div className="offcanvas-header">
          <strong className="offcanvas-title" id="offcanvasNavbarMyCriminal">
            <ClosedCaptionOff /> My Criminal
          </strong>
          <a
            type="button"
            className="btn-close-white"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbarMain"
            aria-label="Close"
          >
            <ArrowBack className="text-secondary" />
          </a>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item">
              <h5>
                <Link
                  className="nav-link active"
                  aria-current="page"
                  onClick={() => {
                    closeModalLateral();
                  }}
                  to={"./seguidores"}
                >
                  Seguidores
                </Link>
              </h5>
            </li>
            <li className="nav-item">
              <h5>
                <Link
                  className="nav-link active"
                  aria-current="page"
                  onClick={() => {
                    closeModalLateral();
                  }}
                  to={"./seguindo"}
                >
                  Seguindo
                </Link>
              </h5>
            </li>
            <li className="nav-item">
              <h5>
                <Link
                  className="nav-link active"
                  aria-current="page"
                  onClick={() => {
                    closeModalLateral();
                  }}
                  to={"./assinantes"}
                >
                  Assinantes
                </Link>
              </h5>
            </li>
            <li className="nav-item">
              <h5>
                <Link
                  className="nav-link active"
                  aria-current="page"
                  onClick={() => {
                    closeModalLateral();
                  }}
                  to={"./assinando"}
                >
                  Assinando
                </Link>
              </h5>
            </li>
            <li className="nav-item">
              <h5>
                <Link
                  className="nav-link active"
                  aria-current="page"
                  onClick={() => {
                    closeModalLateral();
                  }}
                  to={"./favoritos"}
                >
                  Galeria
                </Link>
              </h5>
            </li>
            <li className="nav-item">
              <h5>
                <Link
                  className="nav-link active"
                  aria-current="page"
                  onClick={() => {
                    closeModalLateral();
                  }}
                  to={"./suporte"}
                >
                  Suporte CC
                </Link>
              </h5>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-end w-75 border-4 border-start border-info border-opacity-75"
        id="offcanvasNavbarFinancas"
        aria-labelledby="offcanvasNavbarFinancasLabel"
      >
        <div className="offcanvas-header">
          <strong className="offcanvas-title" id="offcanvasNavbarFinancas">
            <AttachMoneyIcon /> Finanças
          </strong>
          <a
            type="button"
            className="btn-close-white"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbarMain"
            aria-label="Close"
          >
            <ArrowBack className="text-secondary" />
          </a>
          {/* <a type="button" className="btn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarMyCriminal" aria-label="Close"></a> */}
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav flex-grow-1 pe-3">
            <li className="nav-item">
              <h5>
                <Link
                  className="nav-link active"
                  onClick={() => {
                    closeModalFinancas();
                  }}
                  aria-current="page"
                  to={"./balanco"}
                >
                  Balanço
                </Link>
              </h5>
            </li>
            <li className="nav-item">
              <h5>
                <Link
                  className="nav-link active"
                  onClick={() => {
                    closeModalFinancas();
                  }}
                  aria-current="page"
                  to={"./compras"}
                >
                  Compras
                </Link>
              </h5>
            </li>
            <li className="nav-item">
              <h5>
                <Link
                  className="nav-link active"
                  onClick={() => {
                    closeModalFinancas();
                  }}
                  aria-current="page"
                  to={"./banco"}
                >
                  Banco
                </Link>
              </h5>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Main;
