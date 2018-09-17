import { REQUEST_GIFS } from '../actions';
import { LOAD_GIFS } from '../actions';

const initialState =  {
    data: [],
};

export default function gifs(state = initialState, action) {
    switch (action.type) {
        case REQUEST_GIFS:
            return Object.assign({},state,{
                data: action.payload.body.data
            })
        case LOAD_GIFS:
        	//console.log(action)
            return Object.assign({},state,{
                data: action.payload
            })
        default:
            return state;
    }
}
