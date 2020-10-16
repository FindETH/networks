import { encode } from '@findeth/abi';
import {
  getEtherBalances as getEtherBalancesScanner,
  getTokenBalances as getTokenBalancesScanner,
  toBalanceMap
} from '@mycrypto/eth-scan';
import { BALANCE_OF_ID } from './constants';
import { call, getBalance } from './jsonrpc/api';
import { Network } from './network';
import { loadBalance } from './utils';

const SUPPORTED_NETWORK_IDS = [1, 3, 4, 5, 42];

/**
 * Check if a network is supported by eth-scan.
 *
 * @param {Network} network
 * @return {Promise<boolean>}
 */
export const isEthScanSupported = async (network: Network): Promise<boolean> => {
  return SUPPORTED_NETWORK_IDS.includes(network.chainId);
};

/**
 * Get Ether balances for multiple addresses.
 *
 * @param {Network} network
 * @param {string[]} addresses
 * @return {Promise<Record<string, bigint>>}
 */
export const getEtherBalances = async (network: Network, addresses: string[]): Promise<Record<string, bigint>> => {
  if (await isEthScanSupported(network)) {
    return loadBalance(getEtherBalancesScanner, network.rpc)(addresses);
  }

  const balances = await Promise.all(addresses.map((address) => loadBalance(getBalance, network.rpc)(address)));

  return toBalanceMap(addresses, balances);
};

/**
 * Get the token balance for an individual address. This is only used if eth-scan is not available on the provided
 * network.
 *
 * @param {Network} network
 * @param {string} tokenAddress
 * @param {string} address
 * @return {Promise<bigint>}
 */
const getTokenBalance = async (network: Network, tokenAddress: string, address: string): Promise<bigint> => {
  const data = Buffer.concat([BALANCE_OF_ID, encode(['address'], [address])]).toString('hex');

  const result = await loadBalance(
    call,
    network.rpc
  )([
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
 * @param {Network} network
 * @param {string} tokenAddress
 * @param {string[]} addresses
 * @return {Promise<Record<string, bigint>>}
 */
export const getTokenBalances = async (
  network: Network,
  tokenAddress: string,
  addresses: string[]
): Promise<Record<string, bigint>> => {
  if (await isEthScanSupported(network)) {
    return loadBalance(getTokenBalancesScanner, network.rpc)(addresses, tokenAddress);
  }

  const balances = await Promise.all(addresses.map((address) => getTokenBalance(network, tokenAddress, address)));

  return toBalanceMap(addresses, balances);
};
