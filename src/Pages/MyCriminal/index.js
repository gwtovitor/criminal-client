import { useEffect, useState } from 'react';

function MyCriminal(props) {
  const [data, setData] = useState([]);

  //mock
  const favorites = {
    page: 'Favoritos', data: [

    ]
  };

  const subscribing = {
    page: 'Assinando', data: [
      { name: 'Elon Musk', username: 'elonmusk', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Michael Jackson', username: 'mj', img: 'https://people.com/thmb/kH5WPADak70KeWwlyIOA4Lbz4Ng=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(709x499:711x501)/michael-jackson-210aa5866c7d4dd58de8e3af57fe919a.jpg' },
      { name: 'Steve Job', username: 'steve', img: 'https://www.invent.org/sites/default/files/styles/inductee_detail_media/public/inductees/2019-10/jobs%2Csteve%5B1%5D.png?h=0a46ecf5&itok=AsnaESah' },
    ]
  };

  const subscribers = {
    page: 'Assinantes', data: [
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
    ]
  };

  const following = {
    page: 'Seguindo', data: [
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
    ]
  };

  const followers = {
    page: 'Seguidores', data: [
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
    ]
  };

  const blocks = {
    page: 'Bloqueados', data: [
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
    ]
  };

  useEffect(() => {
    const getData = (page) => {
      const data = () => {
        if (page === 'Assinando') return subscribing;
        if (page === 'Assinantes') return subscribers;
        if (page === 'Seguindo') return following;
        if (page === 'Seguidores') return followers;
        if (page === 'Bloqueados') return blocks;
      }

      setData(data);
    }

    getData(props.page);
  }, []);

  return (
    <div className='row mt-3'>
      <div className='col-10'>
        <strong>{data.data?.length} {data.page}</strong>
        <div className='row mt-1'>
          {
            data.data?.map(d => {
              return (
                <div className='row mt-1'>
                  <a className='link-dark link-underline-opacity-0 col-12 col-lg-4 mt-1' href="#">
                    <div className='row mt-1'>
                      <div class="col-3 col-lg-3">
                        <img src={d.img} class="rounded-circle" style={{ width: '50px', height: '50px' }} alt={d.username} />
                      </div>
                      <div class="col-8 ms-1">
                        <strong>{d.name}</strong>
                        <p>{d.username}</p>
                      </div>
                    </div>
                  </a>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default MyCriminal;