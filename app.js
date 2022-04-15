// Create APIs to get all, get by id, add, update by id and delete by id a TODO list
const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3001;

const dbConfig = require('./Config/db')
dbConfig();

app.use(express.json());

const routes = require('./Routes/todo');
app.use('/', routes);

// app listen
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
});