FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.25-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]







#FROM node:22-alpine AS builder
#WORKDIR /app

#RUN apk add --no-cache build-base python3

#COPY package*.json ./
#RUN npm install

#COPY . .
#RUN npm run build

#FROM node:22-alpine
#RUN npm install -g http-server
#RUN npm i -g serve

#WORKDIR /app
#COPY --from=builder ./app/dist ./

#EXPOSE 3000
#CMD ["http-server", "-p", "3000", "-a", "0.0.0.0"]
#CMD ["serve", "-p", "3000", "-l", "0.0.0.0"]