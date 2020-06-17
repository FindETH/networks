import { getEtherBalances, getTokenBalances, isEthScanSupported } from './balance';

jest.mock('@mycrypto/eth-scan');
jest.mock('./network', () => ({
  async getNetwork(url: string) {
    switch (url) {
      case 'https://ethereum-node':
        return { networkId: 1 };
      case 'https://unknown-node':
        return undefined;
      default:
        return { networkId: 2 };
    }
  }
}));

jest.mock('./jsonrpc/api', () => ({
  async getBalance() {
    return 1n;
  },

  async call() {
    return '0x1';
  }
}));

describe('isEthScanSupported', () => {
  it('returns true for eth-scan supported networks', async () => {
    await expect(isEthScanSupported('https://ethereum-node')).resolves.toBe(true);
  });

  it('returns false for non-eth-scan supported networks', async () => {
    await expect(isEthScanSupported('https://unknown-node')).resolves.toBe(false);
    await expect(isEthScanSupported('https://foo-bar-node')).resolves.toBe(false);
  });
});

describe('getEtherBalances', () => {
  it('gets the Ether balance for multiple addresses for eth-scan supported networks', async () => {
    await expect(
      getEtherBalances('https://ethereum-node', [
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000001',
        '0x0000000000000000000000000000000000000002'
      ])
    ).resolves.toMatchSnapshot();
  });

  it('gets the Ether balance for multiple addresses for non-eth-scan supported networks', async () => {
    await expect(
      getEtherBalances('https://unknown-node', [
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000001',
        '0x0000000000000000000000000000000000000002'
      ])
    ).resolves.toMatchSnapshot();
  });
});

describe('getTokenBalances', () => {
  it('gets the token balance for multiple addresses for eth-scan supported networks', async () => {
    await expect(
      getTokenBalances('https://ethereum-node', '0x6b175474e89094c44da98b954eedeac495271d0f', [
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000001',
        '0x0000000000000000000000000000000000000002'
      ])
    ).resolves.toMatchSnapshot();
  });

  it('gets the token balance for multiple addresses for non-eth-scan supported networks', async () => {
    await expect(
      getTokenBalances('https://unknown-node', '0x6b175474e89094c44da98b954eedeac495271d0f', [
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000001',
        '0x0000000000000000000000000000000000000002'
      ])
    ).resolves.toMatchSnapshot();
  });
});
