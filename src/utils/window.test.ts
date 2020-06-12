import { ExternalProvider } from '@ethersproject/providers';
import { getWeb3, hasWindow } from './window';

describe('hasWindow', () => {
  it('returns true if window is defined', () => {
    expect(hasWindow()).toBeTruthy();
  });
});

describe('getWeb3', () => {
  it('returns the injected Web3 if it exists', () => {
    const currentProvider = jest.fn() as ExternalProvider;
    (window as { web3?: { currentProvider: ExternalProvider } }).web3 = {
      currentProvider
    };

    expect(getWeb3()).toBe(currentProvider);
  });
});
