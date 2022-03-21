export interface TagModel {
  cid: string;
  tid: string;
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
