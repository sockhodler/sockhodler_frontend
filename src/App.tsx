import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import {
  Home,
  ComingSoon,
  Marketplace,
  NftAuctions,
  NftStaking,
  Portfolio,
} from 'pages'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/nft-auctions" element={<NftAuctions />} />
          <Route path="/nft-staking" element={<NftStaking />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="*" element={<ComingSoon />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
