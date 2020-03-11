import { FETHC_QUIZES_START, FETHC_QUIZES_SUCCESS, FETHC_QUIZES_ERROR } from "../actions/actionTypes"

const initialState = {
    quizes: [],
    loading: true
}

export default function quizReducer(state = initialState, acion){
    switch (acion.type){
        case FETHC_QUIZES_START:
            return {...state, loading:true}
        case FETHC_QUIZES_SUCCESS:
            return {...state, loading:false,quizes:acion.quizes}
        case FETHC_QUIZES_ERROR:
            return {...state, loading:false, error:acion.error}
        default:
            return state
    }
}