build:
	npm i
start:
	make -C ./services/site start 
restart:
	make -C ./services/site restart
stop:
	make -C ./services/site stop
delete:
	make -C ./services/site delete