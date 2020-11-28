FROM mhart/alpine-node:latest

WORKDIR /app
ADD package.json tsconfig.json /app/
ADD src /app/src
RUN yarn install
EXPOSE 3000

CMD ["yarn", "start:dev"]