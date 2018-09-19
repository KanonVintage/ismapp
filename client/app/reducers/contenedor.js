import { REQUEST_CONTENEDORES } from '../actions';

const initialState =  {
    data: [],
};

export default function contenedor(state = initialState, action) {
    switch (action.type) {
        case REQUEST_CONTENEDORES:
            return Object.assign({},state,{
                data: action.payload.body.data
            })
        default:
            return state;
    }
}
