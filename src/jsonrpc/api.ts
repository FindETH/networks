import fetch from 'isomorphic-unfetch';
import { EthCall, EthChainId, EthGetBalance, JsonrpcMethod, NetVersion, Request, Response } from './types';

export const getRequestData = <T extends JsonrpcMethod>(method: T['method'], params: T['params']): Request<T> => {
  return {
    id: '1',
    jsonrpc: '2.0',
    method,
    params
  };
};

/**
 * Send a JSONRPC request to the provided node with the provided data. Currently, this does not handle
 * errors returned from the server.
 *
 * @template T
 * @param {string} url
 * @param {Request<T>} data
 * @return {Promise<Response<T>>}
 */
export const sendRequest = async <T extends JsonrpcMethod>(url: string, data: Request<T>): Promise<Response<T>> => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.json());
};

/**
 * Send an `eth_call` call to the node.
 *
 * @param {string} url
 * @param {EthCall['params']} params
 * @return {string}
 */
export const call = async (url: string, params: EthCall['params']): Promise<string> => {
  const { result } = await sendRequest(url, getRequestData<EthCall>('eth_call', params));
  return result;
};

/**
 * Returns the current chain ID as number.
 *
 * @param {string} url
 * @return {number}
 */
export const getChainId = async (url: string): Promise<number> => {
  const { result } = await sendRequest(url, getRequestData<EthChainId>('eth_chainId', []));
  return Number(result);
};

/**
 * Returns the balance for an address as bigint.
 *
 * @param {string} url
 * @param {string} address
 * @return {Promise<bigint>}
 */
export const getBalance = async (url: string, address: string): Promise<bigint> => {
  const { result } = await sendRequest(
    url,
    getRequestData<EthGetBalance>('eth_getBalance', [address, 'latest'])
  );
  return BigInt(result);
};

/**
 * Returns the current network ID as number.
 *
 * @param {string} url
 * @return {number}
 */
export const getVersion = async (url: string): Promise<number> => {
  const { result } = await sendRequest(url, getRequestData<NetVersion>('net_version', []));
  return Number(result);
};
