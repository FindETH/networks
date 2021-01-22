import { Buffer } from 'buffer';
import { encode } from '@findeth/abi';
import { keccak256, hexify } from '@findeth/hdnode';
import { toUnicode } from 'idna-uts46-hx';
import { call } from '../api';
import { ENS_ADDR_ID, ENS_RESOLVER_ID } from '../constants';
import { Network } from '../network';

/**
 * Normalise a name according to UTS46.
 *
 * @param {string} name
 * @return {string}
 */
export const normalise = (name: string): string => {
  return toUnicode(name, { useStd3ASCII: true });
};

/**
 * Get the name hash for an ENS domain, as defined in [EIP-137](https://eips.ethereum.org/EIPS/eip-137).
 *
 * @param {string} name
 * @return {string}
 */
export const getNameHash = (name: string): string => {
  if (!name) {
    return `0x${Buffer.alloc(32, 0).toString('hex')}`;
  }

  const normalisedName = normalise(name);
  const labels = normalisedName.split('.').reverse();

  const hash = labels.reduce<Uint8Array>((buffer, label) => {
    const labelHash = keccak256(Buffer.from(label, 'utf8'));
    return keccak256(Buffer.from(Uint8Array.from([...buffer, ...labelHash])));
  }, new Uint8Array(32));

  return `0x${hexify(hash)}`;
};

/**
 * Check if an address is a valid resolved address. Note that this does not do a full check if an address is valid, but
 * it checks for common return values from JSON-RPC calls.
 *
 * @param {string} address
 * @return {boolean}
 */
export const isValidAddress = (address: string): boolean => {
  return !!address && address !== '0x' && address !== '0x0000000000000000000000000000000000000000';
};

/**
 * Resolve an ENS name. Returns the resolved address, or undefined if no address was resolved.
 *
 * @param {Network} network
 * @param {string} name
 * @return {Promise<string | undefined>}
 */
export const resolveName = async (network: Network, name: string): Promise<string | undefined> => {
  if (!network.ens?.registry) {
    throw new Error('ENS not supported for this network');
  }

  const nameHash = getNameHash(name);
  const encodedHash = encode(['bytes32'], [nameHash]);

  const data = hexify(new Uint8Array([...ENS_RESOLVER_ID, ...encodedHash]));
  const rawResolverAddress = await call(network, [
    {
      to: network.ens?.registry,
      data: `0x${data}`
    },
    'latest'
  ]);

  const resolverAddress = `0x${rawResolverAddress.slice(-40)}`;
  if (!isValidAddress(resolverAddress)) {
    return;
  }

  const resolverData = hexify(Uint8Array.from([...ENS_ADDR_ID, ...encodedHash]));
  const rawAddress = await call(network, [
    {
      to: resolverAddress,
      data: `0x${resolverData}`
    },
    'latest'
  ]);

  const address = `0x${rawAddress.slice(-40)}`;
  if (isValidAddress(address)) {
    return address;
  }
};
