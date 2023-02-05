#!/bin/bash
openssl genrsa -out blitter-api/src/main/resources/app.key 2048
openssl rsa -in blitter-api/src/main/resources/app.key -out blitter-api/src/main/resources/app.pub -pubout
