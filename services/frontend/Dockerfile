FROM node:lts-alpine3.14

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . /usr/src/app/
