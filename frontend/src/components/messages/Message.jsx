import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { useConversation } from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

const Message =({message}) => {
    const {authUser} = useAuthContext();
    const {selectedConversation} = useConversation();

    const fromMe= message.senderId === authUser._id;

    const chatClassName= fromMe? 'chat-end': 'chat-start'; 
    const profilePic= fromMe? authUser.profilepic: selectedConversation?.profilepic;
    const bubbleBgColor= fromMe? 'bg-blue-500' : "";
    const messageTime= extractTime(message.createdAt);
    const shakeClass= message.shouldShake? "new-message": "";
  return (
    <div className={`chat ${chatClassName}`}>

        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src= {profilePic || pp.png} />
            </div>
        </div>

        <div className={`chat-bubble message text-white opacity-70 ${bubbleBgColor} ${shakeClass}`}>{message.message}</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 p-2 items-center '> {messageTime} </div>

    </div>
  )
}

export default Message