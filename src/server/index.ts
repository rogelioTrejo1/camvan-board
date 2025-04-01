import app from './app';

/**
 * 
 */
(() => {
  // Inicializacion de la aplicación
  app.listen(app.get('PORT'));
  console.log(`Server on port ${app.get('PORT')}`);
})(); 