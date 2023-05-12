import { useState } from 'react';
import './vertsvideo.css'


function Postverts() {
  const [videoURL, setVideoURL] = useState('');

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setVideoURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
   
     
     
 
    <div className='ms-4 mb-5 mt-3' style={{ marginRight: '-1.53rem' }}>
      <div className='row mb-4'>
        <strong>Publicar no Verts</strong>
      </div>
     
      <div className='row'>
        <div className='row mt-3'>
          <div className='col-12 d-grid'>
            <label className='btn btn-info text-white' htmlFor='video-upload'>
              Video
              <input
                id='video-upload'
                type='file'
                accept='video/*'
                style={{ display: 'none' }}
                onChange={handleVideoUpload}
              />
            </label>
          </div>
        </div>
        <div className='row mt-2'>
          <div className='col-12'>
            <textarea className='form-control' placeholder='Legenda' aria-label='With textarea'></textarea>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-12'>
            <div className='form-check-reverse text-start form-switch'>
              <input
                className='form-check-input'
                style={{ width: '2.5rem', height: '1.5rem' }}
                type='checkbox'
                role='switch'
                id='flexSwitchCheckDefault'
              />
              <label className='form-check-label mt-1' htmlFor='flexSwitchCheckDefault'>
                Desativar Comentários
              </label>
            </div>
          </div>
        </div>
     
        {videoURL && (
        <div className='fullscreen-video-container' style={{alignSelf:'center', margin:'0 auto'}}>
          <video 
          controls
          src={videoURL}  width='100%' height='auto' style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>
      )}
        <div className='row mt-3'>
          <div className='col-12 d-grid'>
            <button className='btn btn-info text-white'>Publicar</button>
          </div>
        </div>

      </div>
    </div>
    
  );
}

export default Postverts;
