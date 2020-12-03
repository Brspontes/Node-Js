## --POSTGRES

docker run --name postgres -e POSTGRES_USER=brspontes -e POSTGRES_PASSWORD=minhasenhasupersecreta -e POSTGRES_DB=heroes -p 5432:5432 -d postgres
docker ps /* verifica o que está em execução no docker */
docker exec -it postgres /bin/bash /* entra no container */

docker run --name adminer -p 8080:8080 --link postgres:postgres -d adminer

## -- MONGODB
docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin123 -d mongo:4
docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient
docker exec -it mongodb mongo --host localhost -u admin -p admin123 --authenticationDatabase admin --eval "db.getSiblingDB('herois').createUser({ user: 'brspontes', pwd: 'minhasenhasecreta', roles:[{role: 'readWrite', db:'herois'}]})"