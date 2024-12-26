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

    const [wishlistDATA, setwishlistDATA] = useState([])

    function addToWishlist(obj) {
        let test2 = ''
        const test = wishlistDATA.find((item, i) => item.id == obj.id)
        if (test) {
            test2 = wishlistDATA.filter((item, i) => item.id != obj.id)
        }
        else {
            test2 = [...wishlistDATA, obj]
        }

        localStorage.setItem('wishlist', JSON.stringify(test2))

        setwishlistDATA(test2)
    }

    useEffect(() => {
        const test = localStorage.getItem('wishlist')
        if (test) {
            setwishlistDATA(JSON.parse(test))
        }
    }, [])
    
    return (
        <DATA.Provider value={{
            categoryAll,
            AllBags,
            AllShirt,
            SubCat,
            addToWishlist,
            wishlistDATA,
            setwishlistDATA

        }}>
            {children}
        </DATA.Provider>
    )
}

export default DataContext