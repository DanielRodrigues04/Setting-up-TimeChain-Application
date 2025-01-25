<script lang="ts">
  import { onDestroy } from 'svelte';
  import { web3Store } from '../stores/web3Store';
  import { contractStore } from '../stores/contractStore';
  import { fade, scale } from 'svelte/transition';
  
  let isTracking = false;
  let startTime: number | null = null;
  let elapsedTime = 0;
  let timerInterval: number;
  let error = '';
  let saving = false;

  const PROJECT_ID = '0x1234567890123456789012345678901234567890123456789012345678901234';

  function startTracking() {
    isTracking = true;
    startTime = Date.now();
    elapsedTime = 0;
    timerInterval = setInterval(updateTimer, 1000);
  }

  async function stopTracking() {
    if (!startTime) return;
    
    isTracking = false;
    clearInterval(timerInterval);
    
    const endTime = Date.now();
    
    try {
      saving = true;
      error = '';
      
      const { contract } = $contractStore;
      const { account } = $web3Store;
      
      if (!contract || !account) {
        throw new Error('Contract or account not initialized');
      }

      const startTimeSeconds = Math.floor(startTime / 1000);
      const endTimeSeconds = Math.floor(endTime / 1000);
      
      await contract.methods
        .addTimeRecord(PROJECT_ID, startTimeSeconds, endTimeSeconds)
        .send({ from: account });
      
      startTime = null;
      elapsedTime = 0;
      
    } catch (err) {
      error = err.message || 'Failed to save time record';
      console.error('Error saving time record:', err);
    } finally {
      saving = false;
    }
  }

  function updateTimer() {
    if (startTime !== null) {
      elapsedTime = Date.now() - startTime;
    }
  }

  function formatTime(ms: number): string {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  onDestroy(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  });
</script>

<div
  class="flex flex-col items-center gap-6 p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl"
  in:scale="{{ duration: 400, start: 0.95 }}"
>
  <h2 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
    Time Tracker
  </h2>
  
  {#if error}
    <div class="text-red-400 text-sm p-3 bg-red-500/10 rounded-lg" transition:fade>
      {error}
    </div>
  {/if}
  
  <div class="text-6xl font-mono font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
    {formatTime(elapsedTime)}
  </div>
  
  <div class="flex gap-4">
    {#if !isTracking}
      <button
        class="relative overflow-hidden group bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-8 rounded-lg transform transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
        on:click={startTracking}
        disabled={saving}
      >
        <span class="relative z-10">Start</span>
        <div class="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 transform -skew-x-12 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>
      </button>
    {:else}
      <button
        class="relative overflow-hidden group bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold py-3 px-8 rounded-lg transform transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
        on:click={stopTracking}
        disabled={saving}
      >
        <span class="relative z-10">{saving ? 'Saving...' : 'Stop'}</span>
        <div class="absolute inset-0 bg-gradient-to-r from-red-400/20 to-rose-400/20 transform -skew-x-12 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>
      </button>
    {/if}
  </div>
</div>