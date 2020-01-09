FROM node:lts-alpine as builder

# Run the commands that are least likely to change first to bust the cache at the latest stage possible

COPY . /service
WORKDIR /service
RUN yarn

ARG apihost='https://api.getperx.io'
ARG basehref='/'
ARG preauth='false'
# iswhistler is used by all microsites
ARG iswhistler='false'
# sourcetype is for HSBC PH only; ignonored by all other app values
ARG sourcetype
ARG app
ARG env='prod'
# redirectdest is used only for blackcomb
ARG redirectdest

RUN echo -e "\n--- Build Args ---\napihost: ${apihost}\nbasehref: ${basehref}\npreauth: ${preauth}\n" \
           "iswhistler: ${iswhistler}\nsourcetype: ${sourcetype}\napp: ${app}\nenv: ${env}\n" \
           "redirectdest: ${redirectdest}\n"

RUN SOURCE_TYPE=${sourcetype} APIHOST=${apihost} BASE_HREF=${basehref} PREAUTH=${preauth} \
    IS_WHISTLER=${iswhistler} REDIRECT_AFTER_LOGIN=${redirectdest} \
    yarn build:${app}:${env} --base-href ${basehref} --rebase-root-relative-css-urls=true

RUN BASE_HREF=${basehref} yarn build:backend

# Stage 2
FROM node:lts-alpine

WORKDIR /service/express
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod 777 /usr/local/bin/docker-entrypoint.sh \
    && ln -s /usr/local/bin/docker-entrypoint.sh / # backwards compat

ENTRYPOINT ["docker-entrypoint.sh"]
ARG port=8000
EXPOSE ${port}
CMD ["run"]

COPY --from=builder /service/backend/appauth-server /service/express/

ARG app
ARG appbase=${app}

COPY --from=builder /service/apps/$appbase/dist/$appbase /service/perx-microsite/

ARG iswhistler='false'
ARG basehref='/'

RUN echo -e "\n--- Stage 2 Build Args ---\napp: ${app}\nappbase: ${appbase}\n" \
            "port: ${port}\niswhistler: ${iswhistler}\nbasehref: ${basehref}\n"

ENV IS_WHISTLER=${iswhistler} BASE_HREF=${basehref} PORT=${port} PRODUCTION='true'
