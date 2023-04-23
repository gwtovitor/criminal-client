import { useEffect, useState } from 'react';

function Compras() {
  const [data, setData] = useState([]);

  const compras = [
    { tipo: 'Tip', valor: '10.00', perfil: 'Elon Musk' },
    { tipo: 'Assinatura', valor: '15.00', perfil: 'Michael Jackson' },
    { tipo: 'Compra', valor: '30.00', perfil: 'Steve Jobs' },
  ]

  useEffect(() => {
    const getInitialData = () => {
      setData(compras);
    }

    getInitialData();
  }, [])

  return (
    <div className='ms-4 mb-5 mt-3' style={{ marginRight: '-1.53rem' }}>
      <div className='row mb-4'>
        <strong>Minhas Compras</strong>
      </div>
      {
        data?.map(compra => {
          return (
            <div className='row'>
              <div className='col-2'>
                <img className='rounded-circle' style={{ width: "50px", height: "50px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT43SGFWUfgzDc9ZpkHevk681gUpfj5exmJyA&usqp=CAU" alt="" />
              </div>
              <div className='col-7 ms-3'>
                <p><strong>{compra.perfil}</strong> <br /> <small>{compra.tipo}</small></p>
              </div>
              <div className='col-2'>
                <small>{compra.valor}</small>
              </div>
            </div>
          )
        })
      }
    </div >
  )
}

export default Compras;