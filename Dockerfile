FROM node:8.9
RUN mkdir -p /usr/src/keyvalueapi
WORKDIR /usr/src/keyvalueapi
COPY package.json /usr/src/keyvalueapi/
COPY package-lock.json /usr/src/keyvalueapi/
RUN npm install ionic --loglevel verbose
COPY . /usr/src/keyvalueapi
EXPOSE 3005
CMD ["node", "server/server.js"]