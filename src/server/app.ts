// Dependencias
import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import { engine } from 'express-handlebars';

// Keys
import { PROYECT_DIR } from './config/keys.config';
import path from "path";

// Instancias
const app = express();

// Configuraciones
app.set('PORT', 3000);
app.set('view engine', '.hbs');
app.set('views', path.join(PROYECT_DIR, 'views'));
app.engine('.hbs',engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials')
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

// Archivos Staticos
app.use(express.static(path.join(PROYECT_DIR, 'public')));

// Rutas
app.get('/', (_, res) => {
  res.render('home');
});

// Exportación del Modulo
export default app;