FROM node:carbon-slim

# Create app directory
WORKDIR /apigateway

# Install app dependencies
COPY package.json /apigateway/
RUN npm install

# Bundle app source
COPY . /apigateway/
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]
