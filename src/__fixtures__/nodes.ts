import { Network } from '../network';

export const ETHEREUM_NODE: Network = {
  name: 'Ethereum Mainnet',
  chain: 'ETH',
  network: 'mainnet',
  rpc: ['https://ethereum-node'],
  faucets: [],
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  infoURL: 'https://ethereum.org',
  shortName: 'eth',
  chainId: 1,
  networkId: 1,
  slip44: 60,
  ens: {
    registry: '0x314159265dd8dbb310642f98f50c066173c1259b'
  }
};

export const EXPANDE_NODE: Network = {
  name: 'Expanse Network',
  chain: 'EXP',
  network: 'mainnet',
  rpc: ['https://node.expanse.tech'],
  faucets: [],
  nativeCurrency: {
    name: 'Expanse Network Ether',
    symbol: 'EXP',
    decimals: 18
  },
  infoURL: 'https://expanse.tech',
  shortName: 'exp',
  chainId: 2,
  networkId: 1,
  slip44: 40
};
