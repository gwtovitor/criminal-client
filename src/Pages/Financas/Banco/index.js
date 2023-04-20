function Banco() {
  return (
    <div>
      <div className='row'>
        <h4>Meu Banco</h4>
      </div>
      <div className='row mt-4'>
        <h5>Dados Bancarios</h5>
      </div>
      <div className='row'>
        <div className='col-12 col-lg-6 mt-2'>
          <div class="card">
            <div class="card-header">
              Banco
            </div>
            <div class="card-body">
              <div class="dropdown">
                <a class="link-dark link-underline-opacity-0 dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Seu Banco
                </a>

                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='col-12 col-lg-6 mt-2'>
          <div class="card">
            <div class="card-header">
              Tipo de Conta
            </div>
            <div class="card-body">
              <div class="dropdown">
                <a class="link-dark link-underline-opacity-0 dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Tipo de Conta
                </a>

                <ul class="dropdown-menu">
                  <li><p class="dropdown-item" value="cc">Conta Corrente</p></li>
                  <li><p class="dropdown-item" value="cp">Poupanca</p></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 col-lg-6 mt-2'>
          <div class="card">
            <div class="card-header">
              Agencia
            </div>
            <div class="card-body">
              <strong class="card-text">0001</strong>
            </div>
          </div>
        </div>
        <div className='col-12 col-lg-6 mt-2'>
          <div class="card">
            <div class="card-header">
              Numero da Conta
            </div>
            <div class="card-body">
              <strong class="card-text">555.222-5</strong>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 col-lg-6 mt-2'>
          <div class="card">
            <div class="card-header">
              Tipo Chave Pix
            </div>
            <div class="card-body">
              <div class="dropdown">
                <a class="link-dark link-underline-opacity-0 dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Chave Pix
                </a>

                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='col-12 col-lg-6 mt-2'>
          <div class="card">
            <div class="card-header">
              Chave Pix
            </div>
            <div class="card-body">
              <strong class="card-text">012.345.678-90</strong>
            </div>
          </div>
        </div>
        <div className='col-12 mt-2 d-grid'>
          <a className='btn btn-info text-white' type='button' href="#">Salvar</a>
        </div>
      </div>
      <div className='row mt-5'>
        <h5>Saque</h5>

      </div>
      <div className='row'>
        <div className='col-12 mt-2'>
          <div class="card">
            <div class="card-header">
              Saque Disponivel
            </div>
            <div class="card-body">
              <strong class="card-text">RS 242,89</strong>
            </div>
          </div>
        </div>
        <div className='col-12 mt-2 d-grid'>
          <a className='btn btn-info text-white' type='button' href="#">Sacar</a>
        </div>
      </div>
    </div>
  )
}

export default Banco;