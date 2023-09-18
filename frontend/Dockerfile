FROM node:16

WORKDIR /app

RUN npm i npm@latest -g

COPY package.json .

RUN npm install

ENV REACT_APP_BACKEND_URL=http://localhost:5000

COPY . .

CMD [ "sh", "run.sh"]
