FROM node:19.0.1

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3003

CMD ["npm","start"]