import { Link } from "react-router-dom";
import './error.css'
function Error() {
 
    return (
      <div className="not-found">
        <h1> Erro 404</h1>
        <h2>Pagina não encontrada</h2>
        <Link to='/'>Veja todos os Filmes!</Link>
    </div>
    );
  }
  
  export default Error;
  