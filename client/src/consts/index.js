export const contractAddress = "0x3f521e008B1593c79111eE4906b33A32D1DcE247"

export const ABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "newData",
          "type": "string"
        }
      ],
      "name": "DataStored",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "getData",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_data",
          "type": "string"
        }
      ],
      "name": "setData",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
]
