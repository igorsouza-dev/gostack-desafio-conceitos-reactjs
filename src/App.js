import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

function App() {

  const [repositories, setRepositories] = useState([]);
  
  useEffect(() => {
    async function getRepositories() {
      try {
        const response = await api.get('/repositories');
        setRepositories(response.data);
      } catch(e) {

      }
      
    }
    getRepositories();
  }, []);

  async function handleAddRepository() {
    try {

      const response = await api.post('repositories', {
        title: 'teste',
        url: 'github.com/igorsouza-dev',
        techs: ['React', 'Javascript']
      })
      setRepositories([...repositories, response.data]);

    } catch (e) {

    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);
      setRepositories(repositories.filter( repository => repository.id !== id ));
    } catch(e) {

    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repo => (
            <li key={repo.id}>
              {repo.title}
  
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
        
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
