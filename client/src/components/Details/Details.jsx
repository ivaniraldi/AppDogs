import React from "react";
import { useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";


export default function Details() {
  const e = useSelector((state) => state.dogDetails);
  console.log(e.data);
  return (
    <div>
      <NavBar></NavBar>
        <div className="container">
      <div className="card"style={{width:"400px"}}>
          <img class="card-img-top"  src={e.img} alt="Not found" />
          <h4 className="card-body">{e.name}</h4>
          <p className="list-group-item">Temperaments: {e.temperament}</p>
          <p className="list-group-item">Life span: {e.life_span}.</p>
          <p className="list-group-item">Height: {e.height} inches.</p>
          <p className="list-group-item">Weight: {e.weight} kg.</p>
        </div>
      </div>
    </div>
  );
}
