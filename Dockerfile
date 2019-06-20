FROM node:lts-alpine as builder
ARG app
COPY apps/$app/dist/$app /service/perx-microsite/
COPY backend/appauth-server /service/express/

WORKDIR /service/express

ENV PORT=8000
ENV APIHOST='https://api.perxtech.io'
ENV FORCE_PATH_STYLE='true'

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod 777 /usr/local/bin/docker-entrypoint.sh \
    && ln -s /usr/local/bin/docker-entrypoint.sh / # backwards compat
ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 8000
CMD ["run"]
