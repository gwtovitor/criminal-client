import './filmes.css'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../Services/api';
import { ToastContainer, toast } from 'react-toastify';

function Filme() {
  const {id} = useParams();
  const navigation = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
      async function loadFilme(){
         await api.get(`/movie/${id}`, {
          params:{
            api_key: "980196655890f6d6fdf431e6de80a2e3",
            language: "pt-BR",
          }
         })
         .then((response)=>{
          setFilme(response.data);
          setLoading(false);
         }).catch(()=>{
          navigation('/', {replace: true})
          return
         })
      }
      loadFilme();

      return ()=>{
        console.log('comp desm')
      }
  }, [navigation, id])

function salvarFilme(){
    const minhaLista = localStorage.getItem("@primeflix");
    let filmesSalvos = JSON.parse(minhaLista) || [];
    const hasFilme = filmesSalvos.some((filmesSalvo)=> 
        filmesSalvo.id === filme.id
    )
    if(hasFilme){

      toast.error('Filme ja está na lista')
      return
    }
    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));

    toast.success('Filme Salvo')
}

  if(loading){
    return(
      <div className='filme-loading'>
          <div className="spinner-border" role="status">
                <span className="sr-only"></span> 
          </div>
      </div>
    )
  }
  return (
    <div className='filme-info'>
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} /10</strong>
      <div className='area-buttons'>
        <button onClick={salvarFilme}>Salvar</button>
        <button><a target='blank' href={`https://youtube.com/results?search_query=${filme.title} Trailer+Dublado`}> Trailer</a></button>
      </div>
    </div>
    
  );
}

export default Filme;
