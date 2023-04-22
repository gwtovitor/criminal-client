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

function Main() {

    return (
        <div className='row'>
            <div className='col-1 col-sm-1 col-lg-3'>
                <div className='navlateral'>
                    <Sidebar className='navbarside-feed'>
                        <Menu>
                            <MenuItem onClick={() => {
                                ;
                            }} icon={<PersonalVideoIcon />}>Verts</MenuItem>
                            <MenuItem icon={<CottageIcon />}>Feed</MenuItem>
                            <MenuItem icon={<SendIcon />}>Menssagens</MenuItem>

                            <SubMenu icon={<AttachMoneyIcon/>} label="My Criminal">
                                <MenuItem> Finanças </MenuItem>
                                <MenuItem> Inscrições</MenuItem>
                            </SubMenu>
                            <MenuItem icon={<AccountCircleIcon />}>Perfil</MenuItem>

                        </Menu>
                    </Sidebar>

                </div>
            </div>
            <div className='container-outlet'>
                < Outlet />
            </div>
            <footer className="footer">
                <IconButton><PersonalVideoIcon /></IconButton>
                <IconButton onClick={() => { console.log('oi') }}><CottageIcon /></IconButton>
                <IconButton><SendIcon /></IconButton>
                <IconButton><AttachMoneyIcon /></IconButton>
                <IconButton><AccountCircleIcon /></IconButton>
            </footer>

        </div>
    );
}

export default Main;
