import { REQUEST_CONTENEDORES, SAVE_CONTENEDOR } from '../actions';
import { OPEN_CONMODAL, CLOSE_CONMODAL } from '../actions';

const initialState =  {
    data: [],
    selectedCon: {},
    conmodalIsOpen: false
};

export default function contenedor(state = initialState, action) {
    switch (action.type) {
        case REQUEST_CONTENEDORES:
            return Object.assign({},state,{
                data: action.payload.body.data,
                selectedCon: {},
            })
        case SAVE_CONTENEDOR:
        	//console.log(action.payload)
            return Object.assign({},state,{
                data: action.payload,
                selectedCon: {},
            })
        default:
            return state;
    }
}
