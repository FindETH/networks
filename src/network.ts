import {
  EtherscanProvider,
  FallbackProvider,
  InfuraProvider,
  JsonRpcProvider,
  Provider,
  Web3Provider
} from '@ethersproject/providers';
import { INFURA_PROJECT_ID, MYCRYPTO_JSONRPC_ENDPOINT } from './constants';
import { getWeb3 } from './utils/window';

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
 * Get the default provider, which primarily uses MyCrypto's public API endpoint, and has fallbacks to Infura and
 * Etherscan. If an injected Web3 provider is detected (e.g. MetaMask), that will be used instead.
 *
 * @param {number} [networkId=1]
 * @return {Provider}
 */
export const getDefaultProvider = (networkId: number = 1): Provider => {
  const web3 = getWeb3();
  if (web3) {
    return new Web3Provider(web3);
  }

  return new FallbackProvider([
    new JsonRpcProvider(MYCRYPTO_JSONRPC_ENDPOINT, networkId),
    new InfuraProvider(networkId, INFURA_PROJECT_ID),
    new EtherscanProvider(networkId)
  ]);
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
