import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register  from "./pages/Register";
import ProductosLista from "./components/ProductosLista"; // Asegurate de la ruta correcta
import ProductoDetalle from "./components/ProductoDetalle";
import AltaProducto from "./pages/AltaProducto";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/productos" element={<ProductosLista />} />
        <Route path="/productos/:id" element={<ProductoDetalle />} />
        <Route path="/altaProducto" element={<AltaProducto />} />
      </Routes>
  );
}

export default App;
