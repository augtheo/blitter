#!/bin/bash
printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' -

get_hash() {
    echo "$(echo -n $RANDOM | md5sum | head -c 20 )"
}
echo "DB_NAME=$(get_hash)" > .env
echo "DB_USER=$(get_hash)"  >> .env
echo "DB_PASS=$(get_hash)"  >> .env

echo "Creating .env file and generating application keys"
printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' -

openssl genrsa -out blitter-api/src/main/resources/app.key 2048
openssl rsa -in blitter-api/src/main/resources/app.key -out blitter-api/src/main/resources/app.pub -pubout
