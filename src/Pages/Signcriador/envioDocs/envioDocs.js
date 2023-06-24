import { Form, Button, Image, } from 'react-bootstrap'
import logo from '../images/logo.png'
import React, { useState } from "react";
import './envioDocs.css'
import api from '../../../Services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function EnvioDocs() {
  const navigate = useNavigate();
  const [files, setFiles] = useState({
    rgFrente: null,
    rgVerso: null,
    cpf: null,
    selfie: null
  });

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
    if (files.rgFrente && files.rgVerso && files.cpf && files.selfie) {
      try {
        const envioRgFrente = await api.post("/upload", createFormData("rgFrente", files.rgFrente), {
          headers: { "Content-Type": "multipart/form-data" }
        });

        const rgFrentePatch = envioRgFrente.data.files[0].location;
        console.log(rgFrentePatch)

        const envioVerso = await api.post("/upload", createFormData("rgVerso", files.rgVerso), {
          headers: { "Content-Type": "multipart/form-data" }
        });

        const rgVersoPatch = envioVerso.data.files[0].location;
        console.log(rgVersoPatch)
        const envioCPF = await api.post("/upload", createFormData("cpf", files.cpf), {
          headers: { "Content-Type": "multipart/form-data" }
        });

        const cpfPatch = envioCPF.data.files[0].location;
        console.log(cpfPatch)
        const envioSelfie = await api.post("/upload", createFormData("selfie", files.selfie), {
          headers: { "Content-Type": "multipart/form-data" }
        });

        const selfiePatch = envioSelfie.data.files[0].location;
        console.log(selfiePatch)
        try {
          const user = localStorage.getItem('cc_i')
          const postUserDocs = await api.post('/documentos', {
            user: user,
            rgfrente: rgFrentePatch,
            rgverso: rgVersoPatch,
            rgself: selfiePatch,
            cpf: cpfPatch
          })
          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Envio de documentos realizado com sucesso, agora aguarde o contato da nossa equipe via email para ativar sua conta',
            willClose: () => {
                navigate('/home')
            }
        });
          
        } catch (err) {
          console.log(err)
        }

      } catch (error) {
        console.error(error);

      }
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

  // Função para criar uma nova instância de FormData para um arquivo específico
  function createFormData(name, file) {
    const formData = new FormData();
    formData.append('files', file);
    return formData;
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