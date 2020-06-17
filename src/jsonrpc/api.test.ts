/**
 * @jest-environment node
 */

import Ganache from 'ganache-core';
import { call, getBalance, getChainId, getRequestData, getVersion } from './api';

const HTTP_ENDPOINT = 'http://localhost:8545';
let server: {
  listen(port: number, callback: () => void): void;
  close(callback: () => void): void;
};

beforeAll(done => {
  server = Ganache.server({
    network_id: 1,
    accounts: [
      {
        // 0x50011201cc8a14735ec82bc8a7d0f3122113761d
        secretKey: '0x2b8bf9b6d21098359310b1b3e07ed44a7d198908868d70421173464a7a97d503',
        balance: '0x3039'
      },
      {
        // 0x3f5545a1174e0e20ac3a44e1465a7532e38e3e43
        secretKey: '0x351fe7a3ebc78d85826cb41cf3d8ddfe6545ec0edac5158f2e6d8a16b076cce3',
        balance: '0xd431'
      }
    ]
  });
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
    ).resolves.toStrictEqual('0x');
  });
});

describe('getBalance', () => {
  it('returns the balance for an address', async () => {
    await expect(getBalance(HTTP_ENDPOINT, '0x50011201cc8a14735ec82bc8a7d0f3122113761d')).resolves.toBe(12345n);
    await expect(getBalance(HTTP_ENDPOINT, '0x3f5545a1174e0e20ac3a44e1465a7532e38e3e43')).resolves.toBe(54321n);
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
