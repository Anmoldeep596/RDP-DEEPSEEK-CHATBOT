let abortController = null;
let isGenerating = false;


//async function that is invoked when the send button is pushed

async function sendMessage(){
    

    //grabbing elments from the chat window
    const inpurBox = document.getElementById("inputBox");
    const chatBox = document.getElementById("chatBox");
    const stopBtn = document.getElementById("stopBtn");
    //trim removes trailimg & leading whitespaces
    const prompt = inpurBox.value.trim();
    
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
        }catch(error) {
        }
}

//tied to the "reset" button and stop all model generation. also disables the reset button
function stopGeneration(){
    if(abortController){
        abortController.abort();
    }
    isGenerating = false;
    document.getELememtById('stopBtn').disabled = true;
} 