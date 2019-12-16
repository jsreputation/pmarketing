FROM node:lts-alpine as builder

COPY . /service
WORKDIR /service

ARG apihost='https://api.getperx.io'
ARG basehref='/'
ARG preauth='false'
ARG iswhistler='false'
ARG sourcetype
ARG app
ARG env='prod'

RUN echo "apihost: ${apihost}"
RUN echo "basehref: ${basehref}"
RUN echo "preauth: ${preauth}"
RUN echo "iswhistler: ${iswhistler}"

RUN yarn
RUN SOURCE_TYPE=${sourcetype} APIHOST=${apihost} BASE_HREF=${basehref} PREAUTH=${preauth} IS_WHISTLER=${iswhistler} yarn build:${app}:${env} --base-href ${basehref} --rebase-root-relative-css-urls=true
RUN BASE_HREF=${basehref} yarn build:backend

FROM node:lts-alpine

ARG app
ARG appbase=${app}
COPY --from=builder /service/apps/$appbase/dist/$appbase /service/perx-microsite/
COPY --from=builder /service/backend/appauth-server /service/express/

RUN cat /service/perx-microsite/index.html

WORKDIR /service/express
ARG basehref='/'

ENV PORT=8000
ENV PRODUCTION='true'
ENV BASE_HREF=${basehref}

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod 777 /usr/local/bin/docker-entrypoint.sh \
    && ln -s /usr/local/bin/docker-entrypoint.sh / # backwards compat
ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 8000
CMD ["run"]
