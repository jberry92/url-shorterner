FROM mhart/alpine-node:latest

WORKDIR /app
ADD ./package.json ./tsconfig.json ./src /app/
RUN yarn install

EXPOSE 3000

CMD ["yarn", "start:dev"]