<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import WalletConnect from './lib/components/WalletConnect.svelte';
  import TimeTracker from './lib/components/TimeTracker.svelte';
  import { web3Store } from './lib/stores/web3Store';
</script>

<main class="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white">
  <div class="container mx-auto px-4 py-12">
    <div class="text-center mb-12" in:fly="{{ y: -20, duration: 1000 }}">
      <h1 class="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
        TimeChain Tracker
      </h1>
      <p class="text-xl text-blue-200 max-w-2xl mx-auto">
        Track your time securely and transparently on the blockchain. Perfect for freelancers and remote teams.
      </p>
    </div>
    
    {#if !$web3Store.connected}
      <div class="max-w-md mx-auto" in:fade="{{ duration: 800 }}">
        <div class="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
          <h2 class="text-2xl font-semibold mb-6 text-center">Connect Your Wallet</h2>
          <WalletConnect />
          
          <div class="mt-8 grid grid-cols-2 gap-4 text-center text-sm">
            <div class="p-4 bg-white/5 rounded-lg">
              <span class="block text-xl mb-2">🔒</span>
              <h3 class="font-medium mb-1">Secure</h3>
              <p class="text-blue-200">Blockchain-powered time tracking</p>
            </div>
            <div class="p-4 bg-white/5 rounded-lg">
              <span class="block text-xl mb-2">⚡</span>
              <h3 class="font-medium mb-1">Fast</h3>
              <p class="text-blue-200">Instant time recording</p>
            </div>
          </div>
        </div>
      </div>
    {:else}
      <div class="max-w-xl mx-auto" in:fly="{{ y: 20, duration: 800 }}">
        <TimeTracker />
      </div>
    {/if}
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>