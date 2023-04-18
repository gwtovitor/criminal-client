import RoutesApp from "./routes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProSidebarProvider } from 'react-pro-sidebar';

function App() {
  return (
    <>
    <ProSidebarProvider>
    <ToastContainer autoClose={3000}></ToastContainer>
    <RoutesApp/>
    </ProSidebarProvider>
    </>       
  );
}

export default App;
