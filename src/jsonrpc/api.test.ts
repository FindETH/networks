/**
 * @jest-environment node
 */

import Ganache from 'ganache-core';
import { call, getChainId, getRequestData, getVersion } from './api';

const HTTP_ENDPOINT = 'http://localhost:8545';
let server: {
  listen(port: number, callback: () => void): void;
  close(callback: () => void): void;
};

beforeAll(done => {
  server = Ganache.server({ network_id: 1 });
  server.listen(8545, done);
});

afterAll(done => {
  server.close(done);
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
          to: '0x0'
        },
        'latest'
      ])
    ).resolves.toStrictEqual(Buffer.alloc(0));
  });
});

describe('getChainId', () => {
  it('returns the chain ID for a node', async () => {
    await expect(getChainId(HTTP_ENDPOINT)).resolves.toBe(1337);
  });
});

describe('getNetwork', () => {
  it('returns the network ID for a node', async () => {
    await expect(getVersion(HTTP_ENDPOINT)).resolves.toBe(1);
  });
});
