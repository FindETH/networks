import { Provider } from '@ethersproject/providers';

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

/**
 * Get the current network.
 *
 * @param {Provider} provider
 * @return {Promise<Network>}
 */
export const getNetwork = async (provider: Provider): Promise<Network> => {
  const { chainId } = await provider.getNetwork();

  switch (chainId) {
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
