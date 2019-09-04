FROM node:latest

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3004

CMD [ "npm", "run", "start:prod" ]