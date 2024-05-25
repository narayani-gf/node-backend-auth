const express = require('express')
const cors = require("cors");
const dotenv = require('dotenv')
const app = express()

// Swagger
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')

// Primero carga la configuración del archivo .env
// para que esté disponible en las demás llamadas
dotenv.config();

// Se requiere para entender los datos recibidos en JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cors
var corsOptions = {
    origin: ["http://localhost:3001", "http://localhost:8080"],
    methods: "GET,PUT,POST,DELETE",
};
app.use(cors(corsOptions));

// Swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Rutas
app.use("/api/categorias", require('./routes/categorias.routes'))
app.use("/api/peliculas", require('./routes/peliculas.routes'))
app.use("/api/usuarios", require('./routes/usuarios.routes'))
app.use("/api/roles", require('./routes/roles.routes'))
app.use("/api/auth", require('./routes/auth.routes'))
app.get('*', (req, res) => { res.status(404).send() });

// Middleware para el manejo de errores (Debe ser el último middleware a utilizar)
const errorLogger = require('./middlewares/errorlogger.middleware')
const errorHandler = require('./middlewares/errorhandler.middleware')
app.use(errorLogger, errorHandler)

// Inicia el servidor web en el puerto SERVER_PORT
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Aplicacion de ejemplo escuchando en el puerto ${process.env.SERVER_PORT}`)
})