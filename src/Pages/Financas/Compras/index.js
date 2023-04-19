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
    <div>
      <h5 className='mb-4'>Minhas Compras</h5>
      {
        data?.map(compra => {
          return (
            <div className='row'>
              <div className='col-2 col-sm-1 me-2'>
                <img className='rounded-circle' style={{ width: "50px", height: "50px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT43SGFWUfgzDc9ZpkHevk681gUpfj5exmJyA&usqp=CAU" alt="" />
              </div>
              <div className='col'>
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