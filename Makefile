# typeorm execution command
typeorm = yarn typeorm
# typeorm config file path
typeorm-config = -d ./src/data/database/pg/typeorm/config.ts
# command to run migrations
typeorm-migration-run = ${typeorm} migration:run ${typeorm-config}
# command to run inside docker composer application container
docker-run = docker-compose run web-service

up: 
	docker-compose up -d

down: 
	docker-compose down

build:
	docker build -t chamado-app.web-service --target production .

migration-make: 
	@${typeorm} migration:create ./src/database/migrations/$(or $(type), Create)${class}Table

migration-run:
	${docker-run} ${typeorm-migration-run}

migration-run-fake:
	${docker-run} ${typeorm-migration-run} -f

migration-drop:
	${docker-run} ${typeorm} ${typeorm-config} schema:drop

migration-refresh: migration-drop migration-run