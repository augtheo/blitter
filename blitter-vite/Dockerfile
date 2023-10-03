FROM openapitools/openapi-generator-cli as gen
WORKDIR /workspace

COPY blitter-oas/blitter.yml blitter-oas/blitter.yml

RUN bash /usr/local/bin/docker-entrypoint.sh generate \
    -i blitter-oas/blitter.yml \
    -g typescript-axios \
    -o out/generated-src \
    --additional-properties=supportsES6=true,typescriptThreePlus=true

FROM node:alpine as dev
WORKDIR /app

COPY blitter-vite/package.json /app/package.json
COPY blitter-vite/package-lock.json /app/package-lock.json
RUN npm install
COPY blitter-vite/ /app/

COPY --from=gen /workspace/out/generated-src /app/src/generated-sources/openapi/
EXPOSE 3000


ENTRYPOINT [ "npm", "run" , "dev" ]


FROM dev AS build
RUN npm run build

FROM nginx:alpine AS prod
COPY --from=build /app/dist/ /usr/share/nginx/html
COPY blitter-vite/nginx.conf /etc/nginx/conf.d/default.conf
