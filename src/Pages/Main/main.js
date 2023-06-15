import React, { useState, useEffect } from 'react';
import './main.css';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import CottageIcon from '@mui/icons-material/Cottage';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import { Outlet, Link } from 'react-router-dom';
import { ClosedCaptionOff, Logout, Search, Menu as MenuHamburger, AddBoxOutlined } from '@mui/icons-material';
import { ArrowBack } from '@mui/icons-material';
import { Send } from '@mui/icons-material';
import { SendOutlined } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import api from '../../Services/api';
import Swal from 'sweetalert2';


function Main() {
    const navigate = useNavigate();
    const id = localStorage.getItem('cc_p');
    const [isCreator, setIscCreator] = useState(false);
    const token = localStorage.getItem('cc_t');

    function logoff() {
        localStorage.removeItem('cc_p')
        localStorage.removeItem('cc_t')
        navigate('../home')
    }

    const updateUrlAndReload = (url) => {
        navigate(url);
        window.location.reload();
    };

    async function getDados() {
        try {
            // if (!localStorage.cc_p || !localStorage.cc_t) {
            //     navigate('/home');
            // }
            console.log(id, token);

            const response = await api.get(`/profile/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            setIscCreator(response?.data.creator)

        } catch (error) {
            return
        }
    }

    useEffect(() => {
        getDados();
    }, []);

    return (
        <div className='row'>
            <div className='col col-lg-3'>
                <div className='navlateral'>
                    <Sidebar className='navbarside-feed'>
                        <Menu>
                            <MenuItem href="/verts" icon={<PersonalVideoIcon style={{ color: 'black' }} />}>Verts</MenuItem>
                            <MenuItem href="/" icon={<HomeIcon style={{ color: 'black' }} />}>Feed</MenuItem>
                            <MenuItem href="/mensagens" icon={<Send style={{ color: 'black' }} />}>Mensagens</MenuItem>
                            {isCreator ? (
                                <SubMenu icon={<AddBoxOutlined style={{ color: 'black' }} />} label="Publicar">
                                    <MenuItem href="/postfeed">Feed</MenuItem>
                                    <MenuItem href="/postverts">Verts</MenuItem>
                                    <MenuItem href="/postmsg">Mensagens</MenuItem>

                                </SubMenu>
                            ) : (null)}
                            <SubMenu icon={<AttachMoneyIcon style={{ color: 'black' }} />} label="Finanças">
                                <MenuItem href="/balanco">Balanço</MenuItem>
                                <MenuItem href="/compras">Compras</MenuItem>
                                <MenuItem href="/banco">Banco</MenuItem>
                            </SubMenu>
                            <SubMenu icon={<ClosedCaptionOff style={{ color: 'black' }} />} label="My Criminal" className="scrollable-submenu">
                                <MenuItem href="/seguidores">Seguidores</MenuItem>
                                <MenuItem href="/seguindo">Seguindo</MenuItem>
                                <MenuItem href="/assinantes">Assinantes</MenuItem>
                                <MenuItem href="/assinando">Assinando</MenuItem>
                                <MenuItem href="/favoritos">Galeria</MenuItem>
                                <MenuItem onClick={() => updateUrlAndReload(`/profile/${id}`)}>Perfil</MenuItem>
                                <MenuItem href="/suporte">Suporte CC</MenuItem>
                                <MenuItem onClick={() => { logoff() }}>Sair</MenuItem>

                            </SubMenu>



                        </Menu>
                    </Sidebar>

                </div>
            </div>
            <div className='col-12 col-lg-9 container-outlet mb-3'>
                < Outlet />
            </div>
            <footer className="footer border-top border-dark-subtle border-2">
                <IconButton component={Link} to="/verts"><PersonalVideoIcon style={{ color: 'black' }} /></IconButton>
                <IconButton component={Link} to='../'><CottageIcon style={{ color: 'black' }} /></IconButton>
                {isCreator ? (<> <IconButton data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom" ><AddBoxOutlined style={{ color: 'black' }} /></IconButton></>) : (null)}
                <IconButton component={Link} to='../'><SendOutlined style={{ color: 'black' }} /></IconButton>
                <IconButton data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarMain" aria-controls="offcanvasNavbarMain" aria-label="Toggle navigation"><MenuHamburger style={{ color: 'black' }} /></IconButton>


            </footer>


            <div class="offcanvas offcanvas-bottom h-50" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasBottomLabel">Postagem</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body small">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Link className='btn btn-info text-white m-1' component={Link} to="/postverts">Verts</Link>
                        <Link className='btn btn-info text-white  m-1' component={Link} to="/postfeed">Feed</Link>
                        <Link className='btn btn-info text-white  m-1' component={Link} to="/verts">Mensagens</Link>
                    </div>
                </div>

            </div>
            <div class="offcanvas offcanvas-end w-75 border-4 border-start border-info border-opacity-75" tabindex="-1" id="offcanvasNavbarMain" aria-labelledby="offcanvasNavbarMainLabel">
                <div class="offcanvas-header">
                    <strong class="offcanvas-title justify-content-center" id="offcanvasNavbarMainLabel">Minha Conta</strong>
                    <a type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></a>
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li class="nav-item">
                            <h5><a class="nav-link active" aria-current="page" href="../"><Search style={{ color: 'black' }} className='me-2' />Procurar</a></h5>
                        </li>
                        <li class="nav-item">
                            <h5><a class="nav-link active" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarFinancas" aria-controls="offcanvasNavbarFinancas" aria-current="page" hi9><AttachMoneyIcon style={{ color: 'black' }} className='me-2' />Finanças</a></h5>
                        </li>
                        <li class="nav-item">
                            <h5><a class="nav-link active" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarMyCriminal" aria-controls="offcanvasNavbarMyCriminal" aria-current="page" hi9><ClosedCaptionOff style={{ color: 'black' }} className='me-2' />My Criminal</a></h5>
                        </li>
                        <li class="nav-item">
                            <h5><Link class="nav-link active" aria-current="page" component={Link} onClick={() => updateUrlAndReload(`/profile/${id}`)}><AccountCircleIcon style={{ color: 'black' }} className='me-2' />Perfil</Link></h5>
                        </li>
                        <li class="nav-item">
                            <h5><Link class="nav-link active" aria-current="page" onClick={() => { logoff() }} to={'./home'}><Logout style={{ color: 'black' }} className='me-2' />Sair</Link></h5>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="offcanvas offcanvas-end w-75 border-4 border-start border-info border-opacity-75" tabindex="-1" id="offcanvasNavbarMyCriminal" aria-labelledby="offcanvasNavbarMyCriminalLabel">
                <div class="offcanvas-header">
                    <strong class="offcanvas-title" id="offcanvasNavbarMyCriminal"><ClosedCaptionOff /> My Criminal</strong>
                    <a type="button" class="btn-close-white" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarMain" aria-label="Close"><ArrowBack className='text-secondary' /></a>
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li class="nav-item">
                            <h5><Link class="nav-link active" aria-current="page" to={"./seguidores"}>Seguidores</Link></h5>
                        </li>
                        <li class="nav-item">
                            <h5><Link class="nav-link active" aria-current="page" to={"./seguindo"}>Seguindo</Link></h5>
                        </li>
                        <li class="nav-item">
                            <h5><Link class="nav-link active" aria-current="page" to={"./assinantes"}>Assinantes</Link></h5>
                        </li>
                        <li class="nav-item">
                            <h5><Link class="nav-link active" aria-current="page" to={"./assinando"}>Assinando</Link></h5>
                        </li>
                        <li class="nav-item">
                            <h5><Link class="nav-link active" aria-current="page" to={"./favoritos"}>Galeria</Link></h5>
                        </li>
                        <li class="nav-item">
                            <h5><Link class="nav-link active" aria-current="page" to={"./suporte"}>Suporte CC</Link></h5>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="offcanvas offcanvas-end w-75 border-4 border-start border-info border-opacity-75" tabindex="-1" id="offcanvasNavbarFinancas" aria-labelledby="offcanvasNavbarFinancasLabel">
                <div class="offcanvas-header">
                    <strong class="offcanvas-title" id="offcanvasNavbarFinancas"><AttachMoneyIcon /> Finanças</strong>
                    <a type="button" class="btn-close-white" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarMain" aria-label="Close"><ArrowBack className='text-secondary' /></a>
                    {/* <a type="button" class="btn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarMyCriminal" aria-label="Close"></a> */}
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav flex-grow-1 pe-3">
                        <li class="nav-item">
                            <h5>
                                <Link class="nav-link active" aria-current="page" to={"./balanco"}>Balanço</Link>
                            </h5>
                        </li>
                        <li class="nav-item">
                            <h5>
                                <Link class="nav-link active" aria-current="page" to={"./compras"}>Compras</Link>
                            </h5>
                        </li>
                        <li class="nav-item">
                            <h5>
                                <Link class="nav-link active" aria-current="page" to={"./banco"}>Banco</Link>
                            </h5>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Main;
