import React, { useContext } from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../../hooks/useGetConversations';
import { getRandomEmoji } from '../../../utils/emojis';

export default function Conversations() {
  const { loading, conversations } = useGetConversations();

  return (
    <div className='py-2 flex flex-col overflow-auto mb-3'>
      {conversations.map((conversation, idx) => (
        <Conversation 
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === (conversations.length - 1)}
        />
      ))}
      {loading ? <span className='loading loading-spinner'></span> : null}
    </div>
  )
}
