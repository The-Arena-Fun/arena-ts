import Image from 'next/image';

import ExampleAvatar2 from '@/app/assets/images/example-avatar-2.png'
import { TopPerformerCardInfoItem } from "@/components/atoms/Leaderboard/TopPerformerCardInfoItem";
import { XPTag } from '@/components/atoms/Leaderboard/XPTag';
import Winner from '@/app/assets/svgs/winner.svg'

export function TopPerformerCardInfo() {
  return (
    <div className='flex flex-col items-center gap-y-3'>
      <Image src={Winner} alt='winner' />
      <div className="border rounded-xl pt-8 pb-6 px-10 flex flex-col items-center">
        <div className='flex flex-col items-center'>
          <Image
            src={ExampleAvatar2}
            alt="avatar"
            className="w-24 h-24 rounded-full mb-4" />
          <p className='text-white text-sm opacity-50 pb-2'>
            BURGERBOB
          </p>
          <p className='text-white text-xl'>
            3rd
          </p>
        </div>
        <div className='py-6'>
          <XPTag />
        </div>
        <div className="flex flex-1 flex-row justify-between items-center gap-x-8">
          <TopPerformerCardInfoItem heading="Volume" description="123K" />
          <TopPerformerCardInfoItem heading="Winrate" description="675" />
          <TopPerformerCardInfoItem heading="Trades" description="1,092" />
          <TopPerformerCardInfoItem heading="Games" description="392" />
        </div>
      </div>
    </div>
  );
}