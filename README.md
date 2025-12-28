# api.http file 
-> used to send request for all API end points with respective sample data  
-> install Extension → REST Client (by Huachao Mao), prior to send API Requests

# .env file contains
PORT=3000
JWT_SECRET="SECRET_KEY"
userTable=user
doctorTable=doctor
patientTable=patient
mongoConnString=""

# To install dependencies in package.json
-> npm install 
-> npm install --legacy-peer-deps (if get package conflicts)

# To start server
-> npm start 
-> npm run dev    (with nodemon package)

# app.js file is the starting point of application

# controllers folder contains
-> doctorController.js file which has Doctor related API's
-> patientController.js file which has Patient related API's
-> userController.js file which has SignUp & login API's for user(Admin) to add , update and delete doctor & patient based on JwtToken mechanism

# middleWare folder contains
-> authMiddleware.js file which is used to validate JwtToken & also for Authorization so that admin can add/update/delete doctors & patients , in order to avoid fake doctors & patients.
-> validation.js file uses "joi" package to validate user & doctor & patient respectively

# models folder contains
-> doctorSchema which has fields like name, specialization, experienceInYears, phoneNumber, email, createdBy, createdAt, updatedAt
-> patientSchema which has fields like name, age, gender, weightInKgs, healthIssue, phoneNumber, createdBy, createdAt, updatedAt
-> userSchema which has fields like name,  email, password and role of a user


# routes folder contains
-> userRoutes file which routes to Authentication API's through validation Middleware
-> doctorRoutes file which routes to Doctor API's through AuthenticateToken & validation Middleware
-> patientRoutes file which routes to Doctor API's through AuthenticateToken & validation Middleware

# utils folder contains
-> error.js file which has re-usable error messages
-> response.js file which has re-usable success & failure response with proper status codes

# databaseConn.js file has connection to MongoDB database with help of mongoose ODM

# dbQueries file has optimized re-usable database queries

# install Extension → REST Client (by Huachao Mao)
->Have api.http file to send request for below API's with sample data

POST http://localhost:3000/api/user/register

POST http://localhost:3000/api/user/login

POST http://localhost:3000/api/doctor

GET http://localhost:3000/api/doctor?page=1&limit=10

PUT http://localhost:3000/api/doctor/:doctorId

DELETE http://localhost:3000/api/doctor/:doctorId

POST http://localhost:3000/api/patient

GET http://localhost:3000/api/patient?page=1&limit=10

PUT http://localhost:3000/api/patient/:patientId

DELETE http://localhost:3000/api/patient/:patientId






