import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';

function Postfeed() {
  const [data, setData] = useState(null);
  const [hora, setHora] = useState(null);
  const [dataDisable, setDataDisable] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const calcularAcrescimo = () => {
    const valor = parseFloat(inputValue);
    if (!isNaN(valor)) {
      const acrescimo = valor * 0.05;
      const resultado = valor + acrescimo;
      return resultado.toFixed(2);
    }
    return '';
  };

  const handleDataChange = (newValue) => {
    const currentDate = dayjs().startOf('day');
    const selectedDate = dayjs(newValue).startOf('day');
    if (selectedDate.isBefore(currentDate)) {
      // A data selecionada é anterior à data atual
      setData(null); // Limpar a data selecionada
    } else {
      setData(newValue);
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

  const handleHoraChange = (newValue) => {
    const currentDateTime = dayjs();
    const selectedDateTime = dayjs(data).set('hour', newValue.hour).set('minute', newValue.minute);

    if (selectedDateTime.isBefore(currentDateTime) || dayjs(data).isBefore(dayjs().startOf('day'))) {
      // A hora selecionada é anterior à hora atual ou a data selecionada é anterior à data atual
      setHora(null); // Limpar a hora selecionada
    } else {
      setHora(newValue);
    }
  };

  return (
    <div className='ms-4 mb-5 mt-3' style={{ marginRight: '-1.53rem' }}>
      <div className='row mb-4'>
        <strong>Publicar no Feed</strong>
      </div>
      <div className='row'>
        <div className='row'>
          <div className='col-12'>
            <textarea class="form-control" placeholder="Legenda" aria-label="With textarea"></textarea>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-6 d-grid'>
            <a className='btn btn-info text-white' href="#">Mídia</a>
          </div>
          <div className='col-6 d-grid'>
            <a className='btn btn-info text-white' href="#">Áudio</a>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-12'>
            <div className="input-group">
              <span className="input-group-text">Preço</span>
              <input
                placeholder="Em branco para R$ 0,00"
                type="text"
                className="form-control"
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className='row mt-3'>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'start' }}>
            <div className="form-check-reverse text-start form-switch">
              <label className="form-check-label mt-1" style={{ marginRight: '8px' }} htmlFor="flexSwitchCheckDefault">
                {inputValue ? `O valor a ser cobrado será de R$ ${calcularAcrescimo()} após o acréscimo da Taxa CC` : ''}
              </label>
            </div>
          </div>
        </div>
        <div className='row mt-4'>
          <div className='col-12'>
            <div class="input-group">
              <div class="form-check-reverse text-start form-switch">
                <input
                  class="form-check-input"
                  style={{ width: '2.5rem', height: '1.5rem' }}
                  onChange={(e) => setDataDisable(e.target.checked)}
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
                <label class="form-check-label mt-1" style={{ marginRight: '8px' }} for="flexSwitchCheckDefault">Agendar Postagem</label>
              </div>
            </div>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-12'>
            {dataDisable && (<div class="input-group">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  label="Data"
                  value={data}

                  onChange={handleDataChange}
                  views={['day', 'month', 'year']}
                  format="DD / MM / YYYY"

                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimeField
                  label="Horário"
                  value={hora}
                  onChange={handleHoraChange}
                  format="HH:mm"

                />
              </LocalizationProvider>
            </div>)}
          </div>
        </div>

        <div className='row mt-3'>
          <div className='col-12 d-grid'>
            <a className='btn btn-info text-white' href="#">Publicar</a>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Postfeed;