import React, { createContext, useEffect, useState } from 'react'
import { getAllBags, getAllCategory, getAllShirt } from '../service/api'
export const DATA = createContext([])
function DataContext({ children }) {
    const [categoryAll, SetCategoryAll] = useState(null)
    const [AllBags, SetAllBags] = useState(null)
    const [AllShirt, SetAllShirt] = useState(null)

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
        }}>
            {children}
        </DATA.Provider>
    )
}

export default DataContext