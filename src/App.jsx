import '../my-bulma-project.scss'
import Navbar from './features/Navbar/Navbar'
import { useProducts } from './hooks/useProducts'

function App() {
  
  const { products, loading, error } = useProducts();

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error al cargar los productos: {error.message}</div>;
  

  return (
    <>
     <Navbar />
    </>
  )
}

export default App
