import { encode } from '@findeth/abi';
import {
  getEtherBalances as getEtherBalancesScanner,
  getTokenBalances as getTokenBalancesScanner,
  toBalanceMap
} from '@mycrypto/eth-scan';
import { BALANCE_OF_ID } from './constants';
import { call, getBalance } from './jsonrpc/api';
import { getNetwork } from './network';

const SUPPORTED_NETWORK_IDS = [1, 3, 4, 5, 42];

/**
 * Check if a provider is supported by eth-scan.
 *
 * @param {string} provider
 * @return {Promise<boolean>}
 */
export const isEthScanSupported = async (provider: string): Promise<boolean> => {
  const network = await getNetwork(provider);
  if (!network) {
    return false;
  }

  return SUPPORTED_NETWORK_IDS.includes(network.networkId);
};

/**
 * Get Ether balances for multiple addresses.
 *
 * @param {string} provider
 * @param {string[]} addresses
 * @return {Promise<Record<string, bigint>>}
 */
export const getEtherBalances = async (provider: string, addresses: string[]): Promise<Record<string, bigint>> => {
  if (await isEthScanSupported(provider)) {
    return getEtherBalancesScanner(provider, addresses);
  }

  const balances = await Promise.all(addresses.map(address => getBalance(provider, address)));

  return toBalanceMap(addresses, balances);
};

const getTokenBalance = async (provider: string, tokenAddress: string, address: string): Promise<bigint> => {
  const data = Buffer.concat([BALANCE_OF_ID, encode(['address'], [address])]).toString('hex');

  const result = await call(provider, [
    {
      to: tokenAddress,
      data: `0x${data}`
    },
    'latest'
  ]);

  return BigInt(result);
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
  if (await isEthScanSupported(provider)) {
    return getTokenBalancesScanner(provider, addresses, tokenAddress);
  }

  const balances = await Promise.all(addresses.map(address => getTokenBalance(provider, tokenAddress, address)));

  return toBalanceMap(addresses, balances);
};
