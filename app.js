import express from 'express';
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to this server!' });
})

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
});