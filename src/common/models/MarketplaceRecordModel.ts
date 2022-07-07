export interface MarketplaceRecordPayload {
  name: string;
  unitName: string;
  creator: string;
  index: number;
  amount: number;
  total: number;
  decimals: number;
  url: string;
  algoPrice: number;
  socksPrice: number;
  royalty: number;
  description?: string;
}

export interface SetMarketplaceRecordsParams {
  name: string;
  unitName: string;
  creator: string;
  index: number;
  amount: number;
  total: number;
  decimals: number;
  url: string;
  algoPrice: number;
  socksPrice: number;
  royalty: number;
}

export interface UpdateMarketplaceRecordsParams {
  name: string;
  unitName?: string;
  creator: string;
  index: number;
  amount: number;
  total?: number;
  decimals?: number;
  url: string;
  algoPrice?: number;
  socksPrice?: number;
  royalty?: number;
}
