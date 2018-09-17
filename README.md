# GIRAFARY

This repository contains the web app to load and save gifs

## Development

### Production Build

You will need NodeJS 4+ installed to do this. See the install instructions [here](https://nodejs.org/en/download/package-manager/).

Once you have NodeJS installed, install the dependencies (first time only):

```sh
npm install
```
Then you must create a copy of the config.example.js and rename it to config.js stablishing the path to your mongodb

Run and deploy the server on the virtual machine:

````sh
pm2 start server.js -- --production
````


## Microservices

### Apache Thrift

Inside the folder microservices you'll find a gateway, redis, and topten folder, each of them contains a docker image

To deploy then you need to have Docker and Docker compose up installed already

Once you have Docker and Dokocker-compose up installed, deploy the microservers:

```sh
sudo docker-compose up
```

## MONGODB

This web app uses an online mongodb, this one must be specified on the config.js file and also inside the topten microservice.