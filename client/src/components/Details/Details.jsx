import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Loading from "../Loading/Loading";
import Nav from "../Nav/Nav";


export default function Details() {
  const history = useHistory()
  let result = useSelector((state) => state.dogDetails);
  const loading = useSelector(state => state.loading)
  const { name, img, temperament, weight, height, life_span, id } = result;



  return (
    <div >
      {loading ? (<Loading/>) : (
        <div >
          <Nav/>

          <img src={img} alt="NOT FOUND" />

          <div>
            <div >
              <h1>{name}</h1>
              <div >
                <span>
                  <strong>weight:</strong> {weight} kg
                </span>

                <span>
                  <strong>Height:</strong> {height} cm
                </span>

                {typeof id === "number" ? (
                  <>
                    <span>
                      <strong>Life span:</strong> {life_span}
                    </span>
                    <span>
                      <strong>Temperaments:</strong>
                      <div></div>
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      <strong>Life span: </strong> {life_span} years
                    </span>
                    <span>
                      <strong>Temperaments:</strong>
                      <div></div>
                    </span>
                  </>
                )}
              </div>
              {typeof id === "number" ? (
                <div >
                  <p>{temperament}</p>
                </div>
              ) : (
                <div >
                  {temperament  && 
                  <p>{temperament.split(" ").join(", ")}</p>}
                  
                </div>
              )}
            </div>
          </div>
        </div>
      
      )}
    </div>
  );
}