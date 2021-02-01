import React from 'react';
import QuestionWrapper from './QuestionWrapper';
import './style.scss';

const TrueFalse = (props) => {
    return (
        <QuestionWrapper number={props.number} type={props.type} changeTypeCallback={props.changeTypeCallback}>
            <div className="question-types true-false">
                True or False
            </div>
        </QuestionWrapper>
    )
}

export default TrueFalse
