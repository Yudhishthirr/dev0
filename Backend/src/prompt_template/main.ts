
import { PromptTemplate } from "@langchain/core/prompts";

import { BASE_PROMPT, ReactbasePrompt, NodebasePrompt,getSystemPrompt } from "../baseprompt/baseprompt";
import { Model } from "../gemin/genimi_config";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const EnrichPrompt = async (prompt: { prompt: string }) => {

    if (!prompt) {
        return 'prompt is required';
    }
    console.log(prompt)
    
    const promptTemplate = ChatPromptTemplate.fromMessages([
        [
          "system",
          `You are an intelligent coding assistant. 
      Your task is to analyze the given prompt, or artifact and determine whether the prompt is primarily a Node.js (backend) or React (frontend).
      
      Return only a single word: either "node" or "react" — based solely on your analysis.
      Do not include any explanations, formatting, or additional output.
      Your response must be one of these two exact strings: "node" or "react"
      
      Here are some examples:
      
      Input: "Create an API for a todo app in Node" → Output: node
      Input: "Build a backend for a todo app" → Output: node
      Input: "Create a UI for a todo app" → Output: react
      Input: "Design the frontend of a dashboard" → Output: react`
        ],
        ["user", "{prompt}"]
    ]);

    
    // console.log(promptTemplate);
    const finalPromot = await promptTemplate.invoke({ prompt: prompt});
    const response =await Model.invoke(finalPromot)

    // console.log(`here is response of ai ${response}`)

    const answer = response.content;

    if (answer == "react") {
        return {
            prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${ReactbasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [ReactbasePrompt]
        }
    }
    if (answer == "node") {
        return {
            prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${NodebasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [NodebasePrompt]
        }
    }
    
   
}
function escapeBraces(str: string) {
  return str.replace(/[{]/g, '{{').replace(/[}]/g, '}}');
}

const ChatMessage = async (message: { message: string }) => {

  
    if (!message) {
        return 'message is required';
    }
    // console.log(message)
    
    const promptTemplate = ChatPromptTemplate.fromMessages([
        ["system", escapeBraces(getSystemPrompt())],
        ["user", "{message}"]
    ]);

    const finalPromot = await promptTemplate.invoke({ message: message});
    // console.log(finalPromot);
    const response =await Model.invoke(finalPromot)
    return response;
   
    // console.log(`here is response of ai ${response.content}`)
    
}


export { EnrichPrompt,ChatMessage }