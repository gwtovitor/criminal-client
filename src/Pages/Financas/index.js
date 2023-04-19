import { useEffect } from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

function Financas() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const geraMenu = (tipoPerfil) => {
      let menu = [
        { page: 'Compras', link: 'financas' }
      ];

      if (tipoPerfil === 'criador') {
        menu.push({ page: 'Balanco', link: 'financas/balanco' });
        menu.push({ page: 'Meu Banco', link: 'financas/banco' });
      };

      setMenu(menu);
    }

    geraMenu('criador');
  }, [])

  return (
    <div className='container'>
      <div className='row mt-4'>
        {/* content */}
        <div className='col'>
          <Outlet />
        </div>
        <div className='col-4 col-sm-3 ms-3'>
          <h5>Financas</h5>
          <hr />

          {
            menu?.map(page => {
              return (
                <div className='col-12' key={page.link}>
                  <a className='link-offset-3 link-underline-info link-underline-opacity-0 link-underline-opacity-75-hover text-info' href={`/${page.link}`}><h6>{page.page}</h6></a>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Financas;