FROM node:12-alpine
WORKDIR /app
COPY . /app
RUN npm install
RUN cd frontend && npm install && npm run build
CMD ["npm", "start"]
