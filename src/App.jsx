
import { Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import Main from "./components/main/Main"
import ProductCat from "./components/main/ProductCat"
import Details from "./components/main/Details"
import Wishlist from "./components/main/Wishlist"
import ShoppingBag from "./components/main/ShoppingBag"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route  path="/" element={<Main/>}/>
          <Route  path="/product/:subId" element={<ProductCat/>}/>
          <Route  path="/product/all/:catId" element={<ProductCat/>}/>
          <Route  path="/product/detalis/:productId" element={<Details/>}/>
          <Route  path="/wishlist" element={<Wishlist/>}/>

          <Route  path="/cart" element={<ShoppingBag/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
