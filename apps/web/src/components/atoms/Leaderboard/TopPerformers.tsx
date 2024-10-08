import { TopPerformerCardInfo } from '@/components/atoms/Leaderboard/TopPerformerCardInfo';

export function TopPerformers() {
  return (
    <div className='w-full flex flex-row justify-around mt-12'>
      <div className='mt-20'>
        <TopPerformerCardInfo />
      </div>
      <div>
        <TopPerformerCardInfo />
      </div>
      <div className='mt-20'>
        <TopPerformerCardInfo />
      </div>
    </div>
  );
}
