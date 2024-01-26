import { useContext, useEffect, useState } from 'react'
import { useFetch } from './../hooks/useFetch'
import "./product.css"
import StoreContext from "../hooks/storeContext"
import { addToCart } from '../Redux/cartReducer'
import { useDispatch } from 'react-redux'

const Products = () => {
  
    const {filter} = useContext(StoreContext)
    const [products,setProducts] = useState([])
    const {data, loading, error} = useFetch(filter)
    const dispatch = useDispatch();

    useEffect(() => {
      data && setProducts(data)
    },[data])

  
  return (
    <div className='products'>
      {
        loading
        ? "Loading ..."
        :products.map(product =>(
          <div key={product.id}>
          <div className='product' key={product.id}>
            <h2 className='product-title'>{product.attributes.title}</h2>
            <div className='product-price'>{product.attributes.price}</div>
            <img className='product-image' src={import.meta.env.VITE_APP_URL + product.attributes.image.data.attributes.url} alt="" />
            <div className='product-desc'>{product.attributes.Desc}</div>
          </div>
          <button
            onClick={() => dispatch(addToCart({
              id: product.id,
              title: product.attributes.title,
              desc: product.attributes.desc,
              price: product.attributes.price,
              image: product.attributes.image.data.attributes.url
            }))}
          >add to cart</button>
          </div>

        ))
      }
    </div>
  )
}

export default Products