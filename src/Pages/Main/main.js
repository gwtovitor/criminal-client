import React from 'react';
import './main.css';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import CottageIcon from '@mui/icons-material/Cottage';
import SendIcon from '@mui/icons-material/Send';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { redirect } from 'next/dist/server/api-utils';
import { ClosedCaptionOff } from '@mui/icons-material';

function Main() {

    return (
        <div className='row'>
            <div className='col col-lg-3'>
                <div className='navlateral'>
                    <Sidebar className='navbarside-feed'>
                        <Menu>
                            <MenuItem onClick={() => {
                                window.location.href = './verts'
                            }} icon={<PersonalVideoIcon />}> Verts</MenuItem>
                            <MenuItem onClick={() => {
                                window.location.href = '../'
                            }} icon={<CottageIcon />}>Feed</MenuItem>
                            <MenuItem onClick={() => {
                                window.location.href = '#'
                            }} icon={<SendIcon />}>Menssagens</MenuItem>

                            <SubMenu icon={<AttachMoneyIcon />} label="Finanças">
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
                            <SubMenu icon={<ClosedCaptionOff />} label="My Criminal">
                                <MenuItem onClick={() => {
                                    window.location.href = './seguidores'
                                }}> Seguidores </MenuItem>
                                <MenuItem onClick={() => {
                                    window.location.href = './seguindo'
                                }}> Seguindo</MenuItem>
                                <MenuItem onClick={() => {
                                    window.location.href = './assinantes'
                                }}> Assinantes</MenuItem>
                                <MenuItem onClick={() => {
                                    window.location.href = './assinando'
                                }}> Assinando</MenuItem>
                                <MenuItem onClick={() => {
                                    window.location.href = './favoritos'
                                }}> Galeria</MenuItem>
                                <MenuItem onClick={() => {
                                    window.location.href = './Perfil'
                                }}> Perfil</MenuItem>
                            </SubMenu>
                        </Menu>
                    </Sidebar>

                </div>
            </div>
            <div className='col-12 col-lg-9 container-outlet mb-3'>
                < Outlet />
            </div>
            <footer className="footer border-top border-dark-subtle border-2">
                <IconButton onClick={() => { window.location.href = './verts' }}><PersonalVideoIcon /></IconButton>
                <IconButton onClick={() => { window.location.href = '../' }}><CottageIcon /></IconButton>
                <IconButton><SendIcon /></IconButton>
                <IconButton data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarFinancas" aria-controls="offcanvasNavbarFinancas" aria-label="Toggle navigation"><AttachMoneyIcon /></IconButton>
                <IconButton data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarMyCriminal" aria-controls="offcanvasNavbarMyCriminal" aria-label="Toggle navigation"><ClosedCaptionOff /></IconButton>
            </footer>

            <div class="offcanvas offcanvas-end w-75 border-4 border-start border-info border-opacity-75" tabindex="-1" id="offcanvasNavbarMyCriminal" aria-labelledby="offcanvasNavbarMyCriminalLabel">
                <div class="offcanvas-header">
                    <strong class="offcanvas-title justify-content-center" id="offcanvasNavbarMyCriminalLabel"><ClosedCaptionOff /> My Criminal</strong>
                    <a type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></a>
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
                            <h5><a class="nav-link active" aria-current="page" href="../">Perfil</a></h5>
                        </li>
                        <li class="nav-item">
                            <h5><a class="nav-link active" aria-current="page" href="./home">Sair</a></h5>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="offcanvas offcanvas-end w-75 border-4 border-start border-info border-opacity-75" tabindex="-1" id="offcanvasNavbarFinancas" aria-labelledby="offcanvasNavbarFinancasLabel">
                <div class="offcanvas-header">
                    <strong class="offcanvas-title" id="offcanvasNavbarFinancas"><AttachMoneyIcon /> Finanças</strong>
                    <a type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></a>
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
