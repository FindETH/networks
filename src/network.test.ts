import { AsyncSendable, FallbackProvider, JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { getDefaultProvider, getNetwork, NETWORK_MAINNET, NETWORK_TESTNET, NETWORK_UNKNOWN } from './network';

jest.mock('@ethersproject/providers');

describe('getDefaultProvider', () => {
  it('returns a fallback provider if Web3 is not injected', () => {
    expect(getDefaultProvider()).toBeInstanceOf(FallbackProvider);
  });

  it('uses an injected Web3 provider if it exists', () => {
    (window as { web3?: { currentProvider: AsyncSendable } }).web3 = {
      currentProvider: {} as AsyncSendable
    };

    expect(getDefaultProvider()).toBeInstanceOf(Web3Provider);
  });
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
