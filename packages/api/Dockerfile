FROM mhart/alpine-node:latest

WORKDIR /app
ADD package.json tsconfig.json yarn.lock /app/
ADD src /app/src
RUN yarn install
RUN ls -la
EXPOSE 3000

CMD ["yarn", "start:dev"]