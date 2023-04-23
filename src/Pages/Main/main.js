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
                            <MenuItem icon={<ClosedCaptionOff />}>My Criminal</MenuItem>

                        </Menu>
                    </Sidebar>

                </div>
            </div>
            <div className='col-12 col-lg-9 container-outlet mb-3'>
                < Outlet />
            </div>
            <footer className="footer">
                <IconButton><PersonalVideoIcon /></IconButton>
                <IconButton onClick={() => { console.log('oi') }}><CottageIcon /></IconButton>
                <IconButton><SendIcon /></IconButton>
                <IconButton><AttachMoneyIcon /></IconButton>
                <IconButton><ClosedCaptionOff /></IconButton>
            </footer>

        </div>
    );
}

export default Main;
