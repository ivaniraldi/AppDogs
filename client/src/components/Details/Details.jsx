import React from "react";
import { useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import s from "./Details.module.css";

export default function Details() {
  const e = useSelector((state) => state.dogDetails);
  console.log(e.data);
  return (
    <div>
      <NavBar></NavBar>
      <div className="container">
        <div className="row">
          <h4 className="card-body">{e.name}</h4>
          <img className={s.imgD} src={e.img} alt="Not found" />
          <p className="card-body">{e.temperament}</p>
          <p className="card-body">{e.life_span}</p>
          <p className="card-body">{e.height} inches.</p>
          <p className="card-body">{e.weight} kg.</p>
        </div>
      </div>
    </div>
  );
}
