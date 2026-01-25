FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .
RUN npm run tsc

EXPOSE 3000

CMD [ "node", "build/server.js" ]

