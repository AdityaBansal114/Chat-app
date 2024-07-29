import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end'>

        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src="pp.png" />
            </div>
        </div>

        {/* <div className='chat-message'>
            <div className='chat-message-inner'>
                <p className='text-sm'> Hello world</p>
            </div>
            <div className='chat-message-timestamp'>
                <span className='text-xs text-gray-500 '> 2:47 PM</span>
            </div>
        </div> */}

        <div className={`chat-bubble text-white bg-blue-500`}> Hi, how's it going?</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center '> 10:15 </div>

    </div>
  )
}

export default Message