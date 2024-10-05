'use client';

import React, { useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

import ExampleAvatar from '@/app/assets/images/example-avatar.png'
import { Button } from '@/components/ui/button';
import { useMatchMakingContext } from '@/components/atoms/JoinGame/MatchMakingProvider';
import { MatchOpponent } from '@/components/atoms/JoinGame/MatchOpponent';
import { MVPMatchInformation } from '@/components/atoms/JoinGame/MatchInformation';
import { shortenAddress } from '@/utils/strings';

export function MatchFound() {
  const { activeMatchQuery, declineMatch, acceptMatch, onCancel, onDecline, onAccept } = useMatchMakingContext()
  const { publicKey } = useWallet()

  const requiredDepositAmount = useMemo(() => {
    const wage =activeMatchQuery.data?.match.individual_wage_amount ?? 0 
    const trade =activeMatchQuery.data?.match.individual_trade_amount ?? 0
    return wage + trade
  }, [activeMatchQuery.data])
  
  return (
    <div className="w-100% max-w-md flex flex-col flex-1 gap-y-4">
      <div className="rounded-md border border-trade-up p-6 flex flex-1 flex-col gap-y-4">
        <p className="text-center text-sm">
          Match found!
        </p>
        <div className="flex flex-row items-center justify-center gap-x-4 py-4">
          <MatchOpponent
            image={ExampleAvatar}
            label={shortenAddress(publicKey?.toBase58())} />
          <p>vs</p>
          <MatchOpponent
            label={shortenAddress(activeMatchQuery.data?.opponent?.pubkey)} />
        </div>
        <MVPMatchInformation />
      </div>
      <button
        className="text-xs flex flex-1 text-center text-gray-500 border-trade-up bg-trade-up"
        onClick={onCancel}>

      </button>
      <Button
        variant='up'
        isLoading={acceptMatch.isPending}
        disabled={acceptMatch.isPending}
        onClick={onAccept}>
        Deposit ${requiredDepositAmount}
      </Button>
      <Button
        variant='ghost'
        isLoading={declineMatch.isPending}
        onClick={onDecline}>
        Decline
      </Button>
    </div>
  )
}