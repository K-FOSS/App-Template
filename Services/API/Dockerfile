FROM node:alpine3.11 as builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json tsconfig.build.json ./
COPY ./src ./src

ENV NODE_ENV=production
RUN npm run build




FROM node:alpine3.11 as dep-fetcher
WORKDIR /app
COPY package.json package-lock.json ./

ENV NODE_ENV=production
RUN npm ci --prod




FROM node:alpine3.11
WORKDIR /app
ENV NODE_ENV=production

COPY --from=dep-fetcher /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/
COPY ./extra/findFiles.js /app/node_modules/@k-foss/ts-esnode/out/dist/findFiles.js

ENTRYPOINT [ "node" ]
CMD ["--loader", "@k-foss/ts-esnode", "--experimental-modules", "--experimental-specifier-resolution=node", "--harmony-top-level-await", "/app/dist/index.js"]