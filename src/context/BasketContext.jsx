import React, { createContext, useEffect } from 'react'
import { useState } from 'react';
export const Basket = createContext([])

function BasketContext({ children }) {
    const [DATAbasket, setDATAbasket] = useState([])
    function addToBasket(id, name, price, discount, color, size, img) {
        const index = DATAbasket.findIndex((item) => item.id == id && item.color == color && item.size == size)
        let updatedBasket = [...DATAbasket]
        if (index != -1) {
            updatedBasket[index].quantity =+updatedBasket[index].quantity+1
        }
        else {
            updatedBasket = [...DATAbasket,
            {
                id,
                name,
                img,
                price,
                discount,
                color,
                size,
                'quantity': 1
            }
            ]

        }

        setDATAbasket(updatedBasket);
        localStorage.setItem('basket', JSON.stringify(updatedBasket))

    }
    function BasketRemove(id) {
        let updatedBasket = [...DATAbasket]
        updatedBasket = updatedBasket.filter((item,i) =>  item.id != id )
        setDATAbasket(updatedBasket);
        localStorage.setItem('basket', JSON.stringify(updatedBasket))
    }
    useEffect(() => {
        const test = localStorage.getItem('basket')
        if (test) {
            setDATAbasket(JSON.parse(test))
        }
    }, []);
    return (
        <Basket.Provider value={{
            addToBasket,
            DATAbasket,
            BasketRemove,
            setDATAbasket

        }}>
            {children}
        </Basket.Provider>
    )
}

export default BasketContext