import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/home';
import Financas from './Pages/Financas';
import MyCriminal from './Pages/MyCriminal';

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/financas' element={<Financas />} />
                <Route path='/mycriminal' element={<MyCriminal />} />
            </Routes>
        </BrowserRouter>
    )

}
export default RoutesApp