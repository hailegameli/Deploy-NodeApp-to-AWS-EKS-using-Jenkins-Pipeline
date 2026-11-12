ARG IN Dockerfile for NODE.js
------------------------------------------
FROM node:latest

WORKDIR /data

COPY package*.json ./

ARG NODEFILE

RUN npm install

RUN npm install express

COPY $NODEFILE ./slow.js

EXPOSE 3000

CMD ["node", "slow.js"]

#During build of image we use :$$$ docker build  --build-arg NODEFILE=server.js -t nodejs .
#ARG is only used in BUILDING a docker image
-----------------------------------------------------------------------------------------------------------------------------
