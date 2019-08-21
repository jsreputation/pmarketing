FROM node:lts-alpine as builder

COPY . /service
WORKDIR /service

RUN yarn
RUN yarn build

FROM node:lts-alpine

COPY --from=builder /service /service

ENV PORT=8000
ENV BASE_URL="https://api.whistler.perxtech.org"
WORKDIR /service

CMD ["yarn", "start:prod"]
