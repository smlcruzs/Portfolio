FROM node:20-alpine AS frontend-builder

WORKDIR /web

COPY web/package*.json ./

RUN npm install

COPY web/ .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY api/package*.json ./

RUN npm install --production

COPY api/ .

COPY --from=frontend-builder /web/dist ./web/dist

EXPOSE 3001

CMD ["node", "src/server.js"]