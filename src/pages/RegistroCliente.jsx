import { useEffect, useState } from 'react';
import '../styles/RegistroCliente.css';

const RegistroCliente = () => {
    const [form_values_state, setFormValuesState] = useState()
    const [error, setError] = useState('');

    const fields = {
        USUARIO: 'usuario',
        PASSWORD: 'password',
        REPITE_PASSWORD: 'repite_password',
        EMAIL: 'email',
        NOMBRE_COMPLETO: 'nombre_completo',
        DOCUMENTO: 'documento'
      }

      useEffect(() => {
        setError('');
      }, []);

      const handleSubmit = (e) => {
        e.preventDefault();
        const form_data = new FormData(e.target)
        const form_values = {}

        for(let field in fields){
        form_values[fields[field]] = form_data.get(fields[field])
        }
        setFormValuesState(form_values)
        if (!form_values.usuario || !form_values.password || !form_values.repite_password || !form_values.email || !form_values.nombre_completo || !form_values.documento) {
            setError('Los campos son obligatorios');
            return;
          }
          setError('');
          alert('El usuario ' + form_values.usuario + 'fue registrado correctamente, y su documento es: ' + form_values.documento);
      };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>Registro de nuevos clientes</h2>
            <div>
                <label htmlFor='usuario'>Usuario:</label>
                <input type='text' placeholder='Ingrese el usuario' id='usuario' name={fields.USUARIO} />
            </div>
            <div>
                <label htmlFor='password'>Contraseña:</label>
                <input type="password" placeholder='Ingrese la contraseña' id='password' name={fields.PASSWORD} />
            </div>
            <div>
                <label htmlFor='repite_password'>Reingrese la contraseña:</label>
                <input type="password" placeholder='Reingrese la contraseña' id='repite_password' name={fields.REPITE_PASSWORD} />
            </div>
            <div>
                <label htmlFor='email'>Email:</label>
                <input type='text' placeholder='Ingrese el correo electronico' id='email' name={fields.EMAIL} />
            </div>
            <div>
                <label htmlFor='nombre_completo'>Nombre completo:</label>
                <input type='text' placeholder='Ingrese el nombre completo' id='nombre_completo' name={fields.NOMBRE_COMPLETO} />
            </div>
            <div>
                <label htmlFor='documento'>Documento:</label>
                <input type='text' placeholder='Ingrese el número de documento' id='documento' name={fields.DOCUMENTO} />
            </div>
            <button type="submit">Registrar</button>
            {error && <p className="error">{error}</p>}
        </form>
    );
}

export default RegistroCliente