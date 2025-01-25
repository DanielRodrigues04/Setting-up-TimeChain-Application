<script lang="ts">
  import { onMount } from 'svelte';
  import { web3Store } from '../stores/web3Store';
  import Web3 from 'web3';
  import detectEthereumProvider from '@metamask/detect-provider';
  import { fade } from 'svelte/transition';

  let connecting = false;
  let error = '';
  let hovered = false;

  async function connectWallet() {
    try {
      connecting = true;
      error = '';
      
      const provider = await detectEthereumProvider();
      
      if (!provider) {
        throw new Error('Please install MetaMask!');
      }

      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      const chainId = await provider.request({ method: 'eth_chainId' });
      
      const web3 = new Web3(provider as any);
      
      web3Store.set({
        web3,
        account: accounts[0],
        chainId,
        connected: true
      });
    } catch (err) {
      error = err.message || 'Failed to connect wallet';
    } finally {
      connecting = false;
    }
  }
</script>

<div class="flex flex-col items-center gap-4" in:fade>
  {#if error}
    <div class="text-red-400 mb-4 p-3 bg-red-500/10 rounded-lg" transition:fade>
      {error}
    </div>
  {/if}
  
  <button
    class="relative overflow-hidden group bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-8 rounded-lg transform transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
    on:click={connectWallet}
    on:mouseenter={() => hovered = true}
    on:mouseleave={() => hovered = false}
    disabled={connecting}
  >
    <div class="relative z-10 flex items-center gap-2">
      {#if connecting}
        <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
        <span>Connecting...</span>
      {:else}
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
        </svg>
        <span>Connect Wallet</span>
      {/if}
    </div>
    
    {#if hovered}
      <div
        class="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 transform -skew-x-12 transition-transform duration-700"
        in:fade="{{ duration: 200 }}"
      ></div>
    {/if}
  </button>
</div>