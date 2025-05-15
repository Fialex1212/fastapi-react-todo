FROM node:18-slim

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 4173

CMD ["yarn", "start", "--host", "0.0.0.0", "--port", "4173"]

