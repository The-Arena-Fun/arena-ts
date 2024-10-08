import ExampleAvatar2 from '@/app/assets/images/example-avatar-2.png'
import { LeaderboardPlayers } from '@/components/atoms/Leaderboard/LeaderboardPlayers';
import { TopPerformerCardInfo } from '@/components/atoms/Leaderboard/TopPerformerCardInfo';
import { TopPerformers } from '@/components/atoms/Leaderboard/TopPerformers';

export default async function Home() {
  return (
    <div className='w-full'>
      <div className='max-w-7xl mx-auto w-full flex flex-col gap-y-12'>
        <TopPerformers />
        <LeaderboardPlayers />
      </div>
    </div>
  );
}
