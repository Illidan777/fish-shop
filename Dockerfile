FROM node:10-alpine as build-step
RUN mkdir -p /altamar-front
WORKDIR /altamar-front
COPY package.json /altamar-front
RUN npm install
COPY . /altamar-front
RUN npm run build --prod
FROM nginx:1.17.1-alpine
COPY --from=build-step /altamar-front/dist/fish-shop /usr/share/nginx/html
