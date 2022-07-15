FROM node:lts-alpine
WORKDIR /usr/src/app
RUN yarn 
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]
