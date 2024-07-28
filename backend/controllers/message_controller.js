import Conversation from "../models/conversation_model.js"
import Message from "../models/message_model.js"

export const sendMessage= async(req,res)=>{
    try {
        
        const {message}= req.body;
        const {id: recieverId}= req.params;
        const senderId=req.user._id;

        let  conversation = await Conversation.findOne({
            participants : { $all: [senderId, recieverId]}
        } )

        if(!conversation){
            conversation= Conversation.create({
                participants:[senderId, recieverId],
            })
        }

        const newMessage= new Message({
             senderId: senderId,
             recieverId: recieverId,
             message:message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        

        // Socket.IO will go here




        // await conversation.save();
        // await newMessage.save();

        await Promise.all([cond=versation.save(),newMessage.save()]);

        res.status(201).json(newMessage);
        
    } catch (error) {
        console.log("error form send message controller: ", error.message)
        res.status(500).json({error: 'Internal server error'});
    }
};

export const getMessages= async(req,res)=>{
    try {

        const {id: userToChatId}=req.params;
        const senderId= req.user._id;

        const conversation= await Conversation.findOne({
            participants: {$all: [userToChatId,senderId]}
        }).populate("messages");

        if(!conversation){
            return res.status(200).jsin([]);
        }

        const messages=conversation.messages;

        res.status(200).json(messages);
        
    } catch (error) {
        console.log("error from getMessage in message_controller: ",error.message);
        res.status(500).json({error:"Internal Sercer error"});
    }
};