import { Form, Button, Image, } from 'react-bootstrap'
import logo from '../images/logo.png'
import React, { useState } from "react";
import './envioDocs.css'
import api from '../../../Services/api';
import { toast } from 'react-toastify';



function EnvioDocs() {
  const [files, setFiles] = useState({
    rgFrente: null,
    rgVerso: null,
    cpf: null,
    selfie: null
  });
  const patchs = []

  const handleRgFrente = (event) => {
    setFiles({ ...files, rgFrente: event.target.files[0] });
  };

  const handleRgVerso = (event) => {
    setFiles({ ...files, rgVerso: event.target.files[0] });
  };

  const handleCPF = (event) => {
    setFiles({ ...files, cpf: event.target.files[0] });
  };

  const handleSelfie = (event) => {
    setFiles({ ...files, selfie: event.target.files[0] });
  };


  async function enviarDocs() {
    if (
      files.rgFrente &&
      files.rgVerso &&
      files.cpf &&
      files.selfie
    ) {
      const formData = new FormData();
      const uploadPromises = [];
      const patchs = {}; // Usando um objeto para armazenar os patches
      console.log(files.rgFrente)
      console.log(files.rgVerso)
      console.log(files.cpf)
      console.log(files.selfie)
      for (const key in files) {
        formData.append("file", files[key]);
        console.log(files[key])
        uploadPromises.push(
          api.post("/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" }
          })
        );
      }
  
      try {
        const responses = await Promise.all(uploadPromises);
        for (let i = 0; i < responses.length; i++) {
          const fileKey = Object.keys(files)[i];
          const response = responses[i];
          const patch = response.data.file.location;
          patchs[fileKey] = patch; 
        }
  
        console.log("Patchs:", patchs);
  
      } catch (error) {
      }
      console.log(patchs)

    
    } else {
      toast.error('Favor selecionar todos os documentos', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }


  return (
    <div className='container-signcriador'>
      <div className='container-logofa'>
        <Image className='logo-signfa' src={logo} alt="Logo da empresa" fluid />
      </div>
      <div className='centralcontainer-signfa'>

        <Form id='form-signfa'>
          <h1>Envio de Documentos</h1>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">Frente do RG</label>
            <input
              onChange={handleRgFrente}
              className="form-control"
              type="file"
              id="formFile"
              accept="image/*"
              multiple={false}
            />

          </div>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">Verso do RG</label>
            <input
              onChange={handleRgVerso}
              className="form-control"
              type="file"
              id="formFile"
              accept="image/*"
              multiple={false}
            />

          </div>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">CPF</label>
            <input
              onChange={handleCPF}
              className="form-control"
              type="file"
              id="formFile"
              accept="image/*"
              multiple={false}
            />

          </div>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">Selfie com o RG</label>
            <input
              onChange={handleSelfie}
              className="form-control"
              type="file"
              id="formFile"
              accept="image/*"
              multiple={false}
            />

          </div>

        </Form>
        <div className='d-grid'>
          <Button
            variant="primary"
            className="btn btn-info text-white m-3"
            type="submit"
            onClick={() => { enviarDocs() }}

          >
            <span style={{ fontWeight: 'bold' }}>Criar Conta</span>
          </Button>
        </div>

      </div>

    </div>
  )
}
export default EnvioDocs