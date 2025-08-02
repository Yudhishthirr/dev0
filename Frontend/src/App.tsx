import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import {LandingPage} from "./pages/landingpage"
import {Build} from "./pages/Build"
import { FuturisticWebsite } from './pages/newlanding';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<FuturisticWebsite />} />
        <Route path="/build" element={<Build />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
