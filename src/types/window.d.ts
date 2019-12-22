declare global {
  interface Window {
    web3?: {
      currentProvider?: string;
    };
  }
}
