// Server/Library/Manifest.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';

export async function handleManifestRoute(
  request: FastifyRequest,
  reply: FastifyReply<ServerResponse>,
): Promise<object> {
  reply.type('application/json');

  const manifest = {
    short_name: 'app-template',
    name: 'app-template',
    display: 'standalone',
    icons: [
      {
        src:
          'https://www.shareicon.net/data/512x512/2016/07/10/119930_google_512x512.png',
        type: 'image/png',
        sizes: '512x512',
      },
    ],
    start_url: '/',
    background_color: '#fff',
    theme_color: '#3f51b5',
  };

  return manifest;
}
