name = "runstoppable-site-service"
start:
	pm2 start site-service.js --name=$(name)
restart:
	pm2 restart $(name)
stop:
	pm2 stop $(name)
delete:
	pm2 delete $(name)
