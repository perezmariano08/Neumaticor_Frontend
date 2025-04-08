import { useEffect } from "react"
import Routes from "./routes/Routes"
import { useDispatch, useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient(); // Crear una nueva instancia de QueryClient

function App() {
   
   const dispatch = useDispatch()
   const hiddenCart = useSelector((state) => state.cart.hidden)
   const hiddenMenu = useSelector((state) => state.menu.hidden)
   useEffect(() => {
      if (!hiddenCart) {
         document.body.classList.add('no-scroll');
      } else {
         document.body.classList.remove('no-scroll');
      }
   }, [hiddenCart]);
   useEffect(() => {
      if (!hiddenMenu) {
         document.body.classList.add('no-scroll');
      } else {
         document.body.classList.remove('no-scroll');
      }
   }, [hiddenMenu]);
   
   return (
      <QueryClientProvider client={queryClient}>
         <Routes/>
      </QueryClientProvider>
   )
}

export default App
