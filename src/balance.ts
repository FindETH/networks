import { Provider } from '@ethersproject/providers';
import EthScan, { EthersProvider } from '@mycrypto/eth-scan';
import BigNumber from 'bignumber.js';

/**
 * Get Ether balances for multiple addresses.
 *
 * @param {Provider} provider
 * @param {string[]} addresses
 * @return {Promise<Record<string, BigNumber>>}
 */
export const getEtherBalances = (provider: Provider, addresses: string[]): Promise<Record<string, BigNumber>> => {
  const scanner = new EthScan(new EthersProvider(provider));

  return scanner.getEtherBalances(addresses);
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
  const scanner = new EthScan(new EthersProvider(provider));

  return scanner.getTokenBalances(addresses, tokenAddress);
};
