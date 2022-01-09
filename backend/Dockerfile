FROM node

WORKDIR /usr/src/bringer
EXPOSE 5000

COPY . .
RUN npm i
RUN mv .env.example .env
RUN mkdir data
RUN npx knex migrate:up --knexfile db/knexfile.js
RUN npx knex seed:run --knexfile db/knexfile.js
CMD [ "npm", "start" ]