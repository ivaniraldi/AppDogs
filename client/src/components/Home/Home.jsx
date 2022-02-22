import React, { useEffect, useState } from 'react'
import Cards from '../Cards/Cards'
import style from './Home.css'
import SearchBar from '../SearchBar/SearchBar'
import Nav from '../Nav/Nav'
import Paginate from '../Paginate/Paginate'
import { useSelector, useDispatch } from 'react-redux'
import { filterTemperament, getDogs, getTemperaments } from '../../actions'


export default function Home() {

    let stateDog = useSelector((state) => state.dogs);
    const dispatch = useDispatch()
    const data = useSelector((state) => state.data)
    const [currentPage, setCurrentPage] = useState(1)
    const [xPage] = useState(8)
    const filterTemp = useSelector((state) => state.filterTemp);

    useEffect(() => {
        dispatch(getDogs())
        dispatch(getTemperaments())
        dispatch(filterTemperament('All'))
    }, [dispatch]);
    let resultD = stateDog;
    if (data === 'Created'){
        resultD = stateDog.filter(e => typeof(e.id) === 'string')
    } else if (data === 'Other'){
        resultD = stateDog.filter(e => typeof(e.id) === 'number')
    }
    else{resultD= stateDog}
    console.log(resultD)

    const indexLast = currentPage * xPage;
    const indexFirst = indexLast - xPage;
    const currentDog = resultD.slice(indexFirst, indexLast);
    const paginate = (pageNumber) =>{setCurrentPage(pageNumber)};
    const allpages = Math.ceil(resultD.length / xPage)
    var next = currentPage;
    var previus = currentPage;

    if(currentPage < allpages){
        next = currentPage + 1;
    };
    if(currentPage > 1){
        previus = currentPage - 1;
    };

    if (stateDog && filterTemp !== undefined){
    
        // eslint-disable-next-line array-callback-return
        stateDog = stateDog.filter((e) => {
          if (filterTemp === "All") {

            return stateDog;
          } else if (e.temperament !== undefined) {
            return e.temperament.split(",").join("").match(filterTemp);
          }
        });
      }

    return (
        <div>

            <div className={style.background}>
            <Nav/>
            <SearchBar/>
            <Paginate 
                xPage={xPage} 
                result={resultD.length} 
                paginate={paginate}
                previus={previus}
                next={next}
                />
            <div className={style.back}>
                <Cards stateDog={currentDog}/>
            </div>
            </div>
        </div>
    )
}