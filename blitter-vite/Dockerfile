FROM openapitools/openapi-generator-cli as gen
WORKDIR /local

COPY blitter-oas/blitter.yml .

RUN bash /usr/local/bin/docker-entrypoint.sh generate \
    -i /local/blitter.yml \
    -g typescript-axios \
    -o /local/out/generated-src \
    --additional-properties=supportsES6=true,typescriptThreePlus=true \
    --server-variables=basePath=https://blitter.augtheo.com:8090

FROM node:alpine as dev
WORKDIR /app

ARG SOURCES=/local/out/generated-src

COPY --from=gen ${SOURCES} blitter-vite/src/generated-sources/openapi
COPY blitter-vite/package.json /app/package.json
COPY blitter-vite/package-lock.json /app/package-lock.json
RUN npm install
COPY blitter-vite/ /app/
EXPOSE 3000


# RUN npm run codegen
ENTRYPOINT [ "npm", "run" , "dev" ]


FROM dev AS build
RUN npm run build

FROM nginx:alpine AS prod
COPY --from=build /app/dist/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
