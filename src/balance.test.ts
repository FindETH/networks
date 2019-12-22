import { JsonRpcProvider } from '@ethersproject/providers';
import { getEtherBalances, getTokenBalances } from './balance';

jest.mock('@ethersproject/providers');
jest.mock('@mycrypto/eth-scan');

describe('getEtherBalances', () => {
  it('gets the Ether balance for multiple addresses', async () => {
    const provider = new JsonRpcProvider('https://ethereum-node');
    await expect(
      getEtherBalances(provider, [
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000001',
        '0x0000000000000000000000000000000000000002'
      ])
    ).resolves.toMatchSnapshot();
  });
});

describe('getTokenBalances', () => {
  it('gets the token balance for multiple addresses', async () => {
    const provider = new JsonRpcProvider('https://ethereum-node');
    await expect(
      getTokenBalances(provider, '0x6b175474e89094c44da98b954eedeac495271d0f', [
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000001',
        '0x0000000000000000000000000000000000000002'
      ])
    ).resolves.toMatchSnapshot();
  });
});
