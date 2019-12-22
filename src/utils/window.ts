import { AsyncSendable } from '@ethersproject/providers';

interface CustomWindow {
  web3?: {
    currentProvider?: AsyncSendable;
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
 * @return {AsyncSendable}
 */
export const getWeb3 = (): AsyncSendable | undefined => {
  if (hasWindow()) {
    return (window as CustomWindow)?.web3?.currentProvider;
  }

  return undefined;
};
