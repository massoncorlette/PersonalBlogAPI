# PERN-Starter-Template
Starter template, using PERN stack, keeping backend and frontend in seperate directories. Refer to README for installations and notes. 

(In Progress) Want to make the frontend ready with React and vitest connected to backend and ready to launch.
JWT's being used for securing routes between frontend and backend(REST API), found tutorial: https://www.youtube.com/watch?v=7nafaH9SddU  CORS still needs to be implemented !

Design: Keep CSS inline or modular

Commands:
Commands in BACKEND directory!
npm init - sets up default package.json file (must run!)
npm install - sets up all node modules (must run!)

npm install express express-session jsonwebtoken pg passport passport-jwt passport-local bcryptjs ejs express-validator dotenv connect-pg-simple -- install all in one go

npm install express  -- setup express server
npm install ejs -- setup ejs templating language
npm install express-validator -- for sanitation and validation    
npm install dotenv -- for storing secure user data in env file   (put require('dotenv').config() in root file to enable access in .env file); 
npm install bcryptjs -- for serializing passwords
npm install pg -- for postgreSQL
npm install connect-pg-simple -- session storage (connecting db to session storage, so we can store session on postgre db opposed to local machine)
npm install jsonwebtoken -- for using token based authorization

FRONTEND directory:
npm init - sets up default package.json file (must run!)
npm install - sets up all node modules (must run!)

(install React, Routers, etc in Frontend directory)

This template uses Prisma ORM supporting PostgreSQL. 
Prisma Setup Guide: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-node-postgresql 
or use quick commands: 
 ---> npx prisma init  (then after adding DATABASE_URL to .env)  ---> npx prisma migrate dev --name init  ---> npx prisma generate

Don't forget to setup .env where variables such as DATABASE_URL(where data is being served) will go
.gitignore has .env and /generated/schema to ignore from public 

Using PostMan Web Agent (for full API functionality): https://learning.postman.com/docs/getting-started/installation/installation-and-updates/#install-postman-on-linux   (after installing with snap command, just run 'postman' as a command to launch)

npm install -g nodemon --live view? 

Linter & Prettier Commands
npm install --save-dev eslint
npx eslint --init   (Optional for configuration)  

Linting commands
- Run: npx eslint .
- Fix: npx eslint . --fix

Prettier commands
- npm install --save-dev prettier
- touch .prettierrc  (Optional config file for tab space, ect. )