import React from 'react'
import { useEffect } from 'react'
import { useDispatch, } from "react-redux" 
import Card from '../Card/Card'
import { getDogs, getDogDetails } from "../../actions"
import { Link } from "react-router-dom"


export default function Cards({stateDog}) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])
    return (
        <div>
            <ul>
                {
                    stateDog.map((e, i)=>{
                        return <div key={i}>
                            <Link onClick={() => dispatch(getDogDetails(e.id))} to={`/details/${e.id}`} ><Card name={e.name} img={e.img} temperament={e.temperament} weight={e.weight} id={e.id}/></Link>
                        </div>
                    })
                }
            </ul>
        </div>
    )
}
