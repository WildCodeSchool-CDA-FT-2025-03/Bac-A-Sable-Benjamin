FROM node:22-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:22-alpine

RUN apk add --no-cache git github-cli

WORKDIR /app

COPY package*.json ./

RUN npm ci --production

COPY --from=build /app/dist ./dist
COPY --from=build /app/public ./public

COPY ./routes ./routes
COPY ./loadRoutes.ts ./loadRoutes.ts
COPY ./index.ts ./index.ts

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "dist/index.js"]