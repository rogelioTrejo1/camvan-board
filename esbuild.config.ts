// Dependencias 
import {
  build,
  SameShape,
  BuildOptions,
  context
} from 'esbuild';
import cssModulePlugin from 'esbuild-css-modules-plugin';
import chokidar from 'chokidar';
import { WebSocketServer } from 'ws';

// Tipos e Interfaces 
enum Envaromments {
  PRODUCCTION = 'prod',
  DEVELOMENT = 'dev',
  TEST = 'biz'
}

// Configuraciones de entornos
const {
  NODE_ENV,
} = process.env;
const IS_PRODUCTION = NODE_ENV === Envaromments.PRODUCCTION;

// Configuraciones de Esbuild
const isWatchProcess = process.argv.includes('--watch');
const esbuildConfig: SameShape<BuildOptions, BuildOptions> = {
  entryPoints: ['./src/client/index.ts'],
  bundle: true,
  outfile: './public/assets/app.js',
  platform: 'browser',
  target: ['es6'],
  sourcemap: !IS_PRODUCTION,
  minify: IS_PRODUCTION,
  tsconfig: './tsconfig.client.json',
  plugins: [cssModulePlugin()],
  loader: {
    '.woff': 'file',
    '.woff2': 'file',
    '.ttf': 'file',
    '.eot': 'file',
    '.svg': 'file'
  },
};

const wss = new WebSocketServer({ port: 35729 });
wss.on('connection', () => {
  console.log('⚡ Cliente conectado para recarga automática');
});

/**
 * Ejecución de compilación de archivos estaticos
 */
(async () => {
  try {
    if (!isWatchProcess) 
      return await build(esbuildConfig)
        .catch(error => {
          console.error(error);
          process.exit(1);
        });

    const cxt = await context(esbuildConfig);
    await cxt.watch();

    console.log('Watching for changes...');

    chokidar.watch('./public/assets/')
      .on('change', (path) => {
        console.log(`🔄 Cambio detectado en ${path}, notificando a clientes...`);
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send('reload');
          }
        });
      });
  } catch (e) {
    console.error(e);
  }
})();
