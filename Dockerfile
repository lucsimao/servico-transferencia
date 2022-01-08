FROM node:alpine as builder

WORKDIR /usr/app

COPY package*.json ./
RUN npm i 

COPY . . 

RUN npm run db:schema:generate
RUN npm run build


EXPOSE 3333

CMD ["npm", "start"]
