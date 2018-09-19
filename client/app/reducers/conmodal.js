import { OPEN_CONMODAL, CLOSE_CONMODAL } from '../actions';

const initialState =  {
    selectedCon: {},
    conmodalIsOpen: false
};

export default function conmodal(state = initialState, action) {
    switch(action.type) {
        case OPEN_CONMODAL:
            return Object.assign({},state,{
                conmodalIsOpen: true,
                selectedCon: action.gif.selectedGif
            })
        case CLOSE_CONMODAL:
            return Object.assign({},state,{
                conmodalIsOpen: false,
                selectedCon: null
            })
        default:
            return state;
    }
}