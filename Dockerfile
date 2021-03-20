# Dockerfile
# base image
FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN pwd

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
COPY . /usr/src/app
# install dependencies
RUN npm install
# start app
RUN npm run build
RUN npm install

EXPOSE 3000

CMD node bin/www
