import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { getDogsName } from "../../actions";

 export default function SearchBar (){
     const [name, setName] = useState("")
     const dispatch = useDispatch()
  
  function handleChange (e){
    e.preventDefault();
    setName(e.target.value)
    dispatch(getDogsName(name))
}

function onSearch (e){
    e.preventDefault()
    dispatch(getDogsName(name))
    setName("")
    }
    
   
    return (
        <div>
        <input type='text' placeholder='Enter a breed...' onChange={(e) => handleChange(e)}></input>
        
        <button type='submit' onClick={(e) => onSearch(e)}>Search</button>
        </div>
    )
}