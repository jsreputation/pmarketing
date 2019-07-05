FROM node:lts-alpine as builder

COPY . /service
WORKDIR /service

ARG APIHOST='https://api.perxtech.io'
ARG BASE_HREF='/'

RUN echo "apihost: ${APIHOST}"
RUN echo "basehref: ${BASE_HREF}"

RUN yarn
RUN APIHOST=${APIHOST} BASE_HREF=${BASE_HREF} yarn build:prod --base-href ${BASE_HREF} --rebase-root-relative-css-urls=true

FROM node:lts-alpine

ARG app
COPY --from=builder /service/apps/$app/dist/$app /service/perx-microsite/
COPY --from=builder /service/backend/appauth-server /service/express/

WORKDIR /service/express

ENV PORT=8000

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod 777 /usr/local/bin/docker-entrypoint.sh \
    && ln -s /usr/local/bin/docker-entrypoint.sh / # backwards compat
ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 8000
CMD ["run"]
