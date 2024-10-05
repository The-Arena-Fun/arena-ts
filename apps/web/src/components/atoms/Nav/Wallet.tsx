'use client';

import Image from 'next/image'


import { useWalletAuth } from '@/hooks/auth/useWalletAuth';

import ExampleAvatarA from '@/app/assets/images/example-avatar.png'
import ExampleAvatarB from '@/app/assets/images/example-avatar-1.png'

export function Wallet() {
  const {
    connected,
    displayUsername,
    onConnect,
    onDisconnect,
    publicKey
  } = useWalletAuth();

  const avatar = publicKey?.toString() === process.env.NEXT_PUBLIC_TRADER_A as string
    ? ExampleAvatarA : ExampleAvatarB


  return (
    <div className="flex flex-row items-center gap-2 px-3 py-2 rounded-md bg-[#10141C]">
      {connected && (
        <div className='flex flex-row items-center gap-2 cursor-pointer' onClick={onDisconnect}>
          <Image src={avatar} alt='avatar' className='w-6  h-6 '/>
          <p className='text-sm'>{displayUsername}</p>
        </div>
      )}
      {!connected && (
        <button onClick={onConnect} className='text-xs'>
          connect
        </button>
      )}
    </div>
  )
}