import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsName } from "../../actions";


export default function NavBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
    dispatch(getDogsName(name));
  }


  function onSearch(e) {
    e.preventDefault();
    dispatch(getDogsName(name));
    setName("");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="/home">🐶woofizy</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/home">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/create">Create a breed</a>
          </li>
        </ul>
        <form className="d-flex"> 
          <input className="form-control me-2" type="search" placeholder="Search a breed" aria-label="Search" onChange={(e) => handleChange(e)}/>
          <button className="btn btn-outline-success" type="submit"onClick={(e) => onSearch(e)}>Search</button>
        </form>
      </div>
    </div>
  </nav>
  );
}
