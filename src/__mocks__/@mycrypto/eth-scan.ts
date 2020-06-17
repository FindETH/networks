import { BalanceMap } from '@mycrypto/eth-scan';

export const getEtherBalances = async (_: string, addresses: string[]): Promise<BalanceMap> => {
  return addresses.reduce<BalanceMap>((object, address) => {
    return {
      ...object,
      [address]: 1n
    };
  }, {});
};

export const getTokenBalances = async (_: string, addresses: string[]): Promise<BalanceMap> => {
  return addresses.reduce<BalanceMap>((object, address) => {
    return {
      ...object,
      [address]: 1n
    };
  }, {});
};
