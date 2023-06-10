FROM node:alpine as dev
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install
COPY ./ /app/
EXPOSE 3000
ENTRYPOINT [ "npm", "run" , "dev" ]


# FROM dev AS build
# RUN npm run build

# FROM nginx:alpine AS prod
# COPY --from=build /app/build /usr/share/nginx/html