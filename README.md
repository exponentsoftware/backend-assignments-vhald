Backend Assignment
TODO List
Create APIs to get all, get by id, add, update by id and delete by id a TODO list
Should use MongoDB as a database
API should not have any additional routes
Fields required in Todo list:

user name
title for todo
field to track whether task is complete or not
created at
updated at
category (work, hobby, task)
Prefered Technologies
Environment Framework
Backend APIs Express Js
Database MongoDB
ORM/ODM Mongoose

Backend Assignment
TODO List with filtering
In the existing APIs that you have created in day 1, add filters to the todo list
Get all todo list should be able to have additional filters to :
fetch by category
search by title
Add capability to sort the data by created_at
Add api to mark Todo as done, can you use an exisiting api to achieve this?
Prefered Technologies
Environment Framework
Backend APIs Express Js
Database MongoDB
ORM/ODM Mongoose

Backend Assignment
TODO List for Users
Add User collection to store below user information:
User name
email
phone
created at
updated at
role
Add validation on phone and email from the Mongoose schema itself with error message handling
Link Todo list with User
Create api to get TODO list for User
Create User roles for Admin, App user
User with Admin role should be able to get all Todos
User with App user role, should be able to fetch only his Todo list
Prefered Technologies
Environment Framework
Backend APIs Express Js
Database MongoDB
ORM/ODM Mongoose

Backend Assignment
TODO List with Authentication
Use Passport Js and add authentication to your App
Create Register and Sign in APIs and on successful signin use Token based authentication
Signed in User should only be able to call the routes
Create a basic html page and serve it using express app
Html page for Register, Sign in and display users Todo list should be created
Prefered Technologies
Environment Framework
Backend APIs Express Js
Database MongoDB
ORM/ODM Mongoose

Backend Assignment
TODO List with Pagination
Add Pagination on all get routes
Api should be able to take in two fields - page number and no. of records
Pagination should work with existing features
Create an API to get number of registered users for the Day
Create API to get active users for the below:
for current day
for a week
for a month
Prefered Technologies
Environment Framework
Backend APIs Express Js
Database MongoDB
ORM/ODM Mongoose
