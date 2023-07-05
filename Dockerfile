FROM node:18-alpine3.17 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


RUN npm run build --prod


FROM nginx:1.24.0-alpine


COPY nginx.conf /etc/nginx/conf.d/

COPY --from=build /app/dist/hackacode-theme-park /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



