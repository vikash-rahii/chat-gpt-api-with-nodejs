const express = require('express');
const config =  require("./config").configObj;
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: config.openaikey,
});
const openai = new OpenAIApi(configuration);
const app = express();

app.use(express.json());

app.post("/ask-me", async(req,res)=> { 
    try{
        const question = req.body.question;
        const response = await openai.createCompletion({
            model: "text-davinci-001",
            prompt: `${question}`, 
            max_tokens: 100, 
          });
        return res.status(200).json({success:true,data:(await response).data.choices[0].text})
    }catch(error){console.log(error,"error....")}
})
  
app.listen(config.port, () => {
  console.log(`Example app listening at http://localhost:${config.port}`);
});
