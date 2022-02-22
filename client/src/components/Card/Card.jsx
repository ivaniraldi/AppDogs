import React from "react";
import "../Card/Card.css"


export default function Card({name, img, temperament, weight, id}){
    return(
        <div className="content">
            <h3 className="textoCard">{name}</h3>
            <img src={img} alt="NOT FOUND" className="imgCard"/>
            {typeof (id)==="number" ? <span className="textoCard" ><h5 className="textoCard">Temperaments:</h5>{temperament}</span> : <span className="textoCard"><h5 className="textoCard">Temperaments:</h5>{temperament.split(" ").join(", ")}</span>}
            <h5 className="textoCard">Weight: </h5>
            <span className="textoCard">{weight} Kg.</span>
        </div>

    )
}