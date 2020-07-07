import React, { useState, useEffect, useRef } from 'react';
import api from '../../services/api';

import Search from '../../assets/Search.svg';
import Github from '../../assets/Github.png';

import './styles.css';

function Main() {
  const [users, setUsers] = useState([]);

  const nameRef = useRef();

  async function fetchMyAPI() {
    try {
      const { data } = await api.get(`${nameRef.current.value}`);
      setUsers([...users, data]);
    } catch (err) {
      alert('Usuário ou organização não foi encontrado!')
    }
  }

  useEffect(() => {}, [users]);

  return (
    <div>
      <img className="github" src={Github} alt="" />
      <span className="search">
        <input
          type="text"
          placeholder="Digite para pesquisar..."
          ref={nameRef}
        />
        <button onClick={() => fetchMyAPI()}>
          <img src={Search} alt="" />
        </button>
      </span>

      <div className="cards">
        {users.map((user) => (
          <ul key={user.id}>
            <span className="Head">
              <img src={user.avatar_url} alt="" />
              <h2>{user.name}</h2>
            </span>
            <li>
              <p>Localização:</p> <small>{user.location}</small>
            </li>
            <li>
              <p>Tipo:</p> <small>{user.type}</small>
            </li>
            <li>
              <p>Repositórios: </p> <small>{user.public_repos}</small>
            </li>{' '}
            <li>
              <p>E-mail: </p> <small>{user.email}</small>
            </li>{' '}
            <li>
              <p>Criado em: </p> <small>{user.created_at.split('T')[0]}</small>
            </li>{' '}
            <li>
              <p>Atualizado em: </p>{' '}
              <small>{user.updated_at.split('T')[0]}</small>
            </li>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              <button className="favoritar">Exibir no Github</button>
            </a>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default Main;
