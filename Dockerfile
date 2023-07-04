FROM node:18.3.0-alpine3.14 as build-step

RUN -p app

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

FROM nginx:1.21.1-alpine

COPY --from=build-step /app/dist/hackacode-theme-park /usr/share/nginx/html





