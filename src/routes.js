import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Pages/Home'
import Filme from './Pages/Filmes'
import Header from './Header'
import Error from './Pages/Error'
import Lista from './Pages/Lista'
function RoutesApp(){
    return(
        <BrowserRouter>
        <Header></Header>
            <Routes>
                <Route path='/' element={<Home/>}/>     
                <Route path='/filme/:id' element={<Filme/>}/>
                <Route path='/favoritos' element={<Lista/>}/>
                <Route path='*' element={<Error/>}/>                       
            </Routes>
        </BrowserRouter>
    )

}
export default RoutesApp