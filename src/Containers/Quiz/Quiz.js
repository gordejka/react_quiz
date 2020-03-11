import React, { Component } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../Components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../Components/FinishedQuiz/FinishedQuiz";
import axios from "../../axios/axios-quiz";
import Loader from "../../Components/UI/Loader/Loader";
import { connect } from "react-redux";
import { fetchQuizById, quizAnswerClick } from "../../store/actions/quiz";

class Quiz extends Component {
    
    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        });
    };

    async componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {this.props.loading || !this.props.quiz ? (
                        <Loader />
                    ) : this.props.isFinished ? (
                        <FinishedQuiz
                            results={this.props.results}
                            quiz={this.props.quiz}
                            onRetry={this.retryHandler}
                        />
                    ) : (
                        <ActiveQuiz
                            question={
                                this.props.quiz[this.props.activeQuestion]
                                    .question
                            }
                            answers={
                                this.props.quiz[this.props.activeQuestion]
                                    .answers
                            }
                            onAnswerClick={this.props.quizAnswerClick}
                            quizLength={this.props.quiz.length}
                            answerNumber={this.props.activeQuestion}
                            answerState={this.props.answerState}
                        />
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        results: state.quiz.results, 
        loading: state.quiz.loading,
        quiz: state.quiz.quiz
    }
}
function mapDispatchToProps(dispatch){
    return{
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);