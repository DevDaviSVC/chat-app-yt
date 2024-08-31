import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';

export default function Messages() {
  const {messages, loading} = useGetMessages();
  const lastMessageRef = useRef();
  useListenMessages();
  
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behavior: "smooth"});
    }, 100);
  }, [messages]);

  return (
    <div className='px-4 flex-1 overflow-auto'>
        {loading ? [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />) : (
          <>
            {messages.length === 0 ? <p className='text-center'>Send a message to start the conversation!</p> : (
              <>
                {
                  messages.map((message, idx) => (
                    <div key={idx}
                      ref={lastMessageRef}
                    >
                      <Message message={message} />
                    </div>
                  ))
                }
              </>
            )}
          </>
        )}
    </div>
  )
}
