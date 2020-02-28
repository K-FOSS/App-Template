// Web/service-worker.ts
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

registerRoute(/\.js$/, new NetworkFirst());
