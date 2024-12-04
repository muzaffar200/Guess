import React, { createContext, useState } from 'react'

export const FilterData = createContext([])
function FilterContext({ children }) {
  const [OpenFilter, SetOpenFilter] = useState(
    {
      'Size': false,
      'Color': false, 
      'Discount': false,
      'MobilFilter':false,
      'Featured':false,
      'Price':false
    })
    
    function toggleFilter(filterName) {
      SetOpenFilter({
        ...OpenFilter, [filterName]: !OpenFilter[filterName]
      })
    }
   
  return (
    <FilterData.Provider value={{
      OpenFilter,
      toggleFilter

    }}>
      {children}
    </FilterData.Provider>
  )
}

export default FilterContext