import axios from "axios";
import { config } from "common/config/conf";

export const getAccountAssets = async (accountAddress: string) => {
  const url = new URL(
    `${config.algoExplorerIndexerApi}/v2/accounts/${accountAddress}`
  );
  url.searchParams.append("include-all", "false");
  url.searchParams.append(
    "exclude",
    ["created-apps", "created-assets"].join(",")
  );

  try {
    const fetchAccountAssets = await axios.get(url.toString());
    return fetchAccountAssets.data.account?.assets ?? [];
  } catch (error) {
    return [];
  }
};
