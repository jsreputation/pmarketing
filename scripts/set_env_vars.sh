#!/bin/bash

set -e

if ! [[ ${CI} ]]; then
  GITHUB_REF=$1
  GITHUB_ENV=/tmp/build_envs
  rm -f $GITHUB_ENV
fi

# Parse GITHUB_REF
REGEX="([[:alnum:]-]+)-(staging|production)-?([[:alnum:]-]*)-([0-9]+\.[0-9]+\.[0-9]+-?[0-9]*)"
echo "GITHUB_REF: ${GITHUB_REF}"

if [[ "${GITHUB_REF}" =~ $REGEX ]]; then
  echo "APP=${BASH_REMATCH[1]}" >>"${GITHUB_ENV}"
  echo "TARGET_ENV=${BASH_REMATCH[2]}" >>"${GITHUB_ENV}"
  echo "SEM_VER=${BASH_REMATCH[4]}" >>"${GITHUB_ENV}"
  echo "DOCKER_TAG=${GITHUB_REF##*/}" >>"${GITHUB_ENV}"
  source ${GITHUB_ENV}
else
  echo "Error! Unrecognized tag"
  exit 1
fi

# Set env PREAUTH
case ${APP} in
prudential | blackcomb | bpi)
  PREAUTH="true"
  ;;
*)
  PREAUTH="false"
  ;;
esac

echo PREAUTH is ${PREAUTH}
echo "PREAUTH=${PREAUTH}" >>"${GITHUB_ENV}"

# Set env BASE_HREF
case ${APP} in
hsbc)
  BASE_HREF="/site/hsbc/collect2/"
  ;;
hsbc-rewards)
  BASE_HREF="/site/hsbc/rewardscatalogue/"
  ;;
hsbc-xmas)
  BASE_HREF="/site/hsbc/xmas/"
  ;;
dbshk-agent)
  BASE_HREF="/treasures/emgm-poc/"
  ;;
*)
  BASE_HREF="/"
  ;;
esac

echo BASE_HREF is ${BASE_HREF}
echo "BASE_HREF=${BASE_HREF}" >>"${GITHUB_ENV}"

# Set env IS_WHISTLER to false
echo "IS_WHISTLER=false" >>"${GITHUB_ENV}"

# Set env PERX_APP_VERSION
if [[ ${CI} ]]; then
  PERX_APP_VERSION=${APP}@${SEM_VER}:${GITHUB_SHA}
else
  PERX_APP_VERSION=${APP}@${SEM_VER}:$(git rev-parse HEAD | head -c7)
fi

echo PERX_APP_VERSION is ${PERX_APP_VERSION}
echo "PERX_APP_VERSION=${PERX_APP_VERSION}" >>"${GITHUB_ENV}"

# Set env SOURCE_TYPE
case ${APP} in
hsbc)
  SOURCE_TYPE="hsbc-collect2"
  ;;
hsbc-rewards)
  SOURCE_TYPE="hsbc-rewards"
  ;;
hsbc-xmas)
  SOURCE_TYPE="hsbc-xmas"
  ;;
hsbcph-blackcomb)
  SOURCE_TYPE="hsbc-rewards"
  ;;
esac

echo SOURCE_TYPE is ${SOURCE_TYPE}
echo "SOURCE_TYPE=${SOURCE_TYPE}" >>"${GITHUB_ENV}"

# Set env REDIRECT_AFTER_LOGIN
home_redirect=(
  all-it
  bdo
  feature-demo
  globeathome
  globeone
  globesuperapp
  megaworld
  partners-demo
  perx-demo
  perx-demo2
  perx-demo3
  perx-demo4
  petron-demo
  oracle-demo
  rush
  siampiwat
)

for app in "${home_redirect[@]}"; do
  [[ ${APP} == ${app} ]] && REDIRECT_AFTER_LOGIN="/home" && break
done

[[ ${APP} == "blackcomb" ]] && REDIRECT_AFTER_LOGIN="/wallet"

echo REDIRECT_AFTER_LOGIN is ${REDIRECT_AFTER_LOGIN}
echo "REDIRECT_AFTER_LOGIN=${REDIRECT_AFTER_LOGIN}" >>"${GITHUB_ENV}"

# Transform env APP
case ${APP} in
hsbc-xmas)
  APP="hsbc"
  ;;
perx-demo[234])
  APP="perx-demo"
  ;;
esac

echo Final APP is ${APP}
echo "APP=${APP}" >>"${GITHUB_ENV}"

# Set env APP_BASE
blackcomb_app_base=(
  citibankhk
  daiichi-dlvn
  dbssg
  feature-demo
  globeathome
  globeone
  hsbcph-blackcomb
  hsbcvn
  hoolah
  johnsen360
  oracle-demo
  partners-demo
  perx-demo
  petron-demo
  progresif
  razer
  rush
  sabb
  scphoenix
  siampiwat
  techfis
  zeal
)

# Set env APP_BASE for merchant app
blackcomb_merchant_app_base=(
  generic-merchant
)

SET_APP_BASE=false

for app in "${blackcomb_merchant_app_base[@]}"; do
  if [[ ${APP} == ${app} ]]; then
    APP_BASE="blackcomb-merchant" && SET_APP_BASE=true && break
  fi
done

if [[ ${SET_APP_BASE} == false ]]; then
  for app in "${blackcomb_app_base[@]}"; do
    if [[ ${APP} == ${app} ]]; then
      APP_BASE="blackcomb" && break
    else
      APP_BASE=${APP}
    fi
  done
fi

echo APP_BASE is ${APP_BASE}
echo "APP_BASE=${APP_BASE}" >>"${GITHUB_ENV}"

# Source the result for local deploy
source $GITHUB_ENV
