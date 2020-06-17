import { getEtherBalances, getTokenBalances } from './balance';

jest.mock('@mycrypto/eth-scan');

describe('getEtherBalances', () => {
  it('gets the Ether balance for multiple addresses', async () => {
    await expect(
      getEtherBalances('https://ethereum-node', [
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000001',
        '0x0000000000000000000000000000000000000002'
      ])
    ).resolves.toMatchSnapshot();
  });
});

describe('getTokenBalances', () => {
  it('gets the token balance for multiple addresses', async () => {
    await expect(
      getTokenBalances('https://ethereum-node', '0x6b175474e89094c44da98b954eedeac495271d0f', [
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000001',
        '0x0000000000000000000000000000000000000002'
      ])
    ).resolves.toMatchSnapshot();
  });
});
