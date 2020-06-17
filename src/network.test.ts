import { getNetwork, NETWORK_MAINNET, NETWORK_TESTNET, NETWORK_UNKNOWN } from './network';

jest.mock('./jsonrpc/api', () => ({
  getVersion(url: string) {
    switch (url) {
      case 'https://ethereum-node':
        return 1;
      case 'https://ropsten-node':
        return 3;
      case 'https://unknown-node':
        return 10;
    }
  }
}));

describe('getNetwork', () => {
  it('returns the current active network', async () => {
    await expect(getNetwork('https://ethereum-node')).resolves.toBe(NETWORK_MAINNET);
    await expect(getNetwork('https://ropsten-node')).resolves.toBe(NETWORK_TESTNET);
    await expect(getNetwork('https://unknown-node')).resolves.toBe(NETWORK_UNKNOWN);
  });
});
