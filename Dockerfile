FROM node:slim as builder

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
RUN yarn install --silent
COPY public /usr/src/app/public
COPY src /usr/src/app/src
COPY tsconfig.json /usr/src/app/
RUN yarn build

# production environment
FROM nginx:alpine
COPY docker/conf/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
