import React, { useState, useEffect, useRef } from 'react';
import api from '../../services/api';

import Search from '../../assets/Search.svg';
import Github from '../../assets/Github.png';
import SadFace from '../../assets/Sad.svg';

import './styles.css';

function Main() {
  const [users, setUsers] = useState([]);
  const [hasUsers, setHasUsers] = useState(true);
  const nameRef = useRef();

  async function fetchMyAPI() {

    setHasUsers(true);
    api.get(`${nameRef.current.value}`)
      .then(response => {
        const { data } = response;
        setUsers([data]);
      })
      .catch(err => {
        if (err.response.status == 404) { setHasUsers(false) }
      });
  }


  useEffect(() => { }, [users]);

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
        {hasUsers ? users.map((user) => (
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
        ))
          :
          <div className={"not-found"}>
            <p>Organização não encontrada!</p>
            <img src={SadFace}></img>
          </div>
        }
      </div>
    </div>
  );
}

export default Main;
