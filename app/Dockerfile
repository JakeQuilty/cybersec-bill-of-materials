FROM node:16.3.0

WORKDIR /cbom-maker

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]