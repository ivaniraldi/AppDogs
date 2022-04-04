import axios from "axios";

export function getDogs(){
    return async function(dispatch){
        const dogs= await axios.get("http://localhost:3001/dogs")
        return dispatch ({
            type: "GET_DOGS",
            payload: dogs.data
        })
    }
}
export function getTemperaments(){
    return async function(dispatch){
        const temperaments = await axios.get("http://localhost:3001/temperament",[]
        );
        return dispatch ({
            type: 'GET_TEMPERAMENTS',
            payload: temperaments.data
        });
    };
};
export function getDogsName(name){
    return async function(dispatch){
        try{
        const dogsName = await axios.get(`http://localhost:3001/dogs?name=${name}`,{});
        return dispatch ({
            type: 'GET_DOGS_NAME',
            payload: dogsName.data
        });    
    }
    catch(e){
        console.log(e)
    }}; 
};
export function getDogDetails(id){
    return async function(dispatch){
    try {
        const dogDetails = await axios.get(`http://localhost:3001/dogs/${id}`);
        return dispatch ({
            type: "GET_DOGS_DETAIL",
            payload: dogDetails.data
        });
    } catch (e) {
        console.log(e)
    }
}; 
    
};

export function postDog(payload){
    return async function(){
        const newDog = await axios.post('http://localhost:3001/dog', payload);
        return newDog
    };
 
};
export function orderByWeight(order){
    return function(dispatch){
        dispatch({
            type: 'ORDER_BY_WEIGHT',
            payload: order
        })
    }
};
export function orderByName(order){
    return function(dispatch){
        dispatch({
            type: 'ORDER_BY_NAME',
            payload: order
        })
    }
};
export function filterTemperament(payload){
    return function(dispatch){
        dispatch({
            type: 'ORDER_TEMPERAMENT',
            payload
        })
    }
};
export function filterDogsByOrigin(payload) {
    return {
        type: "FILTER_BY_ORIGIN",
        payload,
    }
};
export function selectData(data){
    return function(dispatch){
        dispatch({
            type: 'SELECT_DATA',
            payload: data
        })
    }
};


// get nombre
// get detalles
// get temperaments