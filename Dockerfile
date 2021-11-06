# Dockerfile
# base image
FROM node:15.14.0-alpine3.13

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN pwd

ARG NEXT_PUBLIC_ENV_NAME
ENV NEXT_PUBLIC_ENV_NAME $NEXT_PUBLIC_ENV_NAME
ARG NEXT_PUBLIC_REST_API
ENV NEXT_PUBLIC_REST_API $NEXT_PUBLIC_REST_API
RUN echo $NEXT_PUBLIC_REST_API
RUN echo ${NEXT_PUBLIC_ENV_NAME}

COPY src /usr/src/app/src
COPY public /usr/src/app/public
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
#COPY config.local.js /usr/src/app/
COPY next.config.js /usr/src/app/
COPY .env /usr/src/app/
# install dependencies
RUN npm install
# start app
# env variables need to be injected into prebuilt nextjs client files
RUN NEXT_PUBLIC_REST_API=${NEXT_PUBLIC_REST_API} NEXT_PUBLIC_ENV_NAME=${NEXT_PUBLIC_ENV_NAME} /usr/src/app/node_modules/next/dist/bin/next build

EXPOSE 3000

CMD npm run start
