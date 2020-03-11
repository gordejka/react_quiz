import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from "./QuizList.module.css";

import axios from "../../axios/axios-quiz";
import Loader from "../../Components/UI/Loader/Loader";
import { connect } from "react-redux";
import { fetchQuizes } from "../../store/actions/quiz";

class QuizList extends Component {
 
    renderQuizes() {
        return this.props.quizes.map(quiz => {
            return (
                <li key={quiz.id}>
                    <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
                </li>
            );
        });
    }

    componentDidMount() {
        this.props.feachQuizes()
       
    }

    render() {
        console.log('render');
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>QuizList</h1>
                    {/* && this.props.quizes.length !== 0 */}
                    {this.props.loading  ? (
                        <Loader />
                    ) : (
                        <ul>{this.renderQuizes()}</ul>
                    )}
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return{
        quizes : state.quiz.quizes,
        loading : state.quiz.loading
    }
}

function mapDispathToProps(dispatch){
    return{
        feachQuizes: () => dispatch(fetchQuizes())
    }     

}

export default connect(mapStateToProps, mapDispathToProps)(QuizList);
