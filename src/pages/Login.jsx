
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

function Login() {
  const [form_values_state, setFormValuesState] = useState()

  const fields = {
    USUARIO: 'usuario',
    PASSWORD: 'password'
  }
  
  const [error, setError] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

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

    if (!form_values.usuario || !form_values.password) {
      setError('Ambos campos son obligatorios');
      return;
    }
    const success = auth.login(form_values[fields.USUARIO], form_values[fields.PASSWORD]);
    if (success) {
      navigate('/productos');
    } else {
      setError('Credenciales inválidas');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Iniciar sesión</h2>
      <div>
        <label htmlFor='usuario'>Usuario:</label>
        <input type='text' placeholder='Ingrese el usuario' id='usuario' name={fields.USUARIO} />
      </div>
      <div>
        <label htmlFor='password'>Contraseña:</label>
        <input type="password" id='password' name={fields.PASSWORD} />
      </div>
      <button type="submit">Ingresar</button>
      <div className="register-link">
        <a href="/register">¿No tienes una cuenta? Regístrate</a>
      </div>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default Login;
