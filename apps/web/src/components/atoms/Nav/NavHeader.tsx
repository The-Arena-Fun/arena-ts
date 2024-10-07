'use client';

import Link from 'next/link';
import Image from 'next/image'

import Logo from '@/app/assets/svgs/logo.svg'
import { Wallet } from "@/components/atoms/Nav/Wallet";
import { Balance } from "@/components/atoms/Nav/Balance";
import { MintUSDC } from '@/components/atoms/FakeUSDC/MintUSDC';
import { useMutation } from '@tanstack/react-query';
import { trpc } from '@/app/trpc';

export function NavHeader() {
  const mintUSDC = useMutation({
    mutationFn: () => trpc.treasury.mint.mutate()
  });
  return (
    <nav className="w-full py-4 px-4 flex flex-row items-center justify-between sticky top-0 bg-background z-10">
      <Link href="/" onClick={() => mintUSDC.mutateAsync()}>
        <Image
          className="pl-2"
          src={Logo}
          width={138}
          height={45}
          alt="logo"
        />
      </Link>
      <div className="flex flex-row gap-x-4 items-center">
        {/* <MintUSDC /> */}
        {/* <Link href="/pnl-demo" className="text-sm text-gray-300 hover:text-white">
          PnL Demo
        </Link> */}
        <Balance />
        <Wallet />
      </div>
    </nav>
  );
}