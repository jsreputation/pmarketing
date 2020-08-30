#!/bin/sh
if [[ "$1" = 'run' ]]; then

  exec node ./main.js

fi

exec "$@"
