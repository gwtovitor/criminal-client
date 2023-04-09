
import axios from "axios";
//movie/now_playing?api_key=980196655890f6d6fdf431e6de80a2e3&language=pt-BR
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})
export default api