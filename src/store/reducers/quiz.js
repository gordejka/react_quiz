import { FETHC_QUIZES_START, FETHC_QUIZES_SUCCESS, FETHC_QUIZES_ERROR, FETHC_QUIZ_SUCCESS, QUIZ_SET_STATE, FINISH_QUIZ, QUIZ_NEXT_QUESTION } from "../actions/actionTypes"

const initialState = {
    quizes: [],
    loading: true,
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    results: {}, //{[id]:success error}
    quiz: []
}

export default function quizReducer(state = initialState, action){
    switch (action.type){
        case FETHC_QUIZES_START:
            return {...state, loading:true}
        case FETHC_QUIZES_SUCCESS:
            return {...state, loading:false,quizes:action.quizes}
        case FETHC_QUIZES_ERROR:
            return {...state, loading:false, error:action.error}
        case FETHC_QUIZ_SUCCESS:{
            return {...state, loading:false, quiz:action.quiz}
        }
        case QUIZ_SET_STATE:
            return {...state, loading:false, answerState:action.answerState, results:action.results}
        case FINISH_QUIZ:
            return {...state, isFinished:true}
        case QUIZ_NEXT_QUESTION:
            return {...state, answerState: null, activeQuestion: action.number}
        
        default:
            return state
    }
}