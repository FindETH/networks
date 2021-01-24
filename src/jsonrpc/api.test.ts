/**
 * @jest-environment node
 */

import hardhat from 'hardhat';
import { JsonRpcServer } from 'hardhat/internal/hardhat-network/jsonrpc/server';
import { call, getBalance, getChainId, getRequestData, getVersion } from './api';

const HTTP_ENDPOINT = 'http://localhost:18546';

const server = new JsonRpcServer({
  hostname: '127.0.0.1',
  port: 18546,
  provider: hardhat.network.provider
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
    await expect(getBalance(HTTP_ENDPOINT, '0xc6D5a3c98EC9073B54FA0969957Bd582e8D874bf')).resolves.toBe(
      10000000000000000000000n
    );
    await expect(getBalance(HTTP_ENDPOINT, '0x59A897A2dbd55D20bCC9B52d5eaA14E2859Dc467')).resolves.toBe(
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
