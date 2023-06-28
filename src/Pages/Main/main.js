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
import { Offcanvas } from "bootstrap";

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
import { ShoppingBagOutlined } from "@mui/icons-material";

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
    try {
      offcanvasInstance.hide();
    } catch (error) {}
    offcanvas.setAttribute("offcanvas", "offcanvas");
    document.body.classList.remove("offcanvas-open");
  }

  function closeOffCanvas() {
    const offcanvas = document.getElementById("offcanvasNavbarMain");
    const offcanvasInstance = Offcanvas.getInstance(offcanvas);
    try {
      offcanvasInstance.hide();
    } catch {}
    offcanvas.setAttribute("data-bs-dismiss", "offcanvas");
    document.body.classList.remove("offcanvas-open");
  }

  function closeModalLateral() {
    const offcanvas = document.getElementById("offcanvasNavbarMyCriminal");
    const offcanvass = document.getElementById("offcanvasNavbarMain");
    const offcanvasInstance = Offcanvas.getInstance(offcanvas);
    const offcanvassInstance = Offcanvas.getInstance(offcanvass);
    try {
      offcanvasInstance.hide();
      offcanvassInstance.hide();
    } catch (error) {}
    offcanvass.setAttribute("data-bs-dismiss", "offcanvas");
    offcanvas.setAttribute("data-bs-dismiss", "offcanvas");
    document.body.classList.remove("offcanvas-open");
  }

  function closeModalFinancas() {
    const offcanvas = document.getElementById("offcanvasNavbarFinancas");
    const offcanvass = document.getElementById("offcanvasNavbarMain");
    const offcanvasInstance = Offcanvas.getInstance(offcanvas);
    const offcanvassInstance = Offcanvas.getInstance(offcanvass);
    try {
      offcanvasInstance.hide();
      offcanvassInstance.hide();
    } catch (error) {}
    offcanvass.setAttribute("data-bs-dismiss", "offcanvas");
    offcanvas.setAttribute("data-bs-dismiss", "offcanvas");
    document.body.classList.remove("offcanvas-open");
  }

  useEffect(() => {
    getDados();
  }, []);

  return (
    <div className="row">
      <div className="col col-lg-3">
        <div className="navlateral ">
          <Sidebar
            className="navbarside-feed"
            style={{ backgroundColor: "transparent", borderRadius: "10px" }}
          >
            <div className="bordernavbarside-feed">
              <Menu>
                <MenuItem
                  href="/"
                  className="custom-menu-item"
                  style={{
                    backgroundColor: "transparent",
                    "&:hover": { backgroundColor: "black" },
                  }}
                >
                  <div className="centralizelogobraba">
                    <img className="logobraba" src={logo} alt="logo"></img>
                  </div>
                </MenuItem>
                <MenuItem
                  href="/verts"
                  icon={<PersonalVideoIcon style={{ color: "black" }} />}
                  style={{
                    backgroundColor: "transparent",
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                  className="custom-menu-item"
                >
                  Verts
                </MenuItem>
                <MenuItem
                  href="/"
                  icon={<HomeIcon style={{ color: "black" }} />}
                  style={{
                    backgroundColor: "transparent",
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                  className="custom-menu-item"
                >
                  Feed
                </MenuItem>
                <MenuItem
                  href="/mensagens"
                  icon={<Send style={{ color: "black" }} />}
                  style={{
                    backgroundColor: "transparent",
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                  className="custom-menu-item"
                >
                  Mensagens
                </MenuItem>
                <MenuItem
                  href="/pesquisa"
                  icon={<Search style={{ color: "black" }} />}
                  style={{
                    backgroundColor: "transparent",
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                  className="custom-menu-item"
                >
                  Pesquisar
                </MenuItem>
                <MenuItem
                  icon={<ShoppingBagOutlined style={{ color: "black" }} />}
                  href="/favoritos"
                  style={{
                    backgroundColor: "transparent",
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                  className="custom-menu-item"
                >
                  Compras
                </MenuItem>
                {isCreator ? (
                  <SubMenu
                    icon={<AddBoxOutlined style={{ color: "black" }} />}
                    style={{
                      backgroundColor: "transparent",
                      "&:hover": { backgroundColor: "transparent" },
                    }}
                    label="Publicar"
                    className="custom-menu-item scrollable-submenu "
                  >
                    <MenuItem
                      href="/postfeed"
                      style={{
                        backgroundColor: "transparent",
                        "&:hover": { backgroundColor: "transparent" },
                      }}
                      className="custom-menu-item"
                    >
                      Feed
                    </MenuItem>
                    <MenuItem
                      style={{
                        backgroundColor: "transparent",
                        "&:hover": { backgroundColor: "transparent" },
                      }}
                      href="/postverts"
                      className="custom-menu-item"
                    >
                      Verts
                    </MenuItem>
                    <MenuItem
                      style={{
                        backgroundColor: "transparent",
                        "&:hover": { backgroundColor: "transparent" },
                      }}
                      href="/postmsg"
                      className="custom-menu-item"
                    >
                      Mensagens
                    </MenuItem>
                  </SubMenu>
                ) : null}

                <SubMenu
                  icon={<AttachMoneyIcon style={{ color: "black" }} />}
                  label="Finanças"
                  style={{
                    backgroundColor: "transparent",
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                  className="custom-menu-item scrollable-submenu "
                >
                  <MenuItem
                    style={{
                      backgroundColor: "transparent",
                      "&:hover": { backgroundColor: "transparent" },
                    }}
                    href="/balanco"
                    className="custom-menu-item"
                  >
                    Balanço
                  </MenuItem>
                  <MenuItem
                    style={{
                      backgroundColor: "transparent",
                      "&:hover": { backgroundColor: "transparent" },
                    }}
                    href="/compras"
                    className="custom-menu-item"
                  >
                    Transações
                  </MenuItem>
                  <MenuItem
                    style={{
                      backgroundColor: "transparent",
                      "&:hover": { backgroundColor: "transparent" },
                    }}
                    href="/banco"
                    className="custom-menu-item"
                  >
                    Dados Bancários
                  </MenuItem>
                </SubMenu>
                <SubMenu
                  icon={<ClosedCaptionOff style={{ color: "black" }} />}
                  label="My Criminal"
                  className="custom-menu-item scrollable-submenu "
                  style={{
                    backgroundColor: "transparent",
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                >
                  <MenuItem
                    style={{
                      backgroundColor: "transparent",
                      "&:hover": { backgroundColor: "transparent" },
                    }}
                    href="/seguidores"
                    className="custom-menu-item "
                  >
                    Seguidores
                  </MenuItem>
                  <MenuItem
                    style={{
                      backgroundColor: "transparent",
                      "&:hover": { backgroundColor: "transparent" },
                    }}
                    href="/seguindo"
                    className="custom-menu-item "
                  >
                    Seguindo
                  </MenuItem>
                  <MenuItem
                    style={{
                      backgroundColor: "transparent",
                      "&:hover": { backgroundColor: "red" },
                    }}
                    href="/assinantes"
                    className="custom-menu-item "
                  >
                    Assinantes
                  </MenuItem>
                  <MenuItem
                    style={{
                      backgroundColor: "transparent",
                      "&:hover": { backgroundColor: "transparent" },
                    }}
                    href="/assinando"
                    className="custom-menu-item "
                  >
                    Assinando
                  </MenuItem>
                  <MenuItem
                    onClick={() => updateUrlAndReload(`/profile/${id}`)}
                    style={{
                      backgroundColor: "transparent",
                      "&:hover": { backgroundColor: "transparent" },
                    }}
                    className="custom-menu-item "
                  >
                    Perfil
                  </MenuItem>
                  <MenuItem
                    style={{
                      backgroundColor: "transparent",
                      "&:hover": { backgroundColor: "transparent" },
                    }}
                    href="/suporte"
                    className="custom-menu-item "
                  >
                    Suporte CC
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      logoff();
                    }}
                    style={{
                      backgroundColor: "transparent",
                      "&:hover": { backgroundColor: "transparent" },
                    }}
                    className="custom-menu-item "
                  >
                    Sair
                  </MenuItem>
                </SubMenu>
              </Menu>
            </div>
          </Sidebar>
        </div>
      </div>
      <div
        id="outletContainer"
        className="col-12 col-lg-9 container-outlet mb-3"
      >
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
        className="offcanvas offcanvas-bottom h-50 focus "
        id="offcanvasBottom"
        aria-labelledby="offcanvasBottomLabel"
      >
        <div className="container-postagem">
          <h1 className="offcanvas-title" id="offcanvasBottomLabel">
            Publicar{" "}
          </h1>

          <div className="container-links">
            <button>
              <Link
                className="styleButtons"
                component={Link}
                to="/postverts"
                onClick={() => closeOffCanvas()}
              >
                Verts
              </Link>
            </button>
            <button>
              <Link
                className="styleButtons"
                component={Link}
                to="/postfeed"
                onClick={() => closeOffCanvas()}
              >
                Feed
              </Link>
            </button>
            <button>
              <Link
                className="styleButtons"
                component={Link}
                to="/verts"
                onClick={() => closeOffCanvas()}
              >
                Mensagens
              </Link>
            </button>
          </div>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-end section-nav "
        id="offcanvasNavbarMain"
        aria-labelledby="offcanvasNavbarMainLabel"
      >
        <div className="namee">
          <img className="logoxixe" src={logo} alt="logo"></img>
          <div className="alignImgName">
            <Avatar
              className="nav-link active img-myDados"
              style={{ marginRight: "0.5" }}
              src={myDados.img}
            ></Avatar>
            <strong
              className="offcanvas-title justify-content-center font-teste"
              id="offcanvasNavbarMainLabel"
            >{`${myDados.firstName} ${myDados.lastName}`}</strong>
          </div>
        </div>
        <div className=" div-todo ">
          <div className="offcanvas-body">
            <ul className="navbar-nav ul">
              <div className="li">
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
                      aria-current="page"
                      href="/favoritos"
                    >
                      <ShoppingBagOutlined
                        style={{ color: "black" }}
                        className="me-2"
                      />
                      Compras
                    </a>
                  </h5>
                </li>
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
              </div>
            </ul>
          </div>
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
