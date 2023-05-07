# typeorm execution command
typeorm = yarn typeorm
# typeorm config file path
typeorm-config = -d ./src/config/typeorm.module.ts
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

migration-run: up
	${docker-run} ${typeorm-migration-run}

migration-run-fake: up
	${docker-run} ${typeorm-migration-run} -f

migration-drop: up
	${docker-run} ${typeorm} ${typeorm-config} schema:drop

migration-refresh: up migration-drop migration-run