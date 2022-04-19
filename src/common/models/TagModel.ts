export interface TagModel {
  cid: string;
  tid: string;
  uid: string;
  algo_creator: string;
  algo_owner: string;
  algo_total: number;
  algo_decimals: number;
  algo_defaultfrozen: boolean;
  algo_unitname: string;
  algo_assetname: string;
  algo_url: string;
  algo_managerkey: string;
  algo_reserveaddr: string;
  algo_circulatingsupply: number;
  algo_metadatahashb64: string;
  algo_id: number;
  algo_verified: boolean;
  algo_destroyed: boolean;
  nft_token_id: string;
  nft_token_uri: string;
  nft_owner_address: string;
  nft_total_supply: string;
  nft_circ_supply: string | null;
  description: string;
}

export interface ScanTagModel {
  uid: string;
  scan_date: string;
  tt_status: boolean;
  useragent: string;
  ipv4_address: string | null;
  ip_address: string;
  ip_location: string | null;
  auth_stat: number;
  count: number;
  geotoken: string | null;
  lat: string | null;
  lng: string | null;
}
