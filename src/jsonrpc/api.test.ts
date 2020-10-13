/**
 * @jest-environment node
 */

import buidler from '@nomiclabs/buidler';
import { JsonRpcServer } from '@nomiclabs/buidler/internal/buidler-evm/jsonrpc/server';
import { call, getBalance, getChainId, getRequestData, getVersion } from './api';

const HTTP_ENDPOINT = 'http://localhost:8545';

const server = new JsonRpcServer({
  hostname: '127.0.0.1',
  port: 8545,
  provider: buidler.network.provider
});

beforeAll(async () => {
  await server.listen();
}, 100000);

afterAll(async () => {
  await server.close();
});

describe('getRequestData', () => {
  it('returns the JSONRPC request data', () => {
    expect(
      getRequestData('eth_call', [
        {
          from: '0x0',
          to: '0x1'
        },
        'latest'
      ])
    ).toStrictEqual({
      id: '1',
      jsonrpc: '2.0',
      method: 'eth_call',
      params: [
        {
          from: '0x0',
          to: '0x1'
        },
        'latest'
      ]
    });
  });
});

describe('call', () => {
  it('sends a call to the node', async () => {
    await expect(
      call(HTTP_ENDPOINT, [
        {
          to: '0x0000000000000000000000000000000000000000'
        },
        'latest'
      ])
    ).resolves.toStrictEqual('0x');
  });
});

describe('getBalance', () => {
  it('returns the balance for an address', async () => {
    await expect(getBalance(HTTP_ENDPOINT, '0xc783df8a850f42e7F7e57013759C285caa701eB6')).resolves.toBe(
      10000000000000000000000n
    );
    await expect(getBalance(HTTP_ENDPOINT, '0xeAD9C93b79Ae7C1591b1FB5323BD777E86e150d4')).resolves.toBe(
      10000000000000000000000n
    );
  });
});

describe('getChainId', () => {
  it('returns the chain ID for a node', async () => {
    await expect(getChainId(HTTP_ENDPOINT)).resolves.toBe(31337);
  });
});

describe('getNetwork', () => {
  it('returns the network ID for a node', async () => {
    await expect(getVersion(HTTP_ENDPOINT)).resolves.toBe(31337);
  });
});
