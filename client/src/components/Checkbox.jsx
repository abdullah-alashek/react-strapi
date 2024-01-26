import React, { useContext, useEffect, useState } from 'react'
import "./Checkbox.css"
import StoreContext from "../hooks/storeContext"
import qs from 'qs'
export const Checkbox = ({category}) => {

  const {setFilter, selectedCategories, setSelectedCategories} = useContext(StoreContext)

  useEffect(() => {
    const query = qs.stringify({
      filters:{
        categories: {
          id: {
            $in : selectedCategories
          }
        }
      }
    })
    // setFilter('http://localhost:1337/api/products?populate=*&filters[categories][id][$eq]=' + e.target.dataset.category)
    setFilter(import.meta.env.VITE_API_URL + '/products?populate=*&' + query)
  }, [selectedCategories])

  const handleFilterCategory = (e) => {
    const selectID = e.target.dataset.category
    const isChecked =e.target.checked 
    setSelectedCategories(selectedCategories => {
     if (isChecked) return [...selectedCategories , selectID]
     return selectedCategories.filter(id => id != selectID )
    })
  }

  return (
    <div>
        <label className="toggler-wrapper style-1">
            <input type="checkbox"
            onChange={handleFilterCategory} 
            data-category={category.id}
             />
            <div className="toggler-slider">
                <div className="toggler-knob"></div>
            </div>
            <div className="badge">{category.attributes.title}</div>
        </label>
        
        {/* <h2>{category.attributes.title}</h2>
        <div>{category.attributes.description}</div>
        <img src={import.meta.env.VITE_APP_URL + category.attributes.image.data.attributes.url} alt="" />
     */}
     </div>
  )
}
