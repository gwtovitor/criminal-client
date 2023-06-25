import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/home'
import Login from './Pages/Logincriador/login'
import Loginfa from './Pages/Loginfa/loginfa'
import Signfa from './Pages/Signfa/signfa'
import Signcriador from './Pages/Signcriador/signcriador'
import Feed from './Pages/Feed/feed'
import Financas from './Pages/Financas';
import Seguindo from './Pages/MyCriminal/Seguindo'
import Seguidores from './Pages/MyCriminal/Seguidores'
import Bloqueados from './Pages/MyCriminal/Bloqueados'
import Assinado from './Pages/MyCriminal/Assinado'
import Assinantes from './Pages/MyCriminal/Assinantes'
import Compras from './Pages/Financas/Compras';
import Balanco from './Pages/Financas/Balanco';
import Banco from './Pages/Financas/Banco'
import Main from './Pages/Main/main'
import Verts from './Pages/Verts/verts'
import Mensagens from './Pages/Mensagens/mensagens'
import Profile from './Pages/Profile/profile'
import Postfeed from './Pages/Postfeed'
import Postverts from './Pages/Postverts'
import PostMsg from './Pages/PostMsg'
import Suporte from './Pages/Suporte'
import MyGallery from './Pages/Galeria'
import NivelConta from './Pages/Financas/Nivelconta'
import Arquivados from './Pages/Arquivados'
import Pesquisa from './Pages/Pesquisa'
import EnvioDocs from './Pages/Signcriador/envioDocs/envioDocs'
import UserDocs from './Pages/AdminPages/UserDocs'

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/loginfa' element={<Loginfa />} />
                <Route path='/signfa' element={<Signfa />} />
                <Route path='/signcriador' element={<Signcriador />} />
                <Route path='/enviodocs' element={<EnvioDocs />} />


                <Route path='/' element={<Main />}>
                    <Route path='/userDocs' element={<UserDocs />} />
                    <Route index element={<Feed />} />
                    <Route path='/compras' element={<Compras />} />
                    <Route path='/balanco' element={<Balanco />} />
                    <Route path='/nivel' element={<NivelConta />} />
                    <Route path='/banco' element={<Banco />} />
                    <Route path='/verts' element={<Verts />} />
                    <Route path='/mensagens' element={<Mensagens />} />
                    <Route path='/assinando' element={<Assinado />} />
                    <Route path='/assinantes' element={<Assinantes />} />
                    <Route path='/seguindo' element={<Seguindo />} />
                    <Route path='/seguidores' element={<Seguidores />} />
                    <Route path='/bloqueados' element={<Bloqueados />} />
                    <Route path='/postfeed' element={<Postfeed />} />
                    <Route path='/postverts' element={<Postverts />} />
                    <Route path='/postmsg' element={<PostMsg />} />
                    <Route path='/suporte' element={<Suporte />} />
                    <Route path='/arquivados' element={<Arquivados />} />
                    <Route path='/favoritos' element={<MyGallery />} />
                    <Route path='/profile/:id' element={<Profile />} />
                    <Route path='/pesquisa' element={<Pesquisa />} />

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp