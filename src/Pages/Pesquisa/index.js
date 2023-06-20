import React, { useState, useEffect, useRef } from "react";
import logo from "./imagens/pesquisar.svg";
import "./pesquisa.css";
import api from "../../Services/api";
import { useNavigate } from "react-router-dom";

const Pesquisa = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const resultsRef = useRef(null);
  const [userNames, setUserNames] = useState([]);
  const navigate = useNavigate();

  async function getDados() {
    const getProfile = await api.get("/profile");

    for (const p of getProfile.data) {
      const getUser = await api.get(`/user/${p.user}`);

      const objeto = {
        nome: `${p.firstName} ${p.lastName} `,
        usuario: getUser.data.username,
        image: p.img,
        _id: p._id,
      };
      const isExisting = userNames.some((user) => user._id === objeto._id);
      if (!isExisting) {
        userNames.push(objeto);
      }
    }
  }

  useEffect(() => {
    getDados();
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filteredUsers = userNames.filter(
      (user) =>
        user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.usuario?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  const handleItemClick = (id) => {
    navigate(`/profile/${id}`);
  };

  const handleClickOutside = (event) => {
    if (resultsRef.current && !resultsRef.current.contains(event.target)) {
      setFilteredUsers([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="container-search">
      <form className="search">
        <input
          className="input-search"
          type="text input_pesquisa"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Digite o nome do usuário"
        />
        <input
          className="img-search"
          type="image"
          alt="search"
          src={logo}
        ></input>
      </form>

      <div className="resultsSearch" ref={resultsRef}>
        {searchTerm && (
          <ul>
            {filteredUsers.map((user) => (
              <li
                className="li_pesquisa"
                key={user._id}
                onClick={() => handleItemClick(user._id)}
              >
                <img className="imgUser" src={user.image} />
                <div>
                  <div className="teste" style={{ marginRight: "1.2rem" }}>
                    {" "}
                    {user.nome}
                  </div>
                  <div>
                    <p style={{ fontSize: "1rem" }}>{user.usuario}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Pesquisa;
