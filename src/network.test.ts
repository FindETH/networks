import { JsonRpcProvider } from '@ethersproject/providers';
import { getNetwork, NETWORK_MAINNET, NETWORK_TESTNET, NETWORK_UNKNOWN } from './network';

jest.mock('@ethersproject/providers');

afterAll(() => {
  jest.clearAllMocks();
});

describe('getNetwork', () => {
  it('returns the current active network', async () => {
    const ethereumProvider = new JsonRpcProvider('https://ethereum-node');
    await expect(getNetwork(ethereumProvider)).resolves.toBe(NETWORK_MAINNET);

    const ropstenProvider = new JsonRpcProvider('https://ropsten-node');
    await expect(getNetwork(ropstenProvider)).resolves.toBe(NETWORK_TESTNET);

    const unknownProvider = new JsonRpcProvider('https://unknown-node');
    await expect(getNetwork(unknownProvider)).resolves.toBe(NETWORK_UNKNOWN);
  });
});
