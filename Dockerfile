# boilerpale
FROM kilianciuffolo/node
MAINTAINER me@nailik.org

# app
WORKDIR /app
ADD package.json ./
RUN npm install && npm cache clean
ADD . ./

CMD ["node", "--harmony", "server"]
EXPOSE 8080