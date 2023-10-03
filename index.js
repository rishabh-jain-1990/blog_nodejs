import express from 'express';


const app = express();
const PORT = 4500;

app.listen(PORT, (req, res) => console.log(`Local server is running on ${PORT}`));

app.get('/', (req, res) => res.send(`Blog is running`));