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
