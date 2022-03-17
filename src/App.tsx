import React, { useState } from "react";
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

const routes = [
  {
    path: "/",
    component: <Home />,
    walletAuth: false,
    adminAuth: false,
  },
  {
    path: "/marketplace",
    component: <Marketplace />,
    walletAuth: false,
    adminAuth: false,
  },
  {
    path: "/marketplace-details",
    component: <MarketplaceDetails />,
    walletAuth: false,
    adminAuth: false,
  },
  {
    path: "/nft-auctions",
    component: <NftAuctions />,
    walletAuth: false,
    adminAuth: false,
  },
  {
    path: "/nft-auction-details",
    component: <NFTAuctionDetails />,
    walletAuth: false,
    adminAuth: false,
  },
  {
    path: "/nft-staking",
    component: <NftStaking />,
    walletAuth: false,
    adminAuth: false,
  },
  {
    path: "/portfolio",
    component: <Portfolio />,
    walletAuth: false,
    adminAuth: false,
  },
  {
    path: "/mint-nft",
    component: <MintNFT />,
    walletAuth: false,
    adminAuth: false,
  },
  {
    path: "/nft-details",
    component: <NFTDetails />,
    walletAuth: false,
    adminAuth: false,
  },
  {
    path: "/minted-assets",
    component: <MintedAssets />,
    walletAuth: false,
    adminAuth: false,
  },
];

const App: React.FunctionComponent = () => {
  // auth guard => connect wallet status, admin guard => boolean: isAdmin
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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
          {routes.map((route) => {
            if (route.walletAuth && !isWalletConnected) return null;
            if (route.adminAuth && !isAdmin) return null;

            return <Route path={route.path} element={route.component} />;
          })}

          {/* Not found page */}
          <Route path="*" element={<ComingSoon />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;
