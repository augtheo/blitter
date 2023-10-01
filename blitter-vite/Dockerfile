FROM node:alpine as dev
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install
COPY ./ /app/
EXPOSE 3000
RUN npm run codegen
ENTRYPOINT [ "npm", "run" , "dev" ]


FROM dev AS build
RUN npm run build

FROM nginx:alpine AS prod
COPY --from=build /app/dist/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
