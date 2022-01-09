FROM node

WORKDIR /usr/src/bringer
EXPOSE 3000

COPY . .
RUN npm i
RUN echo 'REACT_APP_BE_URL=bringer_be' > .env
CMD [ "npm", "start" ]