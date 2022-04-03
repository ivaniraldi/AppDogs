import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getDogDetails,
  getDogs,
  getTemperaments,
  orderByName,
  orderByWeight,
} from "../../actions";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";


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

  }

  return (
    <div>
      <NavBar></NavBar>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <p className="nav-link disabled">Filter by Name</p>
        </li>
        <li className="nav-item">
          <button className="nav-link active" onClick={() => orderDogsName("ASC")}>
            A-Z 
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link active" onClick={() => orderDogsName("DSC")}>
            Z-A
          </button>
        </li>
        <li className="nav-item">
          <p className="nav-link disabled">
          By Weight
          </p>
        </li>
        <li className="nav-item">
      <button className="nav-link active" onClick={() => orderDogsWeight("MIN")}>
        Min-Max
      </button>
        </li>
        <li className="nav-item">
      <button className="nav-link active" onClick={() => orderDogsWeight("MAX")}>
        Max-Min
      </button>
        </li>
        <li className="nav-item">
          <p className="nav-link disabled">
          By Temperament
          </p>          
        </li>
        <li className="nav-item">
      <select className="nav-link active" onChange={handlerOnChangeTemps}>
      <option value="" />
            {temps &&
              temps.map((el) => (
                <option value={el.code + " " + el.name} key={el.code}>
                  {el.name}
                </option>
              ))}
        Select
      </select>
        </li>
      </ul>
      <div className="container">
      <div className="row">
        {dogsToShow.map((e) => {
          return (
              <Link className="card w-25" to={`/details/${e.id}`} onClick={() => dispatch(getDogDetails(e.id))}>
  
              <h4 className="card-body">{e.name}</h4>
              <img  className="card-body" src={e.img} alt="Not found" />
              <p className="card-body">{e.temperament}</p>
              <p className="card-body">{e.weight} kg.</p>
            </Link>
            



);
})}
      </div>
      </div>
      <div className="card">
          <div className="card-body">
        {Dogs.length > dogsPerPage && (
            
              <ul className="nav nav-pills">
                  <li className="nav-item">
          <button className="nav-link active" onClick={() => handleChangePag("-")}>
            Prev
          </button>
        </li>
        <li className="nav-item">
          <p className="nav-link disabled">{page}</p>
        </li>
        <li className="nav-item">
          <button className="nav-link active" onClick={() => handleChangePag("+")}>
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
