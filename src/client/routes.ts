const ROUTES: Routes = {
  '^/$': () => import('./pages/home')
}

export default ROUTES;

// Definición de tipos e interfaces
type Routes = {
  [key: string]: () => Promise<{ main: () => void }>
};