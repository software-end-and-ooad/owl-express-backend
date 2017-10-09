############### OWL-EXPRESS ###############

--------------- Requirement ----------------
- sequelize
- npm 4.6.1 +
- node
- sender api (Recommend postman)

--------------- Installation ---------------
1. git clone {{git-url}}
2. npm install  or  yarn  (yarn is faster)
3. npm start


--------------- Migration Database --------------
1. Create Database name 'owl'
2. config database in config.json file
3. migrate with    sequelize db:migrate

--------------- Seed Data -------------------
1. sequelize db:seed:all
2. for first admin using postman send api to 'GET: localhost:3000/api/send-activate/{{email-first-admin}}'
3. activate account in sent email
