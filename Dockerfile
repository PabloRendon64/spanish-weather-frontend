FROM node:18.20.2-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

FROM nginx:1.26.2-alpine

COPY --from=build-step /app/dist/browser /usr/share/nginx/html

COPY ./config/default.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80 4200 443

CMD ["nginx", "-g", "daemon off;"]
