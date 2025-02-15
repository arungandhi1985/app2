# Dockerfile
FROM node:16

WORKDIR /app2

COPY package*.json ./

RUN npm install

RUN npm run build

EXPOSE 8081

CMD ["npm", "start"]