function Suporte() {
    return (
        <div className='ms-4 mb-5 mt-3' style={{ marginRight: '-1.53rem' }}>
            <div className='row mb-4'>
                <strong>Suporte CC</strong>
            </div>
            <div className='row'>
                <div className='row'>
                    <div class="input-group">
                        <span class="input-group-text">Titulo</span>
                        <input placeholder="Explique resumidamente o problema" type="text" class="form-control" />
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-12'>
                        <textarea class="form-control" placeholder="Explique detalhadamente o problema" aria-label="With textarea"></textarea>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-12 d-grid text-center'>
                        <span className="mb-2">Anexe prints do problema caso necessário</span>
                        <a className='btn btn-info text-white' href="#">Mídia</a>
                        <div class="input-group mt-3">
                            <span class="input-group-text">Email</span>
                            <input placeholder="Digite seu email para contato" type="text" class="form-control" />
                        </div>
                    </div>
                </div>

                <div className='row mt-3'>
                    <div className='col-12 d-grid text-center'>
                        <span className="mb-2">Entraremos em contato o mais rápido possível para resolver seu problema/dúvida</span>
                        <a className='btn btn-info text-white' href="#">Enviar</a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Suporte;