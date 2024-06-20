FROM node:20.12.2

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN ls -la /app/tsconfig.json

RUN yarn build

EXPOSE 10000

CMD ["yarn", "start:prod"]