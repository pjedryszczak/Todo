# pull official base image
FROM node:13.12.0-alpine
# set working directory

# RUN mkdir -p /app

EXPOSE 3000
# add `/app/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

# install app dependencies
COPY package.json .
COPY yarn.lock .

RUN yarn

RUN yarn add react-scripts@3.4.1 -g 

# add app
COPY . .

# RUN ls -al
# WORKDIR /app
RUN ls -al
# start app
CMD ["npm", "start"]