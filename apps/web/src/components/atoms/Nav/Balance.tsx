'use client';

import Image from 'next/image'
import { useWallet } from '@solana/wallet-adapter-react'

import USDC from '@/app/assets/svgs/usdc.svg'
import { useWalletUSDCBalance } from '@/hooks/balances/useWalletUSDCBalance';

export function Balance() {
  const wallet = useWallet()
  const usdcBalanceQuery = useWalletUSDCBalance()
  const usdcUiAmount = usdcBalanceQuery.data?.value.uiAmount ?? 0
  if (!wallet.publicKey) return null;
  return (
    <div className="flex flex-row items-center gap-2 px-3 py-2 rounded-md bg-[#10141C] gap-x-8">
      <div className='flex flex-col gap-y-1'>
        <p className='text-xs text-gray-500'>Balance</p>
        <div className='flex flex-row gap-x-2'>
          <Image src={USDC} alt='usdc' />
          <p className='text-xs'>${usdcUiAmount}</p>
        </div>
      </div>
      <svg width="18" height="17" viewBox="0 0 18 17">
        <path fillRule="evenodd" clipRule="evenodd"
          d="M16.2217 2.27778C16.2217 1.29733 15.4243 0.5 14.4439 0.5H2.88835C1.41812 0.5 0.22168 1.69644 0.22168 3.16667V13.8333C0.22168 15.7898 1.81635 16.5 2.88835 16.5H16.2217C17.2021 16.5 17.9995 15.7027 17.9995 14.7222V5.83333C17.9995 4.85289 17.2021 4.05556 16.2217 4.05556V2.27778ZM14.7995 12.0556H12.6661V8.5H14.7995V12.0556ZM2.03833 3.34444C2.03833 3.91558 2.41287 4.38559 2.88835 4.41111H14.4439V2.27778H2.88835C2.41287 2.3033 2.03833 2.77331 2.03833 3.34444Z"
          fill="currentColor" />
      </svg>
    </div>
  )
}