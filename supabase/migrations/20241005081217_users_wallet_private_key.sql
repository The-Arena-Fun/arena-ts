ALTER TABLE IF EXISTS public.users 
ADD COLUMN wallet_private_key TEXT NOT NULL;
UPDATE public.users
SET wallet_private_key = pubkey;
ALTER TABLE public.users
ADD CONSTRAINT unique_wallet_private_key UNIQUE (wallet_private_key);