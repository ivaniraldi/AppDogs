import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <h1>Welcome to AppDogs</h1>
      <Link to="/home">
        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="button">
            Let's go...
          </button>
        </div>
      </Link>
    </div>
  );
}
