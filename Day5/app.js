//Day 4

const express = require('express');


const todoRouter = require('./routes/todo')
const userRouter = require('./routes/user')

require('dotenv').config();
const PORT = process.env.PORT || 3004;


const cors = require('cors');
const passport = require('passport');

const app = express();
app.use(express.json());

const dbConfig = require('./Config/db')
dbConfig();

app.use(passport.initialize());
app.use(cors());

app.use('/todo', todoRouter)
app.use('/user', userRouter)

// app listen
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
});