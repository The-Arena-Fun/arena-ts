import { Injectable } from '@nestjs/common';
import { PublicKey } from '@solana/web3.js';
import * as nacl from 'tweetnacl';

@Injectable()
export class AuthService {
  constructor() { }

  private generateNonce() {
    return Math.random() * 1000
  }

  public genreateLoginMessage() {
    const nonce = this.generateNonce()
    const date = new Date();
    return `thearena.fun wants you to sign in with your Solana account:

Click Sign or Approve only means you have proved this wallet is owned by you.

URI: https://thearena.fun
Version: 1
Nonce: ${nonce}
Issued At: ${date.toISOString()}
Resources:
- https://theareana.fun
    `
  }

  public verifySignedMessage(inputs: {
    message: Uint8Array,
    signature: Uint8Array,
    signer: PublicKey
  }) {
    console.log('test', nacl)
    return nacl.sign.detached.verify(
      inputs.message,
      inputs.signature,
      inputs.signer.toBytes(),
    );
  }
}
