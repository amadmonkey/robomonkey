import React from 'react';
import QuestionWrapper from './QuestionWrapper';
import './style.scss';

const Matching = (props) => {
    return (
        <QuestionWrapper number={props.number} type={props.type} changeTypeCallback={props.changeTypeCallback}>
            <div className="question-types matching">
                Matching
            </div>
        </QuestionWrapper>
    )
}

export default Matching
