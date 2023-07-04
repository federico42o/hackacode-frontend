# FROM node:18-alpine as build-stage

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .
# RUN npm run build

# # Stage 2: Serve the built Angular app using Nginx
# FROM nginx:alpine

# COPY --from=build-stage /app/dist /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]



