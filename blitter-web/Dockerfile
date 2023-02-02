FROM node:alpine

WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install
COPY ./ /app/
RUN npx tailwindcss -i src/index.css -o /app/src/output.css
EXPOSE 3000
CMD [ "npm", "start" ]
