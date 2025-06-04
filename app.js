const express = require('express');
const cors = require('cors');
const app = express();
const { Ollama } = require('ollama');
const PORT = 3000;

const ollama = new Ollama({
    host: 'http://loclahost:11434'
})


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`);
});