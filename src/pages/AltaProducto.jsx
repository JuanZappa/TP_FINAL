import React, { useState } from 'react'
import '../styles/AltaProducto.css';
import { useNavigate } from 'react-router-dom'
import { addProduct } from '../services/products'

const AltaProducto = () => {
    const navigate = useNavigate();
    let productoNuevo = {
        nombre:'',
        descripcion:'',
        precioFinal:100,
        precioReal:100,
        cantidadDisponible:0,
        imagen:''
    }
    const [productoActual, setProductoActual] = useState(productoNuevo);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        let _newField = event.target.name
        let _newValue = event.target.value

        if (_newField === 'imagen') {
            setProductoActual(
                (prev_state) => {
                    return {
                        ...prev_state,
                        'imagen': event.target.files[0] //LLamamos al primer valor de la lista de adjuntados
                    }
                }
            )
        }
        else {
            setProductoActual(
                (prev_state) => {
                    return {
                        ...prev_state,
                        [_newField]: _newValue
                    }
                }
            )
        }

    }

    const getUrlImage = async (img_file) => {

        let API_KEY_IMGBB = '641e62f773fb1c3a21e0dedc656202bc'
        //https://api.imgbb.com/
        const form_data = new FormData()
        form_data.append('image', img_file)

        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${API_KEY_IMGBB}`,
            {
                method: 'POST',
                body: form_data
            }
        )
        const data = await response.json()
        return data.data.url
    }

    const handleSubmit = async (event) => {
    
        event.preventDefault()
        setLoading(true)

        const url_img = await getUrlImage(productoActual.imagen)

        await addProduct( { 
            cantidadDisponible: productoActual.cantidadDisponible,
            descripcion: productoActual.descripcion,
            imagen: url_img,
            nombre: productoActual.nombre,
            precioFinal: productoActual.precioFinal,
            precioReal: productoActual.precioReal
         })

        setProductoActual(productoNuevo)
        setLoading(false)        
        navigate('/productos');
    }

    return(
        <div className="alta-producto-container">
            <h1>Alta de producto</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        name='nombre'
                        id="nombre"
                        placeholder='Ingrese el nombre del producto...'
                        value={productoActual.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="descripcion">Descripción:</label>
                    <input
                        type="text"
                        name='descripcion'
                        id="descripcion"
                        placeholder='Ingrese la descripción del producto...'
                        value={productoActual.descripcion}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="cantidadDisponible">Cantidad inicial:</label>
                    <input
                        type="number"
                        name='cantidadDisponible'
                        id="cantidadDisponible"
                        placeholder='Ingrese el stock inicial...'
                        value={productoActual.cantidadDisponible}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="precioReal">Precio real:</label>
                    <input
                        type="number"
                        name='precioReal'
                        id="precioReal"
                        placeholder='Ingrese el precio real..'
                        value={productoActual.precioReal}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="precioFinal">Precio final:</label>
                    <input
                        type="number"
                        name='precioFinal'
                        id="precioFinal"
                        placeholder='Ingrese el precio final..'
                        value={productoActual.precioFinal}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="imagen">Seleciona una imagen:</label>
                    <input
                        type='file'
                        id='imagen'
                        name='imagen'
                        onChange={handleChange}
                    />
                </div>
                <button
                    type='submit'
                    disabled={loading}
                >
                    {loading ? "Guardando..." : 'Guardar'}

                </button>

            </form>
        </div>        
    )
}

export default AltaProducto