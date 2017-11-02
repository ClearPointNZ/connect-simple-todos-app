FROM node:8.7.0

ENV NPM_CONFIG_LOGLEVEL warn

RUN npm install -g serve
EXPOSE 80

COPY ./swagger-frontend/build ./build
ENTRYPOINT ["serve", "-s", "build", "-p", "80"]
