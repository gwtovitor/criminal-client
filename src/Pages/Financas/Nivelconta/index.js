function NivelConta() {
    return (
        <div className='ms-4 mb-5 mt-3' style={{ marginRight: '-1.53rem' }}>

            <div className='row mt-4'>
                <h5>Nível da Conta</h5>
            </div>
            
            <div className='row'>
                <div className='col-12 col-lg-6 mt-2'>
                    <div class="card">
                        <div class="card-header">
                            Nível Atual
                        </div>
                        <div class="card-body">
                            <strong class="card-text">Nível 1</strong>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-lg-6 mt-2'>
                    <div class="card">
                        <div class="card-header">
                            Valor do Nível
                        </div>
                        <div class="card-body">
                            <strong class="card-text">R$ 30,00</strong>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-lg-6 mt-2'>
                    <div class="card">
                        <div class="card-header">
                           Data do pagamento do nível atual
                        </div>
                        <div class="card-body">
                            <strong class="card-text">23/05/2023</strong>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-lg-6 mt-2'>
                    <div class="card">
                        <div class="card-header">
                            Horário do pagamento do nível atual
                        </div>
                        <div class="card-body">
                            <strong class="card-text">11:46:22</strong>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-lg-6 mt-2'>
                    <div class="card">
                        <div class="card-header">
                            Período no Nível Atual
                        </div>
                        <div class="card-body">
                            <strong class="card-text">23/05/2023 à 23/06/2023</strong>
                        </div>
                    </div>
                    
                </div>
                <div className='col-12 col-lg-6 mt-2'>
                    <div class="card">
                        <div class="card-header">
                            Valor Atual de Vendas desse Período
                        </div>
                        <div class="card-body">
                            <strong class="card-text">R$ 4.900,00</strong>
                        </div>
                    </div>

                </div>
            </div>
            <div className='row'>
            <div className='row mt-4'>
                <h5>Próximo Nível</h5>
            </div>
                <div className='col-12 col-lg-6 mt-2'>
                    
                    <div class="card">
                        
                        <div class="card-header">
                            Valor Restante para Alcançar Próximo Nível
                        </div>
                        <div class="card-body">
                            <strong class="card-text">R$ 6.099,99</strong>
                        </div>
                    </div>
                    
                </div>
                <div className='col-12 col-lg-6 mt-2'>
                    <div class="card">
                        <div class="card-header">
                           Taxa do Próximo Nível
                        </div>
                        <div class="card-body">
                            <strong class="card-text">R$ 195,00</strong>
                        </div>
                    </div>

                </div>
            </div>
            <div className='row'>
            <div className='row mt-4'>
                <h5>Histório de níveis</h5>
            </div>
                <div className='col-12 col-lg-6 mt-2'>
                    
                    <div class="card">
                        
                        <div class="card-header">
                            Nível 1
                        </div>
                        <div class="card-body">
                            <strong class="card-text">23/05/2023 à 15:00h</strong>
                        </div>
                    </div>
                    
                </div>
                <div className='col-12 col-lg-6 mt-2'>
                    <div class="card">
                        <div class="card-header">
                          Nível 2
                        </div>
                        <div class="card-body">
                            <strong class="card-text">Nunca atingiu</strong>
                        </div>
                    </div>

                </div>
                <div className='col-12 col-lg-6 mt-2'>
                    <div class="card">
                        <div class="card-header">
                          Nível 3
                        </div>
                        <div class="card-body">
                            <strong class="card-text">Nunca atingiu</strong>
                        </div>
                    </div>

                </div>
                <div className='col-12 col-lg-6 mt-2'>
                    <div class="card">
                        <div class="card-header">
                          Nível 4
                        </div>
                        <div class="card-body">
                            <strong class="card-text">Nunca atingiu</strong>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default NivelConta;