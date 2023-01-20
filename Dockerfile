FROM node:16-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package.json ./
USER node
RUN npm install
COPY --chown=node:node . .
EXPOSE 80
CMD [ "node", "app.js" ]

# docker build -t jeanflores2c93/aforo255-nodejs-account:local-1 .
# docker push jeanflores2c93/aforo255-nodejs-account:local-1