import { BalanceMap } from '@mycrypto/eth-scan';

const { toBalanceMap: ethScanToBalanceMap } = jest.requireActual('@mycrypto/eth-scan');

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

export const toBalanceMap = ethScanToBalanceMap;
