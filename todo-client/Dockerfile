# pull official base image
FROM node:13.12.0-alpine
# set working directory

RUN mkdir -p /app
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

# install app dependencies
COPY package.json /app
COPY yarn.lock /app

RUN yarn

RUN yarn add react-scripts@3.4.1 -g 

# add app
COPY . /app

# RUN ls -al
EXPOSE 3000
RUN ls -al
# start app
CMD ["npm", "start"]