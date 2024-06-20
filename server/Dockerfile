FROM node:20.12.2

RUN npm install -g yarn

WORKDIR /app

COPY package*.json ./

RUN yarn build

COPY . .

EXPOSE 10000

CMD ["yarn", "start:prod"]