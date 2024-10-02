'use client';

import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import BattleLogo from '@/app/assets/logos/battlelogo.png'
import Twitter from '@/app/assets/logos/twitter.png'
import './blob.css'
import Link from "next/link";

export function JoinGame() {
  const router = useRouter()
  const onJoin = () => {
    router.push('/game')
  }
  return (
    <div className="flex flex-1 flex-col gap-y-4 w-full items-center mt-[-70px]">
      <Link
        target="_blank"
        href="https://twitter.com"
        className="btn-gray  absolute top-[20px] right-[20px]"
      >
        <Image
          className="h-[14px] w-[18px]"
          src={Twitter}
          alt={`twitter`}
          priority
        />
      </Link>
      <Image
        className="h-[60px] w-[60px] mb-5"
        src={BattleLogo}
        alt={`battlelogo`}
        priority
      />

      < div className="w-full sm:max-w-lg max-w-md rounded-md border-2 border-[#28323C] p-6 flex flex-1 flex-col gap-y-4" >
        <Button className="flex flex-1 bg-[#0A0C0F] text-white border-2 border-[#28323C] py-4 hover:text-black"
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
        </div>
      </div >
      <Link
        target="_blank"
        href="https://docs.google.com/forms/d/e/1FAIpQLSdmkgeIi-Rtrwk5ntlwOlSZYYaHdRDe37RT7IqL4ktE_rSL0A/viewform"
        className="btn"
      >
        <p className="text-sm uppercase">Join waitlist</p>
      </Link>
      <div class="bottom">
        <div class="blob">
          <div class="circle circle1"></div>
          <div class="circle circle2"></div>
          <div class="circle circle3"></div>
          <div class="circle circle4"></div>
          <div class="circle circle5"></div>
        </div>
      </div>
      <div className="lines">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
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