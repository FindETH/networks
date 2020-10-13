import { getVersion } from './api';
import networks from './config/networks.json';

export interface Network {
  name: string;
  chain: string;
  network: string;
  rpc: string[];
  faucets: string[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  infoURL: string;
  shortName: string;
  chainId: number;
  networkId: number;
  slip44?: number;
  ens?: {
    registry: string;
  };
}

/**
 * Get the default network.
 *
 * @return {Network}
 */
export const getDefaultNetwork = (): Network => {
  return networks[0];
};

/**
 * Get all supported networks.
 *
 * @return {Network[]}
 */
export const getSupportedNetworks = (): Network[] => {
  return networks;
};

/**
 * Get the current network for a provider.
 *
 * @param {string} provider
 * @return {Promise<Network | undefined>}
 */
export const getNetwork = async (provider: string): Promise<Network | undefined> => {
  const supportedNetworks = getSupportedNetworks();
  const networkId = await getVersion(provider);

  return supportedNetworks.find(item => item.networkId === networkId);
};
