
import { Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import Main from "./components/main/Main"
import ProductCat from "./components/main/ProductCat"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route  path="/" element={<Main/>}/>
          <Route  path="/product/:subId" element={<ProductCat/>}/>
          <Route  path="/product/all/:catId" element={<ProductCat/>}/>

        </Route>
      </Routes>
    </>
  )
}

export default App
