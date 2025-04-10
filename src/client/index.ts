// Styles
import './styles/app.css';

// Routes
import ROUTES from './routes';

// Config
import { NODE_ENV } from './config/keys.config';


// Variables
const CURRENT_PATH = location.pathname;

(async () => {
  try {
    const machedRoute = Object
      .keys(ROUTES)
      .find(pattern => new RegExp(pattern).test(CURRENT_PATH));

      if (!machedRoute) return;

      const [modulo] = await Promise.all([
        ROUTES[machedRoute]()
      ]);

      // Importación del modulo de desarrollo
      if (NODE_ENV === 'dev') await import('./socket');

      modulo.main();
  } catch (error) {
    
  }
})();


