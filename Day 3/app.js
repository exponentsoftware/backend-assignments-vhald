// Create APIs to get all, get by id, add, update by id and delete by id a TODO list
const express = require('express');


const todoRouter = require('./routes/todo')
const userRouter = require('./routes/user')

require('dotenv').config();
const PORT = process.env.PORT || 3003;

const app = express();
app.use(express.json());

const dbConfig = require('./Config/db')
dbConfig();

app.use('/todo', todoRouter)
app.use('/user', userRouter)

// app listen
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
});