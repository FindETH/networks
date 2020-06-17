import {
  getEtherBalances as getEtherBalancesScanner,
  getTokenBalances as getTokenBalancesScanner
} from '@mycrypto/eth-scan';

/**
 * Get Ether balances for multiple addresses.
 *
 * @param {string} provider
 * @param {string[]} addresses
 * @return {Promise<Record<string, bigint>>}
 */
export const getEtherBalances = (provider: string, addresses: string[]): Promise<Record<string, bigint>> => {
  return getEtherBalancesScanner(provider, addresses);
};

/**
 * Get token balances for multiple addresses, for a single token contract.
 *
 * @param {string} provider
 * @param {string} tokenAddress
 * @param {string[]} addresses
 * @return {Promise<Record<string, bigint>>}
 */
export const getTokenBalances = async (
  provider: string,
  tokenAddress: string,
  addresses: string[]
): Promise<Record<string, bigint>> => {
  return getTokenBalancesScanner(provider, addresses, tokenAddress);
};
