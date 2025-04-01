// Styles
import './styles/app.css';

// Routes
import ROUTES from './routes';

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

      modulo.main();
  } catch (error) {
    
  }
})();


