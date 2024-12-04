import React, { createContext, useEffect, useState } from 'react'
import { getAllBags, getAllCategory, getAllShirt, getSubCategory } from '../service/api'
export const DATA = createContext([])
function DataContext({ children }) {
    const [categoryAll, SetCategoryAll] = useState(null)
    const [AllBags, SetAllBags] = useState(null)
    const [AllShirt, SetAllShirt] = useState(null)
    const [SubCat, SetSubCat] = useState(null)
    const [wishlistDATA, setwishlistDATA] = useState([])

    useEffect(() => {
        getAllCategory().then(res => SetCategoryAll(res))
        getAllBags().then(res => SetAllBags(res))
        getAllShirt().then(res => SetAllShirt(res))
    }, [])

    function addToWishlist(obj) {
        const test = wishlistDATA.find((item, i) => item.id == obj.id)
        if (test) {
            setwishlistDATA(wishlistDATA.filter((item, i) => item.id != obj.id))
        }
        else{
            setwishlistDATA([...wishlistDATA,obj])
        }
        console.log(wishlistDATA);
        
    }
    
    return (
        <DATA.Provider value={{
            categoryAll,
            AllBags,
            AllShirt,
            SubCat,
            addToWishlist,
            wishlistDATA
        }}>
            {children}
        </DATA.Provider>
    )
}

export default DataContext