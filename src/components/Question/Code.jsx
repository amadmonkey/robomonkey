import React from 'react';
import QuestionWrapper from './QuestionWrapper';
import './style.scss';

const Code = (props) => {
    return (
        <QuestionWrapper number={props.number} type={props.type} changeTypeCallback={props.changeTypeCallback}>
            <div className="question-types code">
                Code
            </div>
        </QuestionWrapper>
    )
}

export default Code
