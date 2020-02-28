#!/bin/sh
SERVICES=${1:-"API UI SSO"}
COMPOSE_FILE="./docker-compose.dev.yml"

function composer() {
  docker-compose -f ${COMPOSE_FILE} ${@}
}

for service in ${SERVICES}; do
  composer run --rm ${service} sudo chown -R node:node /workspace &>/dev/null
  echo "Launching ${service} in new window"
  code -n ./Services/${service}
done