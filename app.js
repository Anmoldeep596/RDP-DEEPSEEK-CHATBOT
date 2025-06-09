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

//endpoint for the chat stream
app.post('/api/chat-stream', async (req, res) => {
    try {

         //promp from the user
        const { prompt } = req.body;

        
        //initiate the stream from the model
        //throw prompt from user into the model
        const stream = await ollama.chat({
            model : 'deepseek-r1"7b' ,
            message: [{role: 'user', content: prompt}],
            stream: true
        });

        res.header('Content-Type', 'text/plain');

        for await (const chunck of stream) {
            try {
                
                 //check content in each chunk using null aware operator "?."
                if(chunck.message?.content) {
                    res.write(chunck.message.content);
                }

            }catch (streamError) {
                console.error(`Error with stream: ${streamError}`);
                break;
            }
        }
        res.end();
   
    } catch (error) {
        res.status(500).send(`Internal Server Error: ${streamError}`);
    }
}); 



app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`);
});