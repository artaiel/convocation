FROM node:12-alpine
WORKDIR /app
COPY . /app
RUN ls
RUN npm install
RUN ls
# RUN cd frontend && npm install && npm run build
CMD ["npm", "start"]
