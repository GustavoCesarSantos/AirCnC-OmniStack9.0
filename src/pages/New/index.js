import React, { useState, useMemo } from 'react';

import api from '../../services/api'

import './styles.css'

export default function New({ history }){
  const [ thumbnail, setThumbnail ] = useState(null)
  const [ company, setCompany ] = useState('');
  const [ techs, setTechs ] = useState('');
  const [ price, setPrice ] = useState('');

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail): null
  }, [thumbnail])

  async function handleSubmit(event){
    event.preventDefault();

    const data = new FormData();
    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    const user_id = localStorage.getItem('user')

    await api.post('/spots', data, {
      headers: {user_id}
    })

    history.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label id="thumbnail" className={thumbnail ? 'has-thumbnail': ''} style={{ backgroundImage: `url(${preview})`}}>
        <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
      </label>

      <label htmlFor="company">Empresa *</label>
      <input 
        id="company"
        placeholder="Sua empresa incrivel"
        onChange={event => setCompany(event.target.value)}
        value={company}
      />

      <label htmlFor="techs">Técnologias * <span>(separadas por virgula)</span> </label>
      <input 
        id="techs"
        placeholder="Quais técnologias usam ?"
        onChange={event => setTechs(event.target.value)}
        value={techs}
      />

      <label htmlFor="price">Valor da diária * <span>(em branco para gratuito)</span> </label>
      <input 
        id="price"
        placeholder="Valor cobrado por dia"
        onChange={event => setPrice(event.target.value)}
        value={price}
      />

      <button type="submit" className="btn">Cadastrar</button>
    </form>
  )
}