import React, { createContext, useEffect, useState } from 'react'
import { getAllBags, getAllCategory, getAllShirt, getSubCategory } from '../service/api'
export const DATA = createContext([])
function DataContext({ children }) {
    const [categoryAll, SetCategoryAll] = useState(null)
    const [AllBags, SetAllBags] = useState(null)
    const [AllShirt, SetAllShirt] = useState(null)
    const [SubCat, SetSubCat] = useState(null)

    useEffect(() => {
        getAllCategory().then(res => SetCategoryAll(res))
        getAllBags().then(res => SetAllBags(res))
        getAllShirt().then(res => SetAllShirt(res))
    }, [])

    return (
        <DATA.Provider value={{
            categoryAll,
            AllBags,
            AllShirt,
            SubCat,
        }}>
            {children}
        </DATA.Provider>
    )
}

export default DataContext