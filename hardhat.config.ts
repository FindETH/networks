import { HardhatUserConfig } from 'hardhat/config';

const config: HardhatUserConfig = {
  solidity: '0.7.3',
  networks: {
    hardhat: {
      accounts: [
        {
          privateKey: '0xeaf2c50dfd10524651e7e459c1286f0c2404eb0f34ffd2a1eb14373db49fceb6',
          balance: '10000000000000000000000'
        },
        {
          privateKey: '0x4adb19cafa5fdf467215fa30b56a50facac2dee40a7015063c6a7a0f1f4e2576',
          balance: '10000000000000000000000'
        },
        {
          privateKey: '0xc1fe9bf97eaac301cab7c4acdbf5180584272c58737dd52aa7eb497d1d55868c',
          balance: '10000000000000000000000'
        },
        {
          privateKey: '0x831ad595a4256fafaf310237142a9fa08945950989b12162bb26d09222884d87',
          balance: '10000000000000000000000'
        },
        {
          privateKey: '0x6afa0ddb1e16635ac3070c130597feff35cfa9bf161c7de7fd5eb436ca00fe67',
          balance: '10000000000000000000000'
        }
      ]
    }
  }
};

export default config;
