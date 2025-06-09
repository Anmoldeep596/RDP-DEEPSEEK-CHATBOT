let abortController = null;
let isGenerating = false;


//async function that is invoked when the send button is pushed

async function sendMessage(){
    

    //grabbing elments from the chat window
    const inputBox = document.getElementById("inputBox");
    const chatBox = document.getElementById("chatBox");
    const stopBtn = document.getElementById("stopBtn");
    //trim removes trailimg & leading whitespaces
    const prompt = inputBox.value.trim();
    
    // checking for prompt, if none we jump put of the function
    if(!prompt) return;
    
    // check if model is generating . if it is , we stop it
    if(isGenerating) {
        stopGeneration();
        }
    
    //this is place prompt from the user into the chatbox    
    chatBox.innerHTML += `<div class=" user-message">You: ${prompt}</div>`;


        try{
            //create a new instance of the abortcontroller, which stops the function process
            abortController = new AbortController();
            //because the model is generating, we disable the stop button
            isGenerating = true;

             //network request to the api endpoint
            const response = await fetch('http://localhost:3000/api/chat-stream', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ prompt }),
                signal: abortController.signal 
            });
            
            //read the response with built-in method
            const reader = response.body.getReader();

            //create a new instance of text decore
            const decoder = new TextDecoder();


             //create the bot-message div element
            const botDiv = document.createElement('div');
            botDiv.className = 'bot-message';
            botDiv.textContent = 'Ai: ';
            chatBox.appendChild(botDiv);
            

             //iterate the process of streaming the data to the front in batches
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                
                 //dcode bot message and send to botdiv
                botDiv.textContent += decoder.decode(value, { stream: true });


                
                 //scroll box as data is streaming out
                chatBox.scrollTop = chatBox.scrollHeight; 
            }

        }catch(error) {
            chatBox.innerHTML += `<div class="bot-message" style="color.red;":>${error.message}</div>`

        } finally {
            stopBtn.disabled = true;
            isGenerating = false; 
}

}

//tied to the "reset" button and stop all model generation. also disables the reset button
function stopGeneration() {
    if(abortController) {
        abortController.abort();
    }
    isGenerating = false;
    document.getELememtById('stop-Btn').disabled = true; 
} 