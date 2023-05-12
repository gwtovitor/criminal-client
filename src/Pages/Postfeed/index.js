function Postfeed() {
  return (
    <div className='ms-4 mb-5 mt-3' style={{ marginRight: '-1.53rem' }}>
      <div className='row mb-4'>
        <strong>Publicar no Feed</strong>
      </div>
      <div className='row'>
        <div className='row'>
          <div className='col-12'>
            <textarea class="form-control" aria-label="With textarea"></textarea>
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
            <div class="input-group">
              <span class="input-group-text">Preço</span>
              <input type="text" class="form-control" />
            </div>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-12'>
            <div class="form-check-reverse text-start form-switch">
              <input class="form-check-input" style={{ width: '2.5rem', height: '1.5rem' }} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
              <label class="form-check-label mt-1" for="flexSwitchCheckDefault">Desativar Comentários</label>
            </div>
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