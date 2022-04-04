import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterDogsByOrigin,
  filterTemperament,
  getDogDetails,
  getDogs,
  getTemperaments,
  orderByName,
  orderByWeight,
} from "../../actions";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import Card from "../Cards/Card";

export default function Home() {
  const dispatch = useDispatch();

  const temps = useSelector((state) => state.temperaments);
  const Dogs = useSelector((state) => state.filterDogs);
  const [dogsToShow, setdogsToShow] = useState([]);
  const [page, setPage] = useState(1);
  const dogsPerPage = 8;
  const lastDogtoShow = page * dogsPerPage;
  const firstDogToShow = lastDogtoShow - dogsPerPage;
  const totalPages = Math.ceil(Dogs.length / dogsPerPage);

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);
  useEffect(() => {
    setdogsToShow(Dogs.slice(firstDogToShow, lastDogtoShow));
  }, [page, Dogs, firstDogToShow, lastDogtoShow]);

  const orderDogsName = (type) => {
    dispatch(orderByName(type));
  };
  const orderDogsWeight = (type) => {
    dispatch(orderByWeight(type));
  };

  const handleChangePag = (type) => {
    if (type === "-") {
      setPage(page === 1 ? totalPages : page - 1);
    } else {
      setPage(page === totalPages ? 1 : page + 1);
    }
  };
  function handlerOnChangeTemps(e) {
    e.preventDefault()
    dispatch(filterTemperament(e.target.value));
  }

  function handleFilterOrigin(e) {
    e.preventDefault();
    dispatch(filterDogsByOrigin(e.target.value))
}
  return (
    <div>
      <NavBar></NavBar>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <p className="nav-link disabled">Filter by Name</p>
        </li>
        <li className="nav-item">
          <button
          style={{marginRight:"5px"}}
            className="nav-link active"
            onClick={() => orderDogsName("ASC")}
          >
            A-Z
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link active"
            onClick={() => orderDogsName("DSC")}
          >
            Z-A
          </button>
        </li>
        <li className="nav-item">
          <p className="nav-link disabled">By Weight</p>
        </li>
        <li className="nav-item">
          <button
          style={{marginRight:"5px"}}
            className="nav-link active"
            onClick={() => orderDogsWeight("MIN")}
          >
            Min-Max
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link active"
            onClick={() => orderDogsWeight("MAX")}
          >
            Max-Min
          </button>
        </li>
        <li className="nav-item">
          <p className="nav-link disabled">By Temperament</p>
        </li>
        <li className="nav-item">
          <select
            className="nav-link active"
            onChange={(e) => handlerOnChangeTemps(e)}
          >
            <option key={0} value="all">
              All temperaments
            </option>
            {temps
              ?.sort(function (a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
              })
              .map((el) => {
                return (
                  <option key={el.id} value={el.name}>
                    {el.name}
                  </option>
                );
              })}
            Select
          </select>
        </li>
          <li className="nav-item">
          <p className="nav-link disabled">By Origin</p>
        </li>
        <li  >
                        <select className='nav-link active' onChange={e => handleFilterOrigin(e)}  >
                            <option value='all'>All breeds</option>
                            <option value='api'>Existent breeds</option>
                            <option value='created'>Created breeds</option>
                        </select>
                    </li>
      </ul>
      <div className="container">
        <div className="row">
          {dogsToShow.map((e) => {
            return (
              <Link
                to={`/details/${e.id}`}
                style={{textDecoration:"none", color:"black", width:"300px", height:"400px"}}
                onClick={() => dispatch(getDogDetails(e.id))}
              >
                <Card 
                   name={e.name}
                   image={e.img}
                   temperaments={e.temperament}
                   weight={e.weight}
                   key={e.id}
                   />

              </Link>
            );
          })}
        </div>
      </div>
      <div className="card">
        <div className="card-body" style={{justifyContent:"space-around"}}>
          {Dogs.length > dogsPerPage && (
            <ul className="nav nav-pills" style={{justifyContent:"space-evenly"}}>
              <li className="nav-item">
                <button
                style={{justifyContent:"space-around"}}
                  className="nav-link active"
                  onClick={() => handleChangePag("-")}
                >
                  Prev
                </button>
              </li>
              <li className="nav-item"
              style={{justifyContent:"space-around"}}>
                
                <p className="nav-link disabled">{page}</p>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link active"
                  onClick={() => handleChangePag("+")}
                >
                  Next
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
