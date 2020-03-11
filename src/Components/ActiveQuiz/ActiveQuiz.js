import React from 'react'
import classes from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = props =>(
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span >
                <strong>{props.answerNumber+1}. </strong>
                {props.question}
            </span>
            <small>{props.answerNumber+1} из {props.quizLength}</small>
        </p>
        <AnswersList 
            answerState={props.answerState}
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
        />
    </div>
)

export default ActiveQuiz;