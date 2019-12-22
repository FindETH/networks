import { BigNumber } from '@ethersproject/bignumber';
import { Provider } from '@ethersproject/providers';
import {
  getEtherBalances as getEtherBalancesScanner,
  getTokenBalances as getTokenBalancesScanner
} from '@mycrypto/eth-scan';

/**
 * Get Ether balances for multiple addresses.
 *
 * @param {Provider} provider
 * @param {string[]} addresses
 * @return {Promise<Record<string, BigNumber>>}
 */
export const getEtherBalances = (provider: Provider, addresses: string[]): Promise<Record<string, BigNumber>> => {
  return getEtherBalancesScanner(provider, addresses);
};

/**
 * Get token balances for multiple addresses, for a single token contract.
 *
 * @param {Provider} provider
 * @param {string} tokenAddress
 * @param {string[]} addresses
 * @return {Promise<Record<string, BigNumber>>}
 */
export const getTokenBalances = async (
  provider: Provider,
  tokenAddress: string,
  addresses: string[]
): Promise<Record<string, BigNumber>> => {
  return getTokenBalancesScanner(provider, addresses, tokenAddress);
};
