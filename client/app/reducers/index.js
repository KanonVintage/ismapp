import { combineReducers } from 'redux';

import GifsReducer from './gifs';
import ModalReducer from './modal';
import ConModalReducer from './conmodal';
import ContenedorReducer from './contenedor';

const rootReducer = combineReducers({
    gifs: GifsReducer,
    modal: ModalReducer,
    conmodal: ConModalReducer,
    contenedor: ContenedorReducer,
});

export default rootReducer;