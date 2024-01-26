import { Fragment, useContext, useEffect, useState } from 'react'
import { useFetch } from './../hooks/useFetch'
import "./product.css"
import { Checkbox } from './Checkbox'
import StoreContext from "../hooks/storeContext"

const Categories = () => {


    const [categories,setCategories] = useState([])
    const {data, loading, error} = useFetch("/Categories?populate=*")


    useEffect(() => {
      data && setCategories(data)
    },[data])
  
  return (
    <div className='categories'>
      {
        loading
        ? "Loading ..."
        :categories.map(category =>(
            <Fragment key={category.id}>
                < Checkbox category={category}/>
            </Fragment>
          
        ))
      }
    </div>
  )
}

export default Categories