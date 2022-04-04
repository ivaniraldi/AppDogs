import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import img from "./dog.png"

export default function Landing() {
  return (
    <div>
      <NavBar></NavBar>
      <div className="container" style={{marginTop:"50px"}}>
        <div className="row">
      <h1>Welcome to woofizy</h1>
      <h2>a dog breed app</h2>
      <h5>You can search for dog breeds, look for info and create your own breed. </h5>
      <h5 style={{width:'800px'}}>People have been breeding dogs since prehistoric times. The earliest dog breeders used wolves to create domestic dogs. From the beginning, humans purposefully bred dogs to perform various tasks. Hunting, guarding, and herding are thought to be among the earliest jobs eagerly performed by the animal destined to be called “man’s best friend.”</h5>
      <img src={img} style={{width:'300px', objectPosition:""}} alt="" srcset="" />
      <Link to="/home">
        <div className="d-grid gap-2">
          <button className="btn btn-primary" style={{width:'500px', marginTop:"20px"}} type="button">
            Let's get started...
          </button>
        </div>
      </Link>
      </div>
      </div>
    </div>
  );
}
