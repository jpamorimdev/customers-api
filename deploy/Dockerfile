# builder stage
FROM node:16.19-slim as builder

WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# final image stage
FROM node:16.19-slim as final

WORKDIR /usr/src/app

COPY yarn.lock yarn.lock

COPY package.json package.json

RUN yarn install --frozen-lockfile --production

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD [ "yarn", "start:prod" ]