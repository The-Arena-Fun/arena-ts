'use client';

import React, { useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

import ExampleAvatarA from '@/app/assets/images/example-avatar.png'
import ExampleAvatarB from '@/app/assets/images/example-avatar-1.png'
import { Button } from '@/components/ui/button';
import { useMatchMakingContext } from '@/components/atoms/JoinGame/MatchMakingProvider';
import { MatchOpponent } from '@/components/atoms/JoinGame/MatchOpponent';
import { MVPMatchInformation } from '@/components/atoms/JoinGame/MatchInformation';
import { shortenAddress } from '@/utils/strings';
import { MatchFoundCTAs } from './MatchFoundCTAs';
import { useMe } from '@/hooks/auth/useMe';

export function MatchFound() {
  const { activeMatchQuery, } = useMatchMakingContext()
  const { publicKey } = useWallet()
  // const { data } = useMe()
  // console.log("data", data?.pfp)

  const avatarA = publicKey?.toString() === "GmmK8Yh7LWCHLnMzqNt7yLz17cX7JfrP7bXppHquXrDY"
    ? ExampleAvatarA : ExampleAvatarB

  const avatarB = publicKey?.toString() === "GmmK8Yh7LWCHLnMzqNt7yLz17cX7JfrP7bXppHquXrDY"
    ? ExampleAvatarB : ExampleAvatarA

  const requiredDepositAmount = useMemo(() => {
    const wage = activeMatchQuery.data?.match.individual_wage_amount ?? 0
    const trade = activeMatchQuery.data?.match.individual_trade_amount ?? 0
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
            image={avatarA}
            label={shortenAddress(publicKey?.toBase58())} />
          <p>vs</p>
          <MatchOpponent
            image={avatarB}
            label={shortenAddress(activeMatchQuery.data?.opponent?.pubkey)} />
        </div>
        <MVPMatchInformation />
      </div>
      <MatchFoundCTAs />
    </div>
  )
}