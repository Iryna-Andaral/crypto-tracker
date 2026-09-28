import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { CoinDetail } from "./pages/CoinDetail"

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Home />}></Route>
        <Route path="/coin/:id" element= {<CoinDetail />}></Route>
      </Routes>
  
    </BrowserRouter>
  )
}

export default App
