import {
  call as jsonRpcCall,
  getChainId as jsonRpcGetChainId,
  getVersion as jsonRpcGetVersion,
  EthCall
} from './jsonrpc';
import { Network } from './network';
import { loadBalance } from './utils';

/**
 * Send an `eth_call` call to the network.
 *
 * @param {Network} network
 * @param {EthCall['params']} params
 * @return {string}
 */
export const call = (network: Network, params: EthCall['params']) => loadBalance(jsonRpcCall, network.rpc)(params);

/**
 * Returns the current chain ID as number.
 *
 * @param {Network} network
 * @return {number}
 */
export const getChainId = (network: Network) => loadBalance(jsonRpcGetChainId, network.rpc)();

/**
 * Returns the current network ID as number.
 *
 * @param {Network} network
 * @return {number}
 */
export const getVersion = (network: Network) => loadBalance(jsonRpcGetVersion, network.rpc)();
