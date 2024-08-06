import { useState } from 'react';
import './App.css';

const initialState = {
  nombre: '',
  apellido: '',
  cedula: '',
  direccion: '',
  telefono: '',
  correo: '',
  ingresoMensual: '',
  montoPrestamo: '',
  plazoPrestamo: ''
};

const fieldTypes = {
  nombre: 'text',
  apellido: 'text',
  cedula: 'text',
  direccion: 'text',
  telefono: 'tel',
  correo: 'email',
  ingresoMensual: 'number',
  montoPrestamo: 'number',
  plazoPrestamo: 'text'
};

function App() {
  const [formData, setFormData] = useState(initialState);
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5001', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResponse(data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='App'>
      <h1>Formulario de solicitud de préstamo</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((nombreInput, idx) => (
          <div key={idx}>
            <label htmlFor={nombreInput}>{nombreInput}</label>
            <input
              type={fieldTypes[nombreInput]}
              name={nombreInput}
              id={nombreInput}
              value={formData[nombreInput]}
              onChange={(e) => setFormData({ ...formData, [nombreInput]: e.target.value })}
            />
          </div>
        ))}
        <input type="submit" />
      </form>
      {response && <p>Respuesta del servidor: {response}</p>}
    </div>
  );
}

export default App;