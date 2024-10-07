'use client';

import ExampleAvatar1 from '@/app/assets/images/example-avatar-1.png'
import { useMe } from '@/hooks/auth/useMe';
import { useChatMessageSend } from '@/hooks/chat/useChatMessageSend';
import Image from 'next/image'
import { useState } from 'react';

export function ChatInput() {
  const meQuery = useMe();
  console.log("chatInput", meQuery.data)
  const sendMessage = useChatMessageSend();
  const [message, setMessage] = useState<string>('')
  return (
    <div className="p-4 border rounded-md w-full flex flex-row items-center w-full flex-shrink-1 gap-x-4">
      <img src={meQuery.data?.pfp} alt='avatar' className='w-10 h-10' />
      <input
        className='bg-transparent outline-none text-xs flex-1'
        placeholder='Message ...'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onSubmit={() => {
          console.log('on submit')
        }}
        onKeyUp={({ key }) => {
          if (key === 'Enter') {
            sendMessage.mutateAsync(message).then(() => setMessage(''))
          }
        }} />
    </div>
  )
}