'use client';
import Image from "next/image"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { LeaderboardPlayer, useLeaderboardPlayers } from "@/hooks/leaderboard/useLeaderboardPlayers";

export function LeaderboardPlayers() {
  const leaderboardPlayersQuery = useLeaderboardPlayers();
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-none">
          <TableHead className="w-[10%]"/>
          <TableHead >Player</TableHead>
          <TableHead>Volume</TableHead>
          <TableHead>Winrate</TableHead>
          <TableHead>Trades</TableHead>
          <TableHead>Games</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaderboardPlayersQuery.data.map((item, index) => (
          <LeaderboardPlayerRow key={index.toString()} player={item} />
        ))}
      </TableBody>
    </Table>

  )
}

// Type, Coin, Entry, Bet amount, Bust price, Multiplier, Funding / H, PNL

type LeaderboardPlayerRowProps = {
  player: LeaderboardPlayer;
}

function LeaderboardPlayerRow(props: LeaderboardPlayerRowProps) {
  const { player } = props;
  return (
    <TableRow className="bg-[#343C4E0A]/10 border">
      <TableCell className="py-8 flex flex-row">
        <div className="flex flex-row items-center border rounded-full">
          <p className="text-lg text-white px-6">{player.position}</p>
          <Image
            className="object-contain h-12 w-12"
            src={player.player.avatar}
            alt={`avatar-${player.player.avatar}`} />
        </div>
      </TableCell>
      <TableCell>
        <p className="text-lg text-white">{player.player.name}</p>
      </TableCell>
      <TableCell>
        <p className="text-lg text-white">{player.volume}</p>
      </TableCell>
      <TableCell>
        <p className="text-lg text-trade-up">{player.winRate}</p>
      </TableCell>
      <TableCell>
        <p className="text-lg text-white">{player.trades}</p>
      </TableCell>
      <TableCell>
        <p className={`text-lg text-white`}>{player.games}</p>
      </TableCell>
    </TableRow>
  )
}