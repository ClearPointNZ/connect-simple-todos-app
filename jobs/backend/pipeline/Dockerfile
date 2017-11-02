FROM node:6.9.4

VOLUME /todo
WORKDIR /todo
RUN mkdir app
COPY ./swagger-backend/app ./app/
COPY ./swagger-backend/package.json .
COPY ./swagger-backend/node_modules ./node_modules
EXPOSE 3001
RUN npm install -g yarn
ENTRYPOINT ["yarn", "start"]