function Postverts() {
  return (
    <div className='ms-4 mb-5 mt-3' style={{ marginRight: '-1.53rem' }}>
      <div className='row mb-4'>
        <strong>Postagem Verts</strong>
      </div>
      <div className='row'>

        <div className='row mt-3'>
          <div className='col-12 d-grid'>
            <a className='btn btn-info text-white' href="#">Video</a>
          </div>
        </div>
        <div className='row mt-2'>
          <div className='col-12'>
            <textarea class="form-control" placeholder="Legenda" aria-label="With textarea "></textarea>
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
            <a className='btn btn-info text-white' href="#">Postar</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Postverts;