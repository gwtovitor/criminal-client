import RoutesApp from "./routes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
    <ToastContainer autoClose={3000}></ToastContainer>
    <RoutesApp/>
    </> 
  );
}

export default App;
