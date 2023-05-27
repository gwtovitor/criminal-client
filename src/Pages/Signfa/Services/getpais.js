import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import axios from 'axios';
import paisesJson from './paises-array.json';

function SelectPaises({ onSelectPais }) {
  useEffect(() => {
    // Se precisar fazer uma requisição para buscar a lista de países
    // você pode usar o axios ou outra biblioteca de requisição HTTP aqui
    // Exemplo:
    // axios.get('URL_API_PAISES')
    //   .then(response => {
    //     const paises = response.data;
    //     setListaPaises(paises);
    //   })
    //   .catch(error => {
    //     console.error('Erro ao obter a lista de países:', error);
    //   });

    // Para simular o carregamento do JSON de paises
    // setListaPaises(paisesJson);
  }, []);

  function handleChange(event) {
    const paisSelecionado = event.target.value;
    onSelectPais(paisSelecionado);
  }

  return (
    <Form.Select aria-label="Países" onChange={handleChange}>
      <option value="">Selecione um país</option>
      {paisesJson.map((pais, index) => (
        <option key={index} value={pais.nome}>
          {pais.nome}
        </option>
      ))}
    </Form.Select>
  );
}

export default SelectPaises;
