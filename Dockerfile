FROM node:20.11.1-alpine3.18
WORKDIR /app
COPY . .
EXPOSE 3000
RUN npm install
CMD npm run dev