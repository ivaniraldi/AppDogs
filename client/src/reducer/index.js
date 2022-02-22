const initialState = {
    dogs: [],
    allDogs: [],
    dogDetails: [],
    temperaments: [],
    loading: false,
    data: "",
    filterTemp: ""
}

function rootReducer(state= initialState, action ){
    switch(action.type){
        case "GET_DOGS":
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case "GET_DOGS_NAME":
            return{
                ...state,
                dogs: action.payload
            }
        case 'GET_DOGS_DETAIL':
            return {
                ...state,
                dogDetails: action.payload
            }
        case "GET_TEMPERAMENTS":
            return{
                ...state,
                temperaments: action.payload
            }
        case "LOADING":
            return{
                ...state,
                loading: true
            }
        case 'POST_DOG':
            return {
                ...state,
            }        
        case 'ORDER_DOGS':{
            if (action.payload === 'AZ') return { ...state, dogs: [...state.dogs].sort((d1, d2) => d1.name.toLowerCase() > d2.name.toLowerCase() ? 1 : -1)}
            else if (action.payload === 'ZA')return {...state, dogs: [...state.dogs].sort((d1, d2) => d1.name.toLowerCase() > d2.name.toLowerCase() ? -1 : 1)}
            else if (action.payload === 'High') return {...state, dogs: [...state.dogs].sort((d1, d2) => d1.weight.slice(-2) > d2.weight.slice(-2) ? -1 : 1)}
            else if (action.payload === 'Low') return {...state, dogs: [...state.dogs].sort((d1, d2) => d1.weight.slice(0, 3) > d2.weight.slice(0, 3) ? 1 : -1)}
            break
            }
        case 'ORDER_TEMPERAMENT':{
            return {
            }
        }
        case 'SELECT_DATA':
            return{
                ...state,
                data: action.payload
        };
    
        default:
            return state
    }
}
export default rootReducer;