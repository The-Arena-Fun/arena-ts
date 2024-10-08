'use client';

import { StaticImageData } from "next/image";
import { useQuery } from "@tanstack/react-query";

import ExampleAvatar2 from '@/app/assets/images/example-avatar-2.png'

export type LeaderboardPlayer = {
  position: string;
  player: {
    name: string
    avatar: StaticImageData;
  };
  volume: string;
  winRate: string
  trades: string
  games: string
}

const QUERY_KEY = 'leaderboard-players';

export function useLeaderboardPlayers() {
  return useQuery<LeaderboardPlayer[]>({
    queryKey: [QUERY_KEY],
    queryFn: () => [
      {
        position: '4',
        player: {
          name: 'cokezero',
          avatar: ExampleAvatar2
        },
        volume: '123k',
        winRate: '67%',
        trades: '851',
        games: '851'
      },
      {
        position: '5',
        player: {
          name: 'Jimbo',
          avatar: ExampleAvatar2
        },
        volume: '123k',
        winRate: '67%',
        trades: '851',
        games: '851'
      },
      {
        position: '6',
        player: {
          name: 'North',
          avatar: ExampleAvatar2
        },
        volume: '123k',
        winRate: '67%',
        trades: '851',
        games: '851'
      },
      {
        position: '7',
        player: {
          name: 'North',
          avatar: ExampleAvatar2
        },
        volume: '123k',
        winRate: '67%',
        trades: '851',
        games: '851'
      },
    ],
    initialData: []
  })
}
