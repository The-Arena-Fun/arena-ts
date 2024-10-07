-- Insert into support_tokens
insert into support_tokens
  (id, name, token_pubkey)
values
  ('c3fb1a62-b875-44d1-ab0c-3459e7faa2bd', 'USDC', 'FSxJ85FXVsXSr51SeWf9ciJWTcRnqKFSmBgRDeL3KyWw'),
  ('c3fb1a62-b875-44d1-ab0c-3459e7faa2b2', 'USDC (devnet)', '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU'),
  ('c3fb1a62-b875-44d1-ab0c-3459e7faa2b3', 'USDC (fake)', 'DhY8Ev1dWJChmx1fj6RwMnWrisx8LziKuJq7rXmYYo1s');

-- Insert into users
insert into users
  (id, pubkey, wallet_private_key, created_at, pfp)
values
  ('4abcbbfc-3118-40dd-80f8-c94ea4498efc', 'C9f6PDoSmrgeHrTRqswstXPjYyP4HHEsGM8yhHdjoSqE', 'MTdFwehpW8xVKa84LD7vWaakzLuNLdHsuS58XMgFresoEktjdKiYvf9JvnAkBJKMZWGzcWTYPSpqKELJ3NMb98s', '2024-10-06 23:26:48.618612+00', 'https://pbs.twimg.com/profile_images/1776337353306415104/3aICr3qw_400x400.png'),
  ('8508ebb8-1154-482a-943c-d108a3ffbf74', 'DpZek5nJ2ZTMWNKs35ZCDWoqbtfZ93NcV5f3bheC5CbW', 'kY1HPsKoZWioDD61samDZAzhA8PvANyr4VRK7cNhWL3ypcKUjFbAL5JsZLFouv1SJ9USi24G1cycNgTpR21A6HJ', '2024-10-06 23:38:28.567943+00', 'https://pbs.twimg.com/profile_images/1740125899163328512/Z_lShBa6_400x400.jpg');


-- Insert into matches
insert into matches
  (id, game_type, created_at, status, token, individual_wage_amount, individual_trade_amount)
values
  ('fd882ef9-40b8-4ca1-9dcd-11effcac1860', 'one_vs_one', '2024-10-06 23:39:19.463868+00', 'active', 'c3fb1a62-b875-44d1-ab0c-3459e7faa2bd', '5', '20');


-- Insert into match_participants
insert into match_participants
  (id, user_id, match_id, invite_state, game_wallet_private_key)
values
  ('5e1c75e5-3f34-4b82-91a9-d22f89b2d9ab', '4abcbbfc-3118-40dd-80f8-c94ea4498efc', 'fd882ef9-40b8-4ca1-9dcd-11effcac1860', 'accepted', '3Xw2femoLGjjZxSwJw9ZUo8C6hgtMyHs5MstcgCZXk6sy9DyDi6PMnxnfAUojSokEbFp1BkRU5yNdAWKg2QK3sEp'),
  ('803b74bf-fe10-48fa-847e-d1a915893f60', '8508ebb8-1154-482a-943c-d108a3ffbf74', 'fd882ef9-40b8-4ca1-9dcd-11effcac1860', 'accepted', 'CSq5Us1T7cunT8nYimfsZceHiGjmRMh7d6v1nWrmomQsmYVF6vxGEHuN2wisFVyzdkYDs6dLwVaGaMidFdjks8W');

