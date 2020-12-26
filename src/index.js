//npm install express mongoose
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb://localhost/menv-database')
    .then(db => console.log('DB is conected'))
    .catch(err => console.error(err));

//Settings
app.set('port', process.env.PORT || 4000);

//Middlewares : npm i morgan 
//Funciones que te ayudan a procesar antes de que lleguen las URL
app.use(morgan('dev'));
app.use(express.json());

//Routes
//Aqui mandamos a llamar las rutas de la carpeta routes
//El primer valor lo va a concatenar en lo que hayamos puesto en la ruta del archivo que estemos mandando a usar
app.use('/tasks', require('./routes/tasks'));

//Static files
//console.log(__dirname)
app.use(express.static(__dirname + '/public'))

//Server is listening on...
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})