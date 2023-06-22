function Banco() {
  return (
    <div className="ms-4 mb-5 mt-3" style={{ marginRight: "-1.53rem" }}>
      <div className="row mt-4">
        <h5>Dados Bancarios</h5>
      </div>
      <div className="row mt-2">
        <div className="col-12 col-lg-6">
          <div class="card">
            <div class="card-header">Banco</div>
            <div class="card-body">
              <div class="dropdown">
                <a
                  class="link-dark link-underline-opacity-0 dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Seu Banco
                </a>

                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">
                      Nubank
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Bradesco
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Banco Inter
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Itau
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Santander
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6 mt-2">
          <div class="card">
            <div class="card-header">Tipo de Conta</div>
            <div class="card-body">
              <div class="dropdown">
                <a
                  class="link-dark link-underline-opacity-0 dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Tipo de Conta
                </a>

                <ul class="dropdown-menu">
                  <li>
                    <p class="dropdown-item" value="cc">
                      Conta Corrente
                    </p>
                  </li>
                  <li>
                    <p class="dropdown-item" value="cp">
                      Poupanca
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-6 mt-2">
          <div class="card">
            <div class="card-header">Agência</div>
            <div class="card-body">
              <strong class="card-text">0001</strong>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6 mt-2">
          <div class="card">
            <div class="card-header">Número da Conta</div>
            <div class="card-body">
              <strong class="card-text">555.222-5</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-6 mt-2">
          <div class="card">
            <div class="card-header">Tipo Chave Pix</div>
            <div class="card-body">
              <div class="dropdown">
                <a
                  class="link-dark link-underline-opacity-0 dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Chave Pix
                </a>

                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">
                      CPF
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Celular
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Email
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6 mt-2">
          <div class="card">
            <div class="card-header">Chave Pix</div>
            <div class="card-body">
              <strong class="card-text">012.345.678-90</strong>
            </div>
          </div>
        </div>
        <div className="col-12 mt-2 d-grid">
          <a className="btn btn-info text-white" type="button" href="#">
            Salvar
          </a>
        </div>
      </div>
      <div className="row mt-5">
        <h5>Saque</h5>
      </div>
      <div className="row">
        <div className="col-12 mt-2">
          <div class="card">
            <div class="card-header">Saque Disponivel</div>
            <div class="card-body">
              <strong class="card-text">RS 242,89</strong>
            </div>
          </div>
        </div>
        <div className="col-12 mt-2 d-grid">
          <a className="btn btn-info text-white" type="button" href="#">
            Sacar
          </a>
        </div>
      </div>
    </div>
  );
}

export default Banco;
