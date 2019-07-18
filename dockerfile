FROM node:10.15.3

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --quiet

COPY . .
# COPY server .
# COPY src .

EXPOSE 8000

CMD [ "npm src/index.js" ]
