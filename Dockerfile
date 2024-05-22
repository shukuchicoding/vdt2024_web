FROM node:lts-alpine

EXPOSE 3000

WORKDIR /app

COPY package.json package-lock.json ./

run npm install

COPY . .

CMD ["npm", "start"]