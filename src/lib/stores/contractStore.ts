import { writable } from 'svelte/store';
import type { Contract } from 'web3';
import Web3 from 'web3';
import { TIME_TRACKER_ABI, CONTRACT_ADDRESS } from '../contracts/contract-abi';
import { web3Store } from './web3Store';

interface ContractState {
  contract: Contract | null;
  loading: boolean;
  error: string | null;
}

const initialState: ContractState = {
  contract: null,
  loading: false,
  error: null
};

function createContractStore() {
  const { subscribe, set, update } = writable<ContractState>(initialState);

  return {
    subscribe,
    initialize: async (web3: Web3) => {
      try {
        update(state => ({ ...state, loading: true, error: null }));
        const contract = new web3.eth.Contract(TIME_TRACKER_ABI, CONTRACT_ADDRESS);
        set({ contract, loading: false, error: null });
        return contract;
      } catch (err) {
        set({ contract: null, loading: false, error: err.message });
        throw err;
      }
    },
    reset: () => set(initialState)
  };
}

export const contractStore = createContractStore();

// Initialize contract when web3 is connected
web3Store.subscribe(({ web3, connected }) => {
  if (web3 && connected) {
    contractStore.initialize(web3).catch(console.error);
  } else {
    contractStore.reset();
  }
});