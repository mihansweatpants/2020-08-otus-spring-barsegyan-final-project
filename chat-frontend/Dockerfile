FROM node:14.15.3-alpine AS build-stage

WORKDIR /app
COPY package*.json /app/
COPY ./ /app/

RUN npx yarn install
RUN npx yarn build


FROM nginx:1.19.6-alpine

COPY --from=build-stage /app/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build-stage /app/build/ /srv/www

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
