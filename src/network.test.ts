import networks from './config/networks.json';
import { getDefaultNetwork, getNetwork, getSupportedNetworks } from './network';

jest.mock('./jsonrpc/api', () => ({
  getVersion(url: string) {
    switch (url) {
      case 'https://ethereum-node':
        return 1;
      case 'https://ropsten-node':
        return 3;
    }
  }
}));

describe('getDefaultNetwork', () => {
  it('returns the Ethereum Mainnet network', () => {
    expect(getDefaultNetwork()).toHaveProperty('name', 'Ethereum Mainnet');
  });
});

describe('getSupportedNetworks', () => {
  it('returns all supported networks', () => {
    expect(getSupportedNetworks()).toStrictEqual(networks);
  });
});

describe('getNetwork', () => {
  it('returns the current active network', async () => {
    await expect(getNetwork('https://ethereum-node')).resolves.toHaveProperty('name', 'Ethereum Mainnet');
    await expect(getNetwork('https://ropsten-node')).resolves.toHaveProperty('name', 'Ethereum Testnet Ropsten');
  });
});
