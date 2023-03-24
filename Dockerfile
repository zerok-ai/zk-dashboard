FROM --platform=linux/amd64 node:14
WORKDIR /app

COPY ./build/ ./
RUN yarn global add serve

CMD ["serve","-s"]
EXPOSE 3000

