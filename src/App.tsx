import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingIndicator, Layout } from "components";
import {
  Home,
  ComingSoon,
  Marketplace,
  NftAuctions,
  NftStaking,
  Portfolio,
  NFTAuctionDetails,
  MarketplaceDetails,
  MintNFT,
  NFTDetails,
  MintedAssets,
} from "pages";

const App: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <React.Suspense
        fallback={
          <Layout>
            <LoadingIndicator />
          </Layout>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace-details" element={<MarketplaceDetails />} />
          <Route path="/nft-auctions" element={<NftAuctions />} />
          <Route path="/nft-auction-details" element={<NFTAuctionDetails />} />
          <Route path="/nft-staking" element={<NftStaking />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/mint-nft" element={<MintNFT />} />
          <Route path="/nft-details" element={<NFTDetails />} />
          <Route path="/minted-assets" element={<MintedAssets />} />
          <Route path="*" element={<ComingSoon />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;
