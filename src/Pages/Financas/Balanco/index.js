function Balanco() {
  return (
    <div className="ms-4 mb-5 mt-3" style={{ marginRight: "-1.53rem" }}>
      <div className="row">
        <strong>Estatísticas</strong>
      </div>
      <div className="row mt-4">
        <h5>Faturamento</h5>
      </div>
      <div className="row">
        <div className="col-12 col-lg-6 mt-2">
          <div class="card">
            <div class="card-header">Vendas Hoje</div>
            <div class="card-body">
              <strong class="card-text">R$ 85,45</strong>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6 mt-2">
          <div class="card">
            <div class="card-header">Vendas Este Mes</div>
            <div class="card-body">
              <strong class="card-text">R$ 1.396,70</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-6 mt-2">
          <div class="card">
            <div class="card-header">Saldo Liberado</div>
            <div class="card-body">
              <strong class="card-text">R$ 242,89</strong>
            </div>
          </div>
          <p className="mt-1">
            Saldo pode ser liberado em ate 2 dias uteis para saque.
          </p>
        </div>
        <div className="col-12 col-lg-6 mt-2">
          <div class="card">
            <div class="card-header">Saldo Total</div>
            <div class="card-body">
              <strong class="card-text">R$ 541,20</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <h5>Assinantes</h5>
      </div>
      <div className="row">
        <div className="col-12 col-lg-4 mt-2">
          <div class="card">
            <div class="card-header">Total de Assinantes</div>
            <div class="card-body">
              <strong class="card-text">36</strong>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 mt-2">
          <div class="card">
            <div class="card-header">Assinantes Este Mes</div>
            <div class="card-body">
              <strong class="card-text">9</strong>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 mt-2">
          <div class="card">
            <div class="card-header">Desempenho</div>
            <div class="card-body">
              <strong class="card-text text-success">13%</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Balanco;
