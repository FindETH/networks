import { INFURA_PROJECT_ID } from './constants';
import { getVersion } from './jsonrpc';

export interface Network {
  name: 'Mainnet' | 'Testnet' | 'Unknown' | 'Offline';
  color: string;
}

export const NETWORK_MAINNET: Network = {
  name: 'Mainnet',
  color: '#007896'
};

export const NETWORK_TESTNET: Network = {
  name: 'Testnet',
  color: '#adc101'
};

export const NETWORK_UNKNOWN: Network = {
  name: 'Unknown',
  color: '#b37aff'
};

export const NETWORK_OFFLINE: Network = {
  name: 'Offline',
  color: '#dcdcdc'
};

export const getDefaultProvider = (): string => {
  return `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`;
};

/**
 * Get the current (Ethereum) network.
 *
 * @param {string} provider
 * @return {Promise<Network>}
 */
export const getNetwork = async (provider: string): Promise<Network> => {
  const networkId = await getVersion(provider);

  switch (networkId) {
    case 1:
      return NETWORK_MAINNET;
    case 3: // Ropsten
    case 4: // Rinkeby
    case 5: // Goerli
    case 6: // Kotti Classic
    case 42: // Kovan
      return NETWORK_TESTNET;
    default:
      return NETWORK_UNKNOWN;
  }
};
