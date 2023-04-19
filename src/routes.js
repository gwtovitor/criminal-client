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

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path='/' element={<Home />} />*/}
                <Route path='/login' element={<Login />} />
                <Route path='/loginfa' element={<Loginfa />} />
                <Route path='/signfa' element={<Signfa />} />
                <Route path='/signcriador' element={<Signcriador />} />
                <Route path='/signcriador/dados' element={<DadosBancarios />} />
                <Route path='/' element={<Main />}>
                    <Route index element={<Feed />} />
                    <Route path='/compras' element={<Compras />} />
                    <Route path='/balanco' element={<Balanco />} />
                    <Route path='/banco' element={<Banco />} />
                    <Route path='/mycriminal' element={<MyCriminal />} />
                    <Route path='/verts' element={<Verts />} />
                    
                </Route>
                {/* <Route path='/financas' element={<Financas />} > */}
                {/* </Route> */}
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp