/* tslint:disable max-classes-per-file */
export class EtherscanProvider {}

export class FallbackProvider {}

export class InfuraProvider {}

export class Web3Provider {}

export class JsonRpcProvider {
  constructor(private readonly url: string) {}

  async getNetwork(): Promise<{ chainId: number }> {
    switch (this.url) {
      case 'https://ethereum-node':
        return { chainId: 1 };
      case 'https://ropsten-node':
        return { chainId: 3 };
      default:
        return { chainId: -1 };
    }
  }
}
