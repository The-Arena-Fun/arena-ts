'use client';

import ExampleAvatar from '@/app/assets/images/example-avatar.png'
import ExampleAvatar1 from '@/app/assets/images/example-avatar-1.png'
import { useMatchContext } from '@/contexts/MatchProvider';

import { useQuery } from "@tanstack/react-query";
import { StaticImageData } from 'next/image';
import { trpc } from '@/app/trpc';
import { useMe } from '../auth/useMe';

type ChatMessageItem = {
  avatar: string;
  from: string;
  time: string;
  message: string;
}

const QUERY_KEY = 'chat-messages';

export function useChatMessages() {
  const meQuery = useMe();

  const { matchId } = useMatchContext()
  return useQuery<ChatMessageItem[]>({
    queryKey: [QUERY_KEY, matchId],
    queryFn: () => {
      return trpc.message.read.query({
        matchId
      }).then(messages => messages.map(message => ({
        id: message.id,
        // dumping ? dumpling : bob
        avatar: message.user_id === '622e0c4c-0722-4bae-92c7-57e343f884c1' ? 'https://pbs.twimg.com/profile_images/1776337353306415104/3aICr3qw_400x400.png' : "https://pbs.twimg.com/profile_images/1740125899163328512/Z_lShBa6_400x400.jpg",
        from: message.user_id === '622e0c4c-0722-4bae-92c7-57e343f884c1' ? 'DUMPLING' : 'BURGERBOB',
        time: '6 min ago',
        message: message.message
      })));
    },
    enabled: Boolean(meQuery.data?.id),
    refetchInterval: 1000
  })
}

useChatMessages.queryKey = QUERY_KEY