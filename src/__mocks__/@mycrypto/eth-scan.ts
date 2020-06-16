import { Provider } from '@ethersproject/providers';
import { BalanceMap } from '@mycrypto/eth-scan';

export const getEtherBalances = async (_: Provider, addresses: string[]): Promise<BalanceMap> => {
  return addresses.reduce<BalanceMap>((object, address) => {
    return {
      ...object,
      [address]: 1n
    };
  }, {});
};

export const getTokenBalances = async (_: Provider, addresses: string[]): Promise<BalanceMap> => {
  return addresses.reduce<BalanceMap>((object, address) => {
    return {
      ...object,
      [address]: 1n
    };
  }, {});
};
