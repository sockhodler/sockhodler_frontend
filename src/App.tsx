import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import {
  Home,
  ComingSoon,
  Marketplace,
  NftAuctions,
  NftStaking,
  Portfolio,
  NFTAuctionDetails,
  MarketplaceDetails,
} from 'pages'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace-details" element={<MarketplaceDetails />} />
          <Route path="/nft-auctions" element={<NftAuctions />} />
          <Route path="/nft-auction-details" element={<NFTAuctionDetails />} />
          <Route path="/nft-staking" element={<NftStaking />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="*" element={<ComingSoon />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
