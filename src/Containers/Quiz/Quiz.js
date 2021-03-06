import React, { Component } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../Components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../Components/FinishedQuiz/FinishedQuiz";
import axios from "../../axios/axios-quiz";
import Loader from "../../Components/UI/Loader/Loader";

class Quiz extends Component {
    state = {
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        results: {}, //{[id]:success error}
        loading: true,
        quiz: []
    };

    onAnswerClickHandler = answeId => {
        //недопускаем множество кликов на правельный ответ
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === "success") {
                return;
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if (question.rightAnswerId === answeId) {
            if (!results[question.id]) {
                results[question.id] = "success";
            }

            this.setState({
                answerState: { [answeId]: "success" },
                results
            });

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    });
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    });
                }
                window.clearTimeout(timeout);
            }, 500);
        } else {
            results[question.id] = "error";
            this.setState({
                //activeQuestion: this.state.activeQuestion + 1,
                answerState: { [answeId]: "error" },
                results
            });
        }
    };
    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }
    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        });
    };

    async componentDidMount() {
        try {
            const response = await axios.get(
                `quizes/${this.props.match.params.id}.json`
            );
            const quiz = response.data;

            this.setState({
                quiz,
                loading: false
            });
        } catch (e) {
            console.log(e);
        }
        console.log("Quiz ID = ", this.props.match.params.id);
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {this.state.loading ? (
                        <Loader />
                    ) : this.state.isFinished ? (
                        <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                        />
                    ) : (
                        <ActiveQuiz
                            question={
                                this.state.quiz[this.state.activeQuestion]
                                    .question
                            }
                            answers={
                                this.state.quiz[this.state.activeQuestion]
                                    .answers
                            }
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            answerNumber={this.state.activeQuestion}
                            answerState={this.state.answerState}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default Quiz;
