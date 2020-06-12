import { ExternalProvider } from '@ethersproject/providers';

interface CustomWindow {
  web3?: {
    currentProvider?: ExternalProvider;
  };
}

/**
 * Check if `window` exists in the current environment.
 *
 * @return {boolean}
 */
export const hasWindow = (): boolean => {
  return typeof window !== 'undefined';
};

/**
 * Get an instance of the injected Web3 provider if it exists.
 *
 * @return [ExternalProvider]
 */
export const getWeb3 = (): ExternalProvider | undefined => {
  if (hasWindow()) {
    return (window as CustomWindow)?.web3?.currentProvider;
  }

  return undefined;
};
