// bin/watch.ts
import { buildWeb, buildServer } from './Library/builder';

Promise.all([buildWeb(true), buildServer(true)]);
