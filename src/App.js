import React, { useState } from 'react';
import './App.css';

import api from './services/api'

import logo from './assets/logo.png';

function App() {
  const [email, setEmail] = useState('')

  async function handleSubmit(event){
    event.preventDefault();
    const response = await api.post('/sessions', { email })
    console.log(response);
  }

  return (
    <div className="container">
      <img src={logo} alt="AirCnC"/>

      <div className="content">
        <p>
          Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail *</label>
          <input 
            id="email"
            type="email"
            placeholder="Seu melhor e-mail"
            onChange={event => setEmail(event.target.value)}
            value={email}
          />
          <button className="btn" type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
