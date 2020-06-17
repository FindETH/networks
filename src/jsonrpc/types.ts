type Tag = 'latest' | 'earliest' | 'pending';

export interface EthCall {
  method: 'eth_call';
  params: [
    {
      from?: string;
      to: string;
      gas?: number;
      gasPrice?: number;
      value?: number;
      data?: string;
    },
    Tag
  ];
  result: string;
}

export interface EthChainId {
  method: 'eth_chainId';
  params: [];
  result: string;
}

export interface EthGetBalance {
  method: 'eth_getBalance';
  params: [string, Tag];
  result: string;
}

export interface NetVersion {
  method: 'net_version';
  params: [];
  result: string;
}

export type JsonrpcMethod = EthCall | EthChainId | EthGetBalance | NetVersion;

export interface Request<T extends JsonrpcMethod> {
  id: string;
  jsonrpc: '2.0';
  method: string;
  params: T['params'];
}

export interface Response<T extends JsonrpcMethod> {
  id: string;
  jsonrpc: '2.0';
  result: T['result'];
}
