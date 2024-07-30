import React, { useState } from 'react'
import {BsSend} from "react-icons/bs"
import useSendMessage from '../../hooks/useSendMessage'

const MessageInput = () => {
  const {loading,sendMessage} = useSendMessage();
  const [text,setText]=useState("");
  const handleSubmit= async(e)=>{
    e.preventDefault();
    if(!text) return;
    await sendMessage(text);
    setText("");
  }


  return (
    <form className='px-4 my-3 ' onSubmit={handleSubmit}>
        <div className='w-full relative'>
            <input type="text" className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'  placeholder='Send a message' value={text} onChange={(e)=>setText(e.target.value)}/>
            <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3' disabled={loading} >
                {loading? <span className='loading loading-spinner'/>: <BsSend/> }
            </button>
        </div>

    </form>
  )
}

export default MessageInput