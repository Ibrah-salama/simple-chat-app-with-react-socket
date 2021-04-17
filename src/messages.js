const express = require('express');
const messagesRouter = express.Router()


messages = [];
messagesRouter.get('/',(req,res,next)=>{
    console.log("test",messages)
    const last = req.query.last
    console.log("test2",messages)
    console.log("last",last)
    if (last === 0 || last === undefined) 
    {
        console.log(messages)
        res.json(messages);
        console.log(messages)
    }
    else 
    {
        console.log("hi")
        const filteredMessage = messages.filter((message)=>{
            if (message.time > last) {
                return message
            }
        })
        res.json(filteredMessage)
        console.log(filteredMessage)
    }
})


messagesRouter.post('/',async(req, res)=>{
    try
    {
        messages.push(req.body);
        console.log(messages)
        res.json({status: "Ok"});
    }
    catch(e)
    {
        
    }
})

const subscribers = {};

messagesRouter.post('/subscribe', (req,res)=>{
    console.log("sub",req.body)
    const { id } = req.body;
    subscribers[id] = res;
    // console.log(subscribers)
    req.on('close', ()=>{
        delete subscribers[id];
    })
})

messagesRouter.post('/long',async (req,res)=>{
    try
    {
        console.log("1",req.body)
        Object.entries(subscribers).forEach(([id, responce])=>
        {
            delete subscribers[id];
            // console.log(subscribers)
            // console.log(responce)
            responce.json(req.body)
        });
        console.log("3")
        res.json({status: "Ok"});   
    }
    catch(e)
    {

    }

})



module.exports = {
    messagesRouter,
    messages}