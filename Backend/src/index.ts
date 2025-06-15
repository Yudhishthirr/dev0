import express from "express";
import cors from "cors";
import {EnrichPrompt,ChatMessage} from "./prompt_template/main"


const app = express();
app.use(cors());
app.use(express.json());



const PORT = process.env.PORT || 3000;

app.post("/template", async(req, res) => {

    const { prompt } = req.body;
    if(!prompt){
        res.json({message:"bhai prompt to de deta"});
    }
    
    const response = await EnrichPrompt(prompt);
    // console.log(response)
    res.json({data:response})
    
});

app.post("/chat", async(req, res) => {

    const { message } = req.body;
    if(!message){
        res.json({message:"bhai message to de deta"});
    }
    
    const response = await ChatMessage(message);
    // console.log(response)
    res.json({data:response})
    
});



app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

export default app;