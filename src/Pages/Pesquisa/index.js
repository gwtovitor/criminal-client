import React, { useState, useEffect, useRef } from "react";
import logo from "./imagens/pesquisar.svg";
import './pesquisa.css'

import mateusImage from "./imagens/mateus.jpeg";
import vitorImage from "./imagens/vitor.jpeg";
import lidiaImage from "./imagens/lidia.jpeg";
import juniorImage from "./imagens/junior.jpeg";
import luizImage from "./imagens/luiz.jpeg";

const usersData = [
  { id: 1, name: "Mateus Santiago", image: mateusImage },
  { id: 2, name: "Vitor Augusto", image: vitorImage },
  { id: 3, name: "Lidia", image: lidiaImage },
  { id: 4, name: "Junior Martins", image: juniorImage },
  { id: 5, name: "Luiz", image: luizImage },
];

const Pesquisa = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const resultsRef = useRef(null);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filteredUsers = usersData.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  const handleItemClick = (name) => {
    setSearchTerm(name);
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
          type="text"
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
              <li key={user.id} onClick={() => handleItemClick(user.name)}>
                <img className="imgUser" src={user.image} alt={user.name} />
                <div className="teste">{user.name}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Pesquisa;
