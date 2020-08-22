# pull official base image
FROM node:13.12.0-alpine
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY todo-client/package.json ./
COPY todo-client/package-lock.json ./

RUN npm install

RUN npm install react-scripts@3.4.1 -g 

# add app
COPY . ./

EXPOSE 3000

# start app
CMD ["npm", "start"]


#production
# FROM node:10.15.3 as build-deps
# WORKDIR /usr/src/app
# COPY package.json yarn.lock ./
# RUN yarn
# COPY . ./
# RUN yarn build

# FROM nginx:1.12-alpine
# COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]