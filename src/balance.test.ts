import { ETHEREUM_NODE, EXPANDE_NODE } from './__fixtures__/nodes';
import { getEtherBalances, getTokenBalances, isEthScanSupported } from './balance';

jest.mock('@mycrypto/eth-scan');
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
    await expect(isEthScanSupported(ETHEREUM_NODE)).resolves.toBe(true);
  });

  it('returns false for non-eth-scan supported networks', async () => {
    await expect(isEthScanSupported(EXPANDE_NODE)).resolves.toBe(false);
  });
});

describe('getEtherBalances', () => {
  it('gets the Ether balance for multiple addresses for eth-scan supported networks', async () => {
    await expect(
      getEtherBalances(ETHEREUM_NODE, [
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000001',
        '0x0000000000000000000000000000000000000002'
      ])
    ).resolves.toMatchSnapshot();
  });

  it('gets the Ether balance for multiple addresses for non-eth-scan supported networks', async () => {
    await expect(
      getEtherBalances(EXPANDE_NODE, [
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
      getTokenBalances(ETHEREUM_NODE, '0x6b175474e89094c44da98b954eedeac495271d0f', [
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000001',
        '0x0000000000000000000000000000000000000002'
      ])
    ).resolves.toMatchSnapshot();
  });

  it('gets the token balance for multiple addresses for non-eth-scan supported networks', async () => {
    await expect(
      getTokenBalances(EXPANDE_NODE, '0x6b175474e89094c44da98b954eedeac495271d0f', [
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000001',
        '0x0000000000000000000000000000000000000002'
      ])
    ).resolves.toMatchSnapshot();
  });
});
