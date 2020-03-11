import axios from "../../axios/axios-quiz";
import { FETHC_QUIZES_START, FETHC_QUIZES_SUCCESS, FETHC_QUIZES_ERROR,FETHC_QUIZ_SUCCESS, QUIZ_SET_STATE, FINISH_QUIZ, QUIZ_NEXT_QUESTION } from "./actionTypes";

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

export function fetchQuizById(quizId){
    return async dispath =>{
        dispath(fetchQuizesStart());

        try {
            const response = await axios.get(
                `quizes/${quizId}.json`
            );
            const quiz = response.data;

            dispath(fetchQuizSuccess(quiz))
        } catch (e) {
            dispath(fetchQuizesError(e))
        }
        
    }
}

export function fetchQuizSuccess(quiz){
    return {
        type:FETHC_QUIZ_SUCCESS,
        quiz
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

export function quizSetState(answerState, results){
    return {type:QUIZ_SET_STATE, answerState, results}
}
export function finisQuiz(){
    return {type:FINISH_QUIZ}
}
export function quizNextQuestion(number){
    return {type:QUIZ_NEXT_QUESTION, number}
}

export function quizAnswerClick(answerId){
    
    return (dispath, getState) => {
        const state = getState().quiz
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === "success") {
                return;
            }
        }

        const question = state.quiz[state.activeQuestion];
        const results = state.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = "success";
            }
            dispath(quizSetState({ [answerId]: "success" }, results))
            

            const timeout = window.setTimeout(() => {
                console.log(state.activeQuestion);
                if (state.activeQuestion+1===state.quiz.length) {
                    dispath(finisQuiz())
                } else {
                    dispath(quizNextQuestion())
                }
                window.clearTimeout(timeout);
            }, 500);
        } else {
            results[question.id] = "error";
            dispath(quizSetState({ [answerId]: "error" }, results))
        }
    }
}