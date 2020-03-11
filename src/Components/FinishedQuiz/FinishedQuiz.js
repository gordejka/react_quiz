import React from "react";
import classes from "./FinishedQuiz.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";

const FinishedQuiz = props => {
    //console.log(props.results);
    const successAnswersCount = Object.keys(props.results).reduce(
        (total, key) => {
            if (props.results[key] === "success") {
                total++;
            }
            return total;
        },
        0
    );

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    return (
                        <li key={index}>
                            <strong>{index + 1}. </strong>
                            {quizItem.question}
                            {props.results[quizItem.id] === "success" ? (
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={classes.success}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className={classes.error}
                                />
                            )}
                        </li>
                    );
                })}
            </ul>
            <p>
                Правильно {successAnswersCount} из {props.quiz.length}
            </p>
            <div>
                <Button action={props.onRetry} type="primary">
                    Повторить
                </Button>
                <Link to="/">
                    <Button type="success">
                        перейти в список тестов
                    </Button>
                </Link>
                
            </div>
        </div>
    );
};
export default FinishedQuiz;
