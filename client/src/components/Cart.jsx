import React, { useCallback, useEffect, useState } from 'react'
import { FaRedoAlt, FaShoppingBasket } from "react-icons/fa";
import {useDispatch, useSelector} from 'react-redux'
import { FaTrash } from "react-icons/fa";
import './cart.css'
import { removeFromCart, resetCart } from '../Redux/cartReducer';
const Cart = () => {

    const [cartList, setCartList] = useState(false);

    const showCartList = () =>{
        !products.length > 0 || cartList? setCartList(false) : setCartList(true)
    }
    const reset = () =>{
        dispatch(resetCart());
        setCartList(false)

    }
    const products = useSelector(state=> state.cart.products)
    const dispatch = useDispatch();
 
    return (
    <div className='cart'>
        {/* products.length > 0 &&  */}
        <div className="cart-icon"
          onClick={showCartList}  >
                <FaShoppingBasket /></div>
        <div className="cart-badge">{products.length}</div>

        {cartList
        ?(
        <ul className="cart-list">
            {
              products.map(product => (
                <li key={product.id} className="cart-item">
                <img className="cart-item-image" src={import.meta.env.VITE_APP_URL + product.image} />
                <span className="cart-item-title">{product.title}</span>
                <span className="cart-item-price">{product.price}</span>
                <span className="cart-item-remove"
                onClick={() => products.length == 1 ? 
                    setCartList(false)+ dispatch(removeFromCart({
                        id: product.id,
                      }))
                     : setCartList(true)+ dispatch(removeFromCart({
                    id: product.id,
                  }))
                } 
                ><FaTrash /></span>
            </li>
              ))  
            }
            <span className="cart-reset"
                onClick={reset}
            ><FaRedoAlt/></span>          
        </ul> 
            ):('')
        }
           
        </div>
  )
}

export default Cart