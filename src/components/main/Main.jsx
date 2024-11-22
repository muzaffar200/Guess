import React, { useContext } from 'react'
import { DATA } from '../../context/DataContext'
import EntryNews from './EntryNews'
import OurBest from './OurBest'
import ProductSlider from './ProductSlider'

function Main() {
    const { AllBags } = useContext(DATA)
    const { AllShirt } = useContext(DATA)
  return (
    <main>
        <EntryNews/>
        <OurBest/>
        <ProductSlider title="We Think You’ll Like These" Product={AllShirt} />
        <ProductSlider Product={AllBags} />
    </main>
  )
}

export default Main