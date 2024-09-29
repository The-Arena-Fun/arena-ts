'use client';

import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import BattleLogo from '@/app/assets/logos/battlelogo.png'
import Link from "next/link";

export function JoinGame() {
  const router = useRouter()
  const onJoin = () => {
    router.push('/game')
  }
  return (
    // <div className="flex flex-col gap-y-4 w-full">
    //   <div className="flex justify-center items-center">
    //     <Image
    //       className="object-contain h-[100px] w-[100px]"
    //       src={BattleLogo}
    //       alt={`battlelogo`}
    //     />
    //   </div>
    <div className="flex flex-col gap-y-4 w-full items-center">
      <Image
        className="h-[100px] w-[100px]"
        src={BattleLogo}
        alt={`battlelogo`}
        priority
      />
      < div className="w-full max-w-lg rounded-md border-2 border-[#28323C] p-6 flex flex-1 flex-col gap-y-4" >
        <Button className="flex flex-1 bg-[#6031C3] text-white py-4 hover:text-black"
          onClick={onJoin}
          disabled
        >
          The Arena is Under Construction
        </Button>
        <div className="flex flex-1 flex-row justify-between items-center px-2">
          <Item heading="Wager" description="X" />
          <Seperator />
          <Item heading="Trading" description="X" />
          <Seperator />
          <Item heading="Mode" description="X" />
          <Seperator />
          <Item heading="Duration" description="X" />
          {/* <Item heading="Wager" description="$10" />
        <Seperator />
        <Item heading="Trading" description="$50" />
        <Seperator />
        <Item heading="Game mode" description="First to 2x" />
        <Seperator />
        <Item heading="Duration" description="24 hrs" /> */}
        </div>
      </div >
      <Link
        target="_blank"
        href="https://docs.google.com/forms/d/e/1FAIpQLSdmkgeIi-Rtrwk5ntlwOlSZYYaHdRDe37RT7IqL4ktE_rSL0A/viewform"
      >
        <p className="text-sm underline">Join waitlist</p>
      </Link>
    </div >
  )
}

type ItemProps = {
  heading: string;
  description: string
}

function Item(props: ItemProps) {
  const { heading, description } = props;
  return (
    <div className="flex flex-col items-center">
      <p className="text-xs text-gray-500">{heading}</p>
      <p className="text-sm">{description}</p>
    </div>
  )
}

function Seperator() {
  return <div className="h-6 w-[1px] bg-[#28323C]" />
}