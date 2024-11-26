import React, { createContext, useState } from 'react'

export const FilterData = createContext([])
function FilterContext({ children }) {
  const [color, Setcolor] = useState([])
  const [size, Setsize] = useState([])

  const [OpenFilter, SetOpenFilter] = useState(
    {
      'Size': false,
      'Color': false
    })

  function toggleFilter(filterName) {
    SetOpenFilter({
      ...OpenFilter, [filterName]: !OpenFilter[filterName]
    })
  }

  function addSize(selecSize) {
    const test = size.includes(selecSize)
    if (!test) {
      Setsize([...size, selecSize])
    }
    else {
      Setsize(size.filter(item => item != selecSize))
    }

  }
  function addColor(selecColor) {
    const test = color.includes(selecColor)
    if (!test) {
      Setcolor([...color, selecColor])
    }
    else {
      Setcolor(color.filter(item => item != selecColor))
    }

  }
  return (
    <FilterData.Provider value={{
      size,
      color,
      addColor,
      addSize,
      OpenFilter,
      toggleFilter

    }}>
      {children}
    </FilterData.Provider>
  )
}

export default FilterContext