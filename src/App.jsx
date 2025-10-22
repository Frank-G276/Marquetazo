import '../my-bulma-project.scss'
import Home from './features/home/Home';
import Navbar from './features/navbar/Navbar';
import { useProducts } from './hooks/useProducts'

function App() {
  
  const { products, loading, error } = useProducts();

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error al cargar los productos: {error.message}</div>;
  

  return (
    <>
     <Navbar />
     <Home />
    </>
  )
}

export default App
