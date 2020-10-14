import { getDefaultNetwork, getSupportedNetworks } from '../network';
import { getNameHash, isValidAddress, normalise, resolveName } from './ens';

// const server = new JsonRpcServer({
//   hostname: "127.0.0.1",
//   port: 8545,
//   provider: buidler.network.provider
// });
//
// beforeAll(async () => {
//   await server.listen();
// }, 100000);
//
// afterAll(async () => {
//   await server.close();
// });

describe('normalise', () => {
  it('normalises a name', () => {
    expect(normalise('foo.eth')).toBe('foo.eth');
    expect(normalise('FOO.eth')).toBe('foo.eth');
  });
});

describe('getNameHash', () => {
  it('returns the name hash for an ENS domain', () => {
    expect(getNameHash('eth')).toBe('0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae');
    expect(getNameHash('foo.eth')).toBe('0xde9b09fd7c5f901e23a3f19fecc54828e9c848539801e86591bd9801b019f84f');
  });

  it('returns 0x0 for an empty name', () => {
    expect(getNameHash('')).toBe('0x0000000000000000000000000000000000000000000000000000000000000000');
  });
});

describe('isValidAddress', () => {
  it('returns true for valid addresses', () => {
    expect(isValidAddress('0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e')).toBeTruthy();
    expect(isValidAddress('0x4bbeeb066ed09b7aed07bf39eee0460dfa261520')).toBeTruthy();
  });

  it('returns false for invalid addresses', () => {
    expect(isValidAddress('0x')).toBeFalsy();
    expect(isValidAddress('')).toBeFalsy();
    expect(isValidAddress('0x0000000000000000000000000000000000000000')).toBeFalsy();
  });
});

describe('resolveName', () => {
  // TODO: Mock ENS contract and write test that doesn't depend on network
  it('resolves an ENS name', async () => {
    await expect(resolveName(getDefaultNetwork(), 'morten.eth')).resolves.toBe(
      '0x47170ceae335a9db7e96b72de630389669b33471'
    );
  });

  it('returns undefined if an address does not resolve', async () => {
    await expect(resolveName(getDefaultNetwork(), 'foo')).resolves.toBeUndefined();
  });

  it('throws if a network does not support ENS', async () => {
    await expect(resolveName(getSupportedNetworks()[1], 'morten.eth')).rejects.toThrow(
      'ENS not supported for this network'
    );
  });
});
