// Dependencias
import path from 'node:path';

// Exportacion de Variables de entorno
export const PROYECT_DIR = path.resolve(path.join(__dirname, '..', '..', '..'));
export const PORT = +process.env.PORT!;