import { useContext } from "react"
import Header from "./components/header/Header"
import EntryNews from "./components/main/EntryNews"
import OurBest from "./components/main/OurBest"
import ProductSlider from "./components/main/ProductSlider"
import SoftEmbrace from "./components/main/SoftEmbrace"
import { DATA } from "./context/DataContext"

function App() {
  const { AllBags } = useContext(DATA)
  const { AllShirt } = useContext(DATA)
  return (
    <>
      <Header />
      <main>
        <EntryNews />
        <OurBest />
        <SoftEmbrace />
        <ProductSlider title="We Think You’ll Like These" Product={AllShirt} />
        <ProductSlider Product={AllBags} />
      </main>
    </>
  )
}

export default App
