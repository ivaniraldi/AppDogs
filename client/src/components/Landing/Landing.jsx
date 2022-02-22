import React from "react";
import "./Landing.css"
import { Link } from "react-router-dom"



export default function Landing(){
    return(
        <>
        <div className="title">
            <h1>Dogs Breed APP</h1>
            <span className="span">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque id perspiciatis voluptatem, repudiandae dolore molestias dolorem hic a aliquid esse modi quas aperiam eius tempora officia ullam necessitatibus suscipit dolorum?</span>
        <Link to="/home">
            <button className="button">Enter to website.</button>
        </Link>

        </div>
        </>
    )
}