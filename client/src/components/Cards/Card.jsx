import React from "react";


export default function Card({ image, name, temperaments, weight, id }) {

    return (
        <div className='card'style={{width: "13rem"}} >
            <img src={image} alt={`${name}`} width='200px' height={"200px"} class="card-img-top"/>
            <div className="card-body">
            <h5 className="card-title" >{name}</h5>
            <p className="card-text">{function (temperaments) {
                if (typeof (temperaments) === 'string') {
                    return temperaments;
                }
                if (Array.isArray(temperaments)) {
                    let temps = temperaments.map(el => el.name);
                    return temps.join(', ');
                }
            }(temperaments)}</p>
            {
                name !== 'Sorry, looks like we don´t have that dog breed' ?
                <p className="card-text">Weight: {weight} kg</p> :
                <></>
            }
            </div>
        </div>
    )
}
