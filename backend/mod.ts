import webLayer from './presentation/web/index.ts';
import { config } from './config.ts';

const layer = await webLayer(config);

layer.start();

Deno.addSignalListener('SIGINT', () => {
  layer.stop();
  console.warn('Process terminated: SIGINT');
  Deno.exit(0);
});

Deno.addSignalListener('SIGTERM', () => {
  layer.stop();
  console.warn('Process terminated: SIGTERM');
  Deno.exit(1);
});
