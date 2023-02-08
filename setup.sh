#!/bin/bash
echo "Setup database credentials"
printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' -

echo "Enter the database name: "
read dbname

echo "Enter the database username: "
read uname

echo "Enter the database password: "
read pword

echo "DB_NAME=$dbname" > .env
echo "DB_USER=$uname"  >> .env
echo "DB_PASS=$pword"  >> .env

echo "Creating .env file with given credentials!"
printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' -

openssl genrsa -out blitter-api/src/main/resources/app.key 2048
openssl rsa -in blitter-api/src/main/resources/app.key -out blitter-api/src/main/resources/app.pub -pubout
