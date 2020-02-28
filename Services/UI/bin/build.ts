// bin/build.ts
import { buildWeb, buildServer } from './Library/builder';

Promise.all([buildWeb(false), buildServer(false)]);
