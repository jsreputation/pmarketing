#!/bin/bash

set -e

REGEX="([[:alnum:]-]+)-(staging|production)-?([[:alnum:]-]*)-([0-9]+\.[0-9]+\.[0-9]+-?[0-9]*)"

# Tag validation
[[ $1 =~ $REGEX ]] || (echo "Error! Unrecognized tag" && exit 1)

# Create envs
source ./scripts/set_env_vars.sh $1

# Build
docker build -t perxtech/microsite-apps-ng:$1 . \
  --build-arg app=${APP} \
  --build-arg basehref=${BASE_HREF} \
  --build-arg preauth=${PREAUTH} \
  --build-arg iswhistler=${IS_WHISTLER} \
  --build-arg sourcetype=${SOURCE_TYPE} \
  --build-arg env=${TARGET_ENV} \
  --build-arg appbase=${APP_BASE} \
  --build-arg redirectdest=${REDIRECT_AFTER_LOGIN} \
  --build-arg perx_app_version=${PERX_APP_VERSION}

# Push
docker push perxtech/microsite-apps-ng:${DOCKER_TAG}


