FROM node:alpine

WORKDIR /usr/app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --silent && mv node_modules ../

COPY . .

EXPOSE 5000

CMD ["npm","start"]