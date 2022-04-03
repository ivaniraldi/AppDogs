const initialState = {
    dogs: [],
    filterDogs: [],
    dogDetails: [],
    temperaments: [],
    loading: false,
    data: "",
    filterTemp: ""
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_DOGS":
            return {
                ...state,
                dogs: action.payload,
                filterDogs: action.payload,
            };
        case "GET_DOGS_NAME":
            return {
                ...state,
                filterDogs: action.payload
            }
        case 'GET_DOGS_DETAIL':
            return {
                ...state,
                dogDetails: action.payload
            }
        case "GET_TEMPERAMENTS":
            return {
                ...state,
                temperaments: action.payload
            }
        case "LOADING":
            return {
                ...state,
                loading: true
            }
        case 'POST_DOG':
            return {
                ...state,
            }
        case "ORDER_BY_NAME": {
            return {
                ...state,
                filterDogs: [...state.filterDogs]?.sort((a, b) => {
                    if (a.name < b.name) {
                        return action.payload === "ASC" ? -1 : 1;
                    }
                    if (a.name > b.name) {
                        return action.payload === "ASC" ? 1 : -1;
                    }
                    return 0;
                })
            }
        }
        case "ORDER_BY_WEIGHT":{
            if (action.payload === 'MAX') return {...state, filterDogs: [...state.filterDogs].sort((d1, d2) => d1.weight.slice(-2) > d2.weight.slice(-2) ? -1 : 1)}
            else if (action.payload === 'MIN') return {...state, filterDogs: [...state.filterDogs].sort((d1, d2) => d1.weight.slice(0, 3) > d2.weight.slice(0, 3) ? 1 : -1)}
            break
            }
        case 'ORDER_TEMPERAMENT': {
            return {
            }
        }
        case 'SELECT_DATA':
            return {
                ...state,
                data: action.payload
            };

        default:
            return state
    }
}
export default rootReducer;