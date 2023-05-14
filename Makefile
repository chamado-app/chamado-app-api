# typeorm execution command
typeorm = yarn typeorm
# typeorm config file path
typeorm-config = -d ./dist/infra/type-orm-module/type-orm.config.js
# command to run migrations
typeorm-migration-run = ${typeorm} migration:run ${typeorm-config}
# command to run inside docker composer application container
docker-exec = docker-compose exec web-service /bin/sh -c

up:
	docker-compose up -d

down:
	docker-compose down

build:
	docker build -t chamado-app.web-service --target production .

migration-make:
	@${typeorm} migration:create ./src/data/database/pg/migrations/$(or $(type), Create)${class}Table

migration-run: up
	${docker-exec} "${typeorm-migration-run}"

migration-run-fake: up
	${docker-exec} "${typeorm-migration-run} -f"

migration-drop: up
	${docker-exec} "${typeorm} ${typeorm-config} schema:drop"

migration-refresh: up migration-drop migration-run
