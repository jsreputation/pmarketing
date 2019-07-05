FROM node:lts-alpine as builder

COPY . /service
WORKDIR /service

ARG apihost='https://api.perxtech.io'
ARG basehref='/'

RUN echo "apihost: ${apihost}"
RUN echo "basehref: ${basehref}"

RUN yarn
RUN yarn bootstrap:prod
RUN APIHOST=${apihost} BASE_HREF=${basehref} yarn build:prod --base-href ${basehref} --rebase-root-relative-css-urls=true

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
