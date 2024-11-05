# testing 123
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN node --max-old-space-size=2048 ./node_modules/.bin/tsc

EXPOSE 3000

CMD ["node", "dist/app.js"]
