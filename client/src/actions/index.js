import axios from "axios";

export function getDogs(){
    return async function(dispatch){
        var allDogs= await axios.get("http://localhost:3001/dogs")
        return dispatch ({
            type: "GET_DOGS",
            payload: allDogs.data
        })
    }
}
export function getTemperaments(){
    return async function(dispatch){
        var temperaments = await axios.get("http://localhost:3001/temperament",[]
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
        var dogsName = await axios.get(`http://localhost:3001/dogs?name=${name}`,{});
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
        var dogDetails = await axios.get(`http://localhost:3001/dogs/${id}`);
        return dispatch ({
            type: "GET_DOGS_DETAIL",
            payload: dogDetails.data
        });
    } catch (e) {
        console.log(e)
    }
}; 
    
};

export function sortByName(payload){
    return {
        type: "SORT_BY_NAME",
        payload
    }
}
export function loading(){
    return{
        type: "LOADING",
    }
}
export function postDog(payload){
    return async function(){
        var newDog = await axios.post('http://localhost:3001/dog', payload);
        return newDog
    };
 
};
export function orderDogs(order){
    return function(dispatch){
        dispatch({
            type: 'ORDER_DOGS',
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