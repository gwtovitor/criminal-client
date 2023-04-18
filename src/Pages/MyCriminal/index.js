import { useEffect, useState } from 'react';

function MyCriminal() {
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState([]);

  //mock
  const favorites = {
    page: 'Favorites', data: [

    ]
  };

  const subscribing = {
    page: 'Subscribing', data: [
      { name: 'Elon Musk', username: 'elonmusk', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Michael Jackson', username: 'mj', img: 'https://people.com/thmb/kH5WPADak70KeWwlyIOA4Lbz4Ng=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(709x499:711x501)/michael-jackson-210aa5866c7d4dd58de8e3af57fe919a.jpg' },
      { name: 'Steve Job', username: 'steve', img: 'https://www.invent.org/sites/default/files/styles/inductee_detail_media/public/inductees/2019-10/jobs%2Csteve%5B1%5D.png?h=0a46ecf5&itok=AsnaESah' },
    ]
  };

  const subscribers = {
    page: 'Subscribers', data: [
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
    page: 'Following', data: [
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
    page: 'Followers', data: [
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
    ]
  };

  const blocks = {
    page: 'Blocks', data: [
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { name: 'Luiz Mathias', username: 'luizmathias', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
    ]
  };

  useEffect(() => {
    const getInitialData = () => {
      setData(subscribing);
    }

    const mountMyMenu = (user) => {
      if (user === 'criado') {
        setMenu([
          'Favorites',
          'Subscribing',
          'Subscribers',
          'Following',
          'Followers',
          'Blocks'
        ])
      } else {
        setMenu([
          'Favorites',
          'Subscribing',
          'Following',
          'Blocks'
        ])
      }
    }

    getInitialData();
    mountMyMenu('criado');
  }, []);

  const getData = (page) => {
    const data = () => {
      if (page == 'Favorites') return favorites;
      if (page == 'Subscribing') return subscribing;
      if (page == 'Subscribers') return subscribers;
      if (page == 'Following') return following;
      if (page == 'Followers') return followers;
      if (page == 'Blocks') return blocks;
    }

    setData(data);
  }

  return (
    <div className='container'>
      <div className='row mt-4'>
        <div className='col-10'>
          <h4 className='text-secondary'>{data.page} ({data.data.length})</h4>
          <div className='row mt-2'>
            {
              data.data?.map(d => {
                return (
                  <div className='col-4'>
                    <a className='link-secondary link-underline-opacity-0' href="#">
                      <div className='row mt-3'>
                        <div class="col-4">
                          <img src={d.img} class="img-fluid" alt={d.username} />
                        </div>
                        <div class="col">
                          <h5>{d.name}</h5>
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
        <div className='col-2'>
          <h5 className='text-secondary'>My Page</h5>
          <hr />
          {
            menu?.map(page => {
              return (
                <div className='col-12'>
                  <a className='link-offset-3 link-underline-info link-underline-opacity-0 link-underline-opacity-75-hover text-info' href="#" onClick={() => getData(page)}><h6>{page}</h6></a>
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