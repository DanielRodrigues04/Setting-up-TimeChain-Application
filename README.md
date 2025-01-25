# TimeChain Tracker 🕒⛓️

A blockchain-powered time tracking solution for freelancers and remote teams. TimeChain Tracker provides transparent, immutable time records stored directly on the blockchain.

## Features ✨

- **Blockchain Integration**: All time records are stored on the Ethereum/Polygon blockchain
- **Smart Contract Security**: Automated time tracking with smart contract validation
- **Web3 Integration**: Easy connection with MetaMask and other Web3 wallets
- **Real-time Tracking**: Accurate time tracking with a beautiful, animated interface
- **Transparent Records**: All time entries are publicly verifiable on the blockchain

## Tech Stack 🛠️

- **Frontend**: Svelte + TypeScript
- **Styling**: TailwindCSS
- **Blockchain**: Ethereum/Polygon
- **Smart Contracts**: Solidity
- **Web3 Integration**: Web3.js + MetaMask

## Getting Started 🚀

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Smart Contract Integration 📝

The project uses a custom TimeTracker smart contract that handles:

- Project creation and management
- Time record storage
- Client approval system
- Rate per hour tracking

### Contract Setup

1. Deploy the TimeTracker contract to your chosen network
2. Update the `CONTRACT_ADDRESS` in `src/lib/contracts/contract-abi.ts`
3. Ensure you have MetaMask or another Web3 wallet installed

## Usage 📱

1. Connect your Web3 wallet
2. Start tracking time with the "Start" button
3. Stop tracking when done
4. Time record will be automatically saved to the blockchain

## Project Structure 📁

```
src/
├── lib/
│   ├── components/
│   │   ├── TimeTracker.svelte
│   │   └── WalletConnect.svelte
│   ├── contracts/
│   │   ├── TimeTracker.sol
│   │   └── contract-abi.ts
│   └── stores/
│       ├── contractStore.ts
│       └── web3Store.ts
├── App.svelte
└── main.ts
```

## Contributing 🤝

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License 📄

MIT License - see LICENSE file for details

## Contact 📧

For questions and support, please open an issue in the GitHub repository.