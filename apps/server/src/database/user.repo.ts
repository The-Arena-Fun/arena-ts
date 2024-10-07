import { Injectable } from '@nestjs/common';
import { PublicKey, Keypair } from '@solana/web3.js';
import bs58 from 'bs58'

import { DatabaseService } from './database.service';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class UserRepository {
  constructor(
    private readonly database: DatabaseService,
    private readonly wallet: WalletService
  ) { }

  public async create(inputs: {
    pubkey: PublicKey
  }) {
    const pfp_url = inputs.pubkey.toString() === "GmmK8Yh7LWCHLnMzqNt7yLz17cX7JfrP7bXppHquXrDY" ?
      // dumpling
      "https://pbs.twimg.com/profile_images/1776337353306415104/3aICr3qw_400x400.png" :
      // bob
      "https://pbs.twimg.com/profile_images/1740125899163328512/Z_lShBa6_400x400.jpg"
    const results = await this.database.supabase
      .from('users')
      .insert({
        pubkey: inputs.pubkey.toBase58(),
        wallet_private_key: this.wallet.generatePrivateKey(),
        pfp: pfp_url
      })
      .select()
      .single()
    if (results.error) throw results.error;
    return results.data
  }

  public async findById(id: string) {
    const results = await this.database.supabase
      .from('users')
      .select()
      .eq('id', id)
      .single()
    if (results.error) throw results.error;
    return results.data
  }

  public async findByPubkey(pubkey: PublicKey) {
    const results = await this.database.supabase
      .from('users')
      .select()
      .eq('pubkey', pubkey.toBase58())
      .single()
    if (results.error) throw results.error;
    return results.data
  }

  public async list() {
    const results = await this.database.supabase.from('users').select()
    if (results.error) throw results.error;
    return results.data
  }
}
