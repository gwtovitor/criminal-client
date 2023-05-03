import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/home'
import Login from './Pages/Logincriador/login'
import Loginfa from './Pages/Loginfa/loginfa'
import Signfa from './Pages/Signfa/signfa'
import Signcriador from './Pages/Signcriador/signcriador'
import DadosBancarios from './Pages/Signcriador/dadosbancarios'
import Feed from './Pages/Feed/feed'
import Financas from './Pages/Financas';
import MyCriminal from './Pages/MyCriminal';
import Compras from './Pages/Financas/Compras';
import Balanco from './Pages/Financas/Balanco';
import Banco from './Pages/Financas/Banco'
import Main from './Pages/Main/main'
import Verts from './Pages/Verts/verts'
import Mensagens from './Pages/Mensagens/mensagens'
import Profile from './Pages/Profile/profile'
import Profilefa from './Pages/ProfileFa/profilefa'
import Postfeed from './Pages/Postfeed'
import Postverts from './Pages/Postverts'

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/loginfa' element={<Loginfa />} />
                <Route path='/signfa' element={<Signfa />} />
                <Route path='/signcriador' element={<Signcriador />} />
                <Route path='/signcriador/dados' element={<DadosBancarios />} />
                <Route path='/' element={<Main />}>
                    <Route index element={<Feed />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/profilefa' element={<Profilefa />} />
                    <Route path='/compras' element={<Compras />} />
                    <Route path='/balanco' element={<Balanco />} />
                    <Route path='/banco' element={<Banco />} />
                    <Route path='/verts' element={<Verts />} />
                    <Route path='/mensagens' element={<Mensagens />} />
                    <Route path='/assinando' element={<MyCriminal page='Assinando' />} />
                    <Route path='/assinantes' element={<MyCriminal page='Assinantes' />} />
                    <Route path='/seguindo' element={<MyCriminal page='Seguindo' />} />
                    <Route path='/seguidores' element={<MyCriminal page='Seguidores' />} />
                    <Route path='/favoritos' element={<MyCriminal page='Favoritos' />} />
                    <Route path='/bloqueados' element={<MyCriminal page='Bloqueados' />} />
                    <Route path='/postfeed' element={<Postfeed />} />
                    <Route path='/postverts' element={<Postverts />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp