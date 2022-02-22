import React from 'react'
import { useDispatch } from 'react-redux';
import { orderDogs } from '../../actions';
import style from "./Order.css"



export default function Order() {
const dispatch = useDispatch()


function handleOrder(e){
  e.preventDefault()
  dispatch(orderDogs(e.target.value))
}


  return (
    <div>
      <span className={style.spanSelect} >Order</span>
      <select
        onChange={(e)=>handleOrder(e)}
        className="select" 
        defaultValue="order"
      >
        <option value="">Select</option>
        <option value="AZ">A-Z</option>
        <option value="ZA">Z-A</option>
        <option value="Low">Weight low</option> 
        <option value="High">Weight High</option>

      </select>
    </div>
  );
  
}