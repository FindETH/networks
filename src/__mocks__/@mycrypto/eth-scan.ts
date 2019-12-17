import { BalanceMap } from '@mycrypto/eth-scan';
import BigNumber from 'bignumber.js';

export class EthersProvider {}

// tslint:disable-next-line: max-classes-per-file
export default class EthScan {
  async getEtherBalances(addresses: string[]): Promise<BalanceMap> {
    return addresses.reduce<BalanceMap>((object, address) => {
      return {
        ...object,
        [address]: new BigNumber(1)
      };
    }, {});
  }

  async getTokenBalances(addresses: string[]): Promise<BalanceMap> {
    return addresses.reduce<BalanceMap>((object, address) => {
      return {
        ...object,
        [address]: new BigNumber(1)
      };
    }, {});
  }
}
