const mongoose = require('mongoose')
const express = require('express');
const cors = require('cors');

/////////////// ESTRUCURA DEL MODELO ///////////////
const app = express();
const port = 5001;

const prestamoSchema = new mongoose.Schema({
  nombre: {type: String, required: true},
  apellido: {type: String, required: true},
  cedula: {type: String, required: true},
  direccion: {type: String, required: true},
  telefono: {type: Number, required: true},
  correo: {type: String, required: true},
  ingresoMensual: {type: Number, required: true},
  montoPrestamo: {type: String, required: true},
  plazoPrestamo: {type: String, required: true}
})

/////////////// MODELO ///////////////
const Prestamo = mongoose.model('Prestamo', prestamoSchema)

app.use(cors());
app.use(express.json());


app.post('/', async (req, res) => {
  const formData = req.body;
  
  try {
    const nuevoPrestamo = new Prestamo(formData);
    await nuevoPrestamo.save();
    res.json({ message: 'Datos guardados correctamente' });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    res.status(500).json({ message: 'Error al guardar los datos' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

///comentario 