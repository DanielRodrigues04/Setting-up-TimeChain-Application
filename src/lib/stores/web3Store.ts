import { writable } from 'svelte/store';
import type { Web3 } from 'web3';
import type { MetaMaskInpageProvider } from '@metamask/providers';

interface Web3State {
  web3: Web3 | null;
  account: string | null;
  chainId: string | null;
  connected: boolean;
}

const initialState: Web3State = {
  web3: null,
  account: null,
  chainId: null,
  connected: false
};

export const web3Store = writable<Web3State>(initialState);