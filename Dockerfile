FROM node:18.13.0-bullseye-slim AS build
COPY . /app
WORKDIR /app
RUN yarn install && yarn run build

FROM nginx:1.23.3
COPY --from=build /app/dist /usr/share/nginx/html
