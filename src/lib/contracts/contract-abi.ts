export const TIME_TRACKER_ABI = [
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "projectId",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      }
    ],
    "name": "addTimeRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "projectId",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "recordIndex",
        "type": "uint256"
      }
    ],
    "name": "approveTimeRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "projectId",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "freelancer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "ratePerHour",
        "type": "uint256"
      }
    ],
    "name": "createProject",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";