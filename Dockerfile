FROM node:lts-alpine as builder

COPY . /service
WORKDIR /service

RUN yarn
RUN yarn build:prod

FROM node:lts-alpine

ARG app
COPY --from=builder /service/apps/$app/dist/$app /service/perx-microsite/
COPY --from=builder /service/backend/appauth-server /service/express/

WORKDIR /service/express

ENV PORT=8000
ENV APIHOST='https://api.perxtech.io'
ENV FORCE_PATH_STYLE='true'
ENV PRODUCTION='true'

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod 777 /usr/local/bin/docker-entrypoint.sh \
    && ln -s /usr/local/bin/docker-entrypoint.sh / # backwards compat
ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 8000
CMD ["run"]
