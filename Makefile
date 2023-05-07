up: 
	docker-compose up -d

down: 
	docker-compose down

build:
	docker build -t chamado-app.web-service --target production .
