import axios from "../../axios/axios-quiz";
import { FETHC_QUIZES_START, FETHC_QUIZES_SUCCESS, FETHC_QUIZES_ERROR } from "./actionTypes";

export function fetchQuizes(){
    return async dispath => {
        dispath(fetchQuizesStart());
        try {
            const response = await axios.get(
                "quizes.json"
            );
            const quizes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`
                });
            });
            dispath(fetchQuizesSuccess(quizes))
        } catch (e) {
            dispath(fetchQuizesError(e))
        }
    }
}

export function fetchQuizesStart(){
    return {type:FETHC_QUIZES_START}
}
export function fetchQuizesSuccess(quizes){
    return {type:FETHC_QUIZES_SUCCESS, quizes:quizes}
}
export function fetchQuizesError(e){
    return {type:FETHC_QUIZES_ERROR, error:e}
}