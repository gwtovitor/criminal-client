import React, { useState } from 'react';
import './main.css';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import CottageIcon from '@mui/icons-material/Cottage';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { ClosedCaptionOff, Logout, Search, Menu as MenuHamburger, AddBoxOutlined } from '@mui/icons-material';
import { ArrowBack } from '@mui/icons-material';
import { Send } from '@mui/icons-material';
import { SendOutlined } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';

function Main() {

    return (
        <div className='row'>
            <div className='col col-lg-3'>
                <div className='navlateral'>
                    <Sidebar className='navbarside-feed'>
                        <Menu>
                            <MenuItem onClick={() => {
                                window.location.href = './verts'
                            }} icon={<PersonalVideoIcon style={{ color: 'black' }} />}> Verts</MenuItem>
                            <MenuItem onClick={() => {
                                window.location.href = '../'
                            }} icon={<HomeIcon style={{ color: 'black' }} />}>Feed</MenuItem>
                            <MenuItem onClick={() => {
                                window.location.href = './mensagens'
                            }} icon={<Send style={{ color: 'black' }} />}>Mensagens</MenuItem>
                            <SubMenu icon={<AddBoxOutlined style={{ color: 'black' }} />} label="Publicar">
                                <MenuItem onClick={() => {
                                    window.location.href = './postfeed'
                                }}> Feed </MenuItem>
                                <MenuItem onClick={() => {
                                    window.location.href = './postverts'
                                }}> Verts</MenuItem>
                                <MenuItem onClick={() => {
                                    window.location.href = './postmsg'
                                }}>Mensagens</MenuItem>
                            </SubMenu>
                            <SubMenu icon={<AttachMoneyIcon style={{ color: 'black' }} />} label="Finanças">
                                <MenuItem onClick={() => {
                                    window.location.href = './balanco'
                                }}> Balanço </MenuItem>
                                <MenuItem onClick={() => {
                                    window.location.href = './compras'
                                }}> Compras</MenuItem>
                                <MenuItem onClick={() => {
                                    window.location.href = './banco'
                                }}> Banco</MenuItem>
                            </SubMenu>
                            <SubMenu icon={<ClosedCaptionOff style={{ color: 'black' }} />} label="My Criminal" className="scrollable-submenu">
                                <MenuItem onClick={() => { window.location.href = './seguidores'; }}>Seguidores</MenuItem>
                                <MenuItem onClick={() => { window.location.href = './seguindo'; }}>Seguindo</MenuItem>
                                <MenuItem onClick={() => { window.location.href = './assinantes'; }}>Assinantes</MenuItem>
                                <MenuItem onClick={() => { window.location.href = './assinando'; }}>Assinando</MenuItem>
                                <MenuItem onClick={() => { window.location.href = './favoritos'; }}>Galeria</MenuItem>
                                <MenuItem onClick={() => { window.location.href = './profile'; }}>Perfil</MenuItem>
                                <MenuItem onClick={() => { window.location.href = './suporte'; }}>Suporte CC</MenuItem>
                            </SubMenu>



                        </Menu>
                    </Sidebar>

                </div>
            </div>
            <div className='col-12 col-lg-9 container-outlet mb-3'>
                < Outlet />
            </div>
            <footer className="footer border-top border-dark-subtle border-2">
                <IconButton onClick={() => { window.location.href = './verts' }}><PersonalVideoIcon style={{ color: 'black' }} /></IconButton>
                <IconButton onClick={() => { window.location.href = '../' }}><CottageIcon style={{ color: 'black' }} /></IconButton>
                <IconButton data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom" ><AddBoxOutlined style={{ color: 'black' }} /></IconButton>
                <IconButton onClick={() => { window.location.href = '../' }}><SendOutlined style={{ color: 'black' }} /></IconButton>
                <IconButton data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarMain" aria-controls="offcanvasNavbarMain" aria-label="Toggle navigation"><MenuHamburger style={{ color: 'black' }} /></IconButton>


            </footer>


            <div class="offcanvas offcanvas-bottom h-50" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasBottomLabel">Postagem</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body small">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <a className='btn btn-info text-white m-1' onClick={() => { window.location.href = './postverts' }}>Verts</a>
                        <a className='btn btn-info text-white  m-1' onClick={() => { window.location.href = './postfeed' }}>Feed</a>
                        <a className='btn btn-info text-white  m-1' onClick={() => { window.location.href = './verts' }}>Mensagens</a>
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
                            <h5><a class="nav-link active" aria-current="page" href="./profile"><AccountCircleIcon style={{ color: 'black' }} className='me-2' />Perfil</a></h5>
                        </li>
                        <li class="nav-item">
                            <h5><a class="nav-link active" aria-current="page" href="./home"><Logout style={{ color: 'black' }} className='me-2' />Sair</a></h5>
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
                            <h5><a class="nav-link active" aria-current="page" href="./seguidores">Seguidores</a></h5>
                        </li>
                        <li class="nav-item">
                            <h5><a class="nav-link active" aria-current="page" href="./seguindo">Seguindo</a></h5>
                        </li>
                        <li class="nav-item">
                            <h5><a class="nav-link active" aria-current="page" href="./assinantes">Assinantes</a></h5>
                        </li>
                        <li class="nav-item">
                            <h5><a class="nav-link active" aria-current="page" href="./assinando">Assinando</a></h5>
                        </li>
                        <li class="nav-item">
                            <h5><a class="nav-link active" aria-current="page" href="./favoritos">Galeria</a></h5>
                        </li>
                        <li class="nav-item">
                            <h5><a class="nav-link active" aria-current="page" href="./suporte">Suporte CC</a></h5>
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
                                <a class="nav-link active" aria-current="page" href="./balanco">Balanço</a>
                            </h5>
                        </li>
                        <li class="nav-item">
                            <h5>
                                <a class="nav-link active" aria-current="page" href="./compras">Compras</a>
                            </h5>
                        </li>
                        <li class="nav-item">
                            <h5>
                                <a class="nav-link active" aria-current="page" href="./banco">Banco</a>
                            </h5>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Main;
