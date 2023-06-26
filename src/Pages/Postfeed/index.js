import { useState, useEffect } from 'react';
import './vertsvideo.css'
import "react-datepicker/dist/react-datepicker.css";
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import api from '../../Services/api';
import { toast } from "react-toastify";

function Postfeed() {
  const [data, setData] = useState(null);
  const [hora, setHora] = useState(null);
  const [dataDisable, setDataDisable] = useState(false);
  const [fotoCapa, setFotoCapa] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [legenda, setLegenda] = useState('');
  const idUser = localStorage.getItem('cc_p');
  const token = localStorage.getItem('cc_t')
  const [fileUrl, setfileUrl] = useState('');
  const [newPosts, setNewPosts] = useState([]);
  const [price, setPrice] = useState('0,00');
  const [combinedDateTime, setCombinedDateTime] = useState('');

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await api.get(`/profile/${idUser}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        setNewPosts(response.data.posts);
      } catch (error) {
        console.log(error);
      }
    }

    loadPosts();
  }, []);

  const handleDataChange = (newValue) => {
    const currentDate = dayjs().startOf('day');
    const selectedDate = dayjs(newValue).startOf('day');

    if (!selectedDate.isValid()) {
      // Verificar se o valor não é uma data válida
      setData(null); // Limpar a data selecionada
    } else if (selectedDate.isBefore(currentDate)) {
      // A data selecionada é anterior à data atual
      setData(null); // Limpar a data selecionada
    } else {
      setData(newValue);
      const isoDate = selectedDate.toISOString();
      setCombinedDateTime(isoDate)

      if (dayjs(data).isSame(currentDate, 'day')) {
        // A data selecionada é a data atual, verifique também a hora selecionada
        const currentDateTime = dayjs();
        const selectedDateTime = dayjs(data).set('hour', hora.hour).set('minute', hora.minute);
        if (selectedDateTime.isBefore(currentDateTime)) {
          // A hora selecionada é anterior à hora atual
          setHora(null); // Limpar a hora selecionada
        }
      }
    }
  };

  const handleFileSelect = (event) => {
    try {
      const files = event.target.files;
      setSelectedFile(files);
      const fileUrls = Array.from(files).map(file => ({
        link: URL.createObjectURL(file),
        type: file.type,
      }));
      setfileUrl(fileUrls);
    } catch (error) {
      console.log(error);
    }
  }

  async function postarVerts() {

    if (selectedFile != null) {

      const patchs = [];
      for (const arquivos of selectedFile) {

        const formData = new FormData();


        formData.append("files", arquivos);
        try {
          const response = await api.post("/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" }
          })
          console.log(response)
          const videoPath = response.data.files[0].location
          patchs.push(videoPath)
          
         
        } catch (error) {
          console.log(error)
        }
      }
      try {
        const postandoFeed = await api.post(`/post`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          user: idUser,
          content: patchs,
          legenda: legenda,
          price: price,
          agendamentoPost: combinedDateTime,
          fotoCapa: fotoCapa ? true : false 
        })
        const idPost = postandoFeed.data._id
        console.log(postandoFeed)
        const newPostsWithId = [...newPosts, idPost];
        console.log(newPostsWithId)

        try {
          const enviandoVerts = await api.patch(`/profile/${idUser}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            posts: newPostsWithId
          });
          console.log(enviandoVerts)
        } catch (error) {
          console.log(error);
        }

      } catch (error) {
        console.log(error)
      }

    } else {
      toast.error("Selecione uma mídia para publicar", {
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
  };

  const changeLegenda = (event) => {
    setLegenda(event.target.value);
  };

  const changePrice = (event) => {
    setPrice(event.target.value)
  }
  function mascaraMoeda(event) {
    const onlyDigits = event.target.value
      .split("")
      .filter(s => /\d/.test(s))
      .join("")
      .padStart(3, "0")
    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
    event.target.value = maskCurrency(digitsFloat)
  }

  function maskCurrency(valor, locale = 'pt-BR', currency = 'BRL') {
    const valorNew = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency
    }).format(valor)
    setPrice(valorNew)
    return valorNew
  }


  return (

    <div className='ms-4 mb-5 mt-3' style={{ marginRight: '-1.53rem' }}>
      <div className='row mb-4'>
        <strong>Publicar no Feed</strong>
      </div>

      <div className='row'>
        <div className='row mt-2'>
          <div className='col-12'>
            <textarea className='form-control' placeholder='Legenda' onChange={changeLegenda} aria-label='With textarea'></textarea>
          </div>
        </div>
        <div className='row mt-3'>

          <div className='col-12 d-grid'>

            <label className='btn btn-info text-white' htmlFor='video-upload'>
              Midia
              <input
                id='video-upload'
                type='file'
                multiple
                accept='video/mp4, image/*'
                style={{ display: 'none' }}
                onChange={handleFileSelect}
              />

            </label>
          </div>
        </div>

        {fileUrl && Array.isArray(fileUrl) && (
          fileUrl.map((file, index) => (
            <div key={index} className='content-container mt-2' style={{ alignSelf: 'center', margin: '0 auto' }}>
              {file.type.includes('video') ? (
                <video controls src={file.link} width='50%' height='auto' />
              ) : (
                <img src={file.link} alt="Imagem" width='50%' height='auto'/>
              )}
            </div>
          ))
        )}
        <div className='row mt-4'>
          <div className='col-12'>
            <p>Ative a foto de capa para voce exibir a primeira foto gratuíta como demonstrativo</p>
            <div className="input-group">
              <div className="form-check-reverse text-start form-switch">
                <input
                  className="form-check-input"
                  style={{ width: '2.5rem', height: '1.5rem' }}
                  onChange={(e) => setFotoCapa(e.target.checked)}
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
                <label className="form-check-label mt-1" style={{ marginRight: '8px' }} htmlFor="flexSwitchCheckDefault">Foto de Capa</label>
              </div>
            </div>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-12'>
            <div className="input-group  mb-3 mt-2">
              <div className="input-group-prepend">
                <span className="input-group-text">R$</span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Em branco para R$ 0,00"
                aria-label="Amount (to the nearest dollar)"
                onInput={mascaraMoeda}
              />
            </div>
          </div>
        </div>
        <div className='row mt-4'>
          <div className='col-12'>
            <div className="input-group">
              <div className="form-check-reverse text-start form-switch">
                <input
                  className="form-check-input"
                  style={{ width: '2.5rem', height: '1.5rem' }}
                  onChange={(e) => setDataDisable(e.target.checked)}
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
                <label className="form-check-label mt-1" style={{ marginRight: '8px' }} htmlFor="flexSwitchCheckDefault">Agendar Postagem</label>
              </div>
            </div>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-12'>
            {dataDisable && (<div className="input-group">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  label="Data e Horário"
                  value={data}

                  onChange={handleDataChange}
                  views={['day', 'month', 'year']}
                  format="DD / MM / YYYY"

                />
              </LocalizationProvider>

            </div>)}
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-12 d-grid'>
            <button className='btn btn-info text-white' onClick={postarVerts}>Publicar</button>
          </div>
        </div>

      </div>
    </div>

  );
}

export default Postfeed;
