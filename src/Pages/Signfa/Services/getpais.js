import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import axios from 'axios';

function SelectPaises() {
  const [paises, setPaises] = useState([]);
  const [paisSelecionado, setPaisSelecionado] = useState('');

  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/paises/')
      .then(response => {
        const nomesDosPaises = response.data.map(pais => pais.nome.abreviado);
        setPaises(nomesDosPaises);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function handleChange(event) {
    const paisSelecionado = event.target.value;
    setPaisSelecionado(paisSelecionado);
    console.log('País selecionado:', paisSelecionado);
  }

  return (
    <Form.Select aria-label="Países" onChange={handleChange} value={paisSelecionado}>
      <option value="">Selecione um país</option>
      {paises.map((pais, index) => (
        <option key={index} value={pais}>
          {pais}
        </option>
      ))}
    </Form.Select>
  );
}

export default SelectPaises;
