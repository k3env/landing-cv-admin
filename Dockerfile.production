FROM node:18.13.0-bullseye-slim AS build
WORKDIR /app
COPY package.json package.json
RUN yarn install
COPY . /app
RUN yarn run build

FROM nginx:1.23.3
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
