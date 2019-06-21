#!/bin/sh
if [[ "$1" = 'run' ]]; then

  exec node dist/server.js

fi

exec "$@"
