FROM node:lts-alpine3.13 as init

# install deps for canvas
RUN apk add --update --no-cache \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev

WORKDIR /deps
COPY package.json /deps
COPY docker-entrypoint.sh /deps
COPY decorate-angular-cli.js /deps
COPY yarn.lock /deps
# Run the commands that are least likely to change first to bust the cache at the latest stage possible

RUN yarn
RUN npm_config_build_from_source=true yarn add canvas -O -W

FROM node:lts-alpine3.13 as feBuilder

ARG basehref='/'
ARG preauth='false'
# iswhistler is used by all microsites
ARG iswhistler='false'
# sourcetype is for HSBC PH only; ignonored by all other app values
ARG sourcetype
ARG app
ARG appbase=${app}

ARG env='production'
# redirectdest is used only for blackcomb
ARG redirectdest
ARG perx_app_version

COPY --from=init /deps /service
COPY angular.json config.ts nx.json tsconfig.base.json tsconfig.node.json /service/
COPY libs /service/libs
COPY apps/${appbase} /service/apps/${appbase}
WORKDIR /service

RUN echo -e "\n--- Build Args ---\nbasehref: ${basehref}\npreauth: ${preauth}\n" \
    "iswhistler: ${iswhistler}\nsourcetype: ${sourcetype}\napp: ${app}\nenv: ${env}\n" \
    "redirectdest: ${redirectdest}\n"

RUN SOURCE_TYPE=${sourcetype} BASE_HREF=${basehref} PREAUTH=${preauth} \
    IS_WHISTLER=${iswhistler} REDIRECT_AFTER_LOGIN=${redirectdest} PERX_APP_VERSION=${perx_app_version}\
    yarn build:${app}:${env} --base-href ${basehref} --rebase-root-relative-css-urls=true

FROM node:lts-alpine3.13 as backendBuilder
COPY --from=feBuilder /service /service
COPY backend /service/backend
WORKDIR /service

RUN BASE_HREF=${basehref} yarn build:backend

# Stage 2
FROM node:lts-alpine3.13

WORKDIR /service/express
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod 777 /usr/local/bin/docker-entrypoint.sh \
    && ln -s /usr/local/bin/docker-entrypoint.sh / # backwards compat

ENTRYPOINT ["docker-entrypoint.sh"]
ARG port=8000
EXPOSE ${port}
CMD ["run"]

COPY --from=backendBuilder /service/dist/appauth-server /service/express/

ARG app
ARG appbase=${app}

COPY --from=backendBuilder /service/dist/$appbase /service/perx-microsite/

ARG iswhistler='false'
ARG basehref='/'

RUN echo -e "\n--- Stage 2 Build Args ---\napp: ${app}\nappbase: ${appbase}\n" \
    "port: ${port}\niswhistler: ${iswhistler}\nbasehref: ${basehref}\n"

ENV IS_WHISTLER=${iswhistler} BASE_HREF=${basehref} PORT=${port} PRODUCTION='true'
