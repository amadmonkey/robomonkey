import React from 'react';
import QuestionWrapper from './QuestionWrapper';
import './style.scss';

const Essay = (props) => {
    return (
        <QuestionWrapper number={props.number} type={props.type} changeTypeCallback={props.changeTypeCallback}>
            <div className="question-types essay">
                Essay
            </div>
        </QuestionWrapper>
    )
}

export default Essay
