/**
 * @jest-environment node
 */

import hardhat from 'hardhat';
import { JsonRpcServer } from 'hardhat/internal/hardhat-network/jsonrpc/server';
import { TEST_NODE } from './__fixtures__/nodes';
import { call, getChainId, getVersion } from './api';

const server = new JsonRpcServer({
  hostname: '127.0.0.1',
  port: 18545,
  provider: hardhat.network.provider
});

beforeAll(async () => {
  await server.listen();
}, 100000);

afterAll(async () => {
  await server.close();
});

describe('call', () => {
  it('sends a call to the node', async () => {
    await expect(
      call(TEST_NODE, [
        {
          to: '0x0000000000000000000000000000000000000000'
        },
        'latest'
      ])
    ).resolves.toStrictEqual('0x');
  });
});

describe('getChainId', () => {
  it('returns the chain ID for a node', async () => {
    await expect(getChainId(TEST_NODE)).resolves.toBe(1);
  });
});

describe('getNetwork', () => {
  it('returns the network ID for a node', async () => {
    await expect(getVersion(TEST_NODE)).resolves.toBe(1);
  });
});
