import React from 'react';
import QuestionWrapper from './QuestionWrapper';
import './style.scss';

const Video = (props) => {
    return (
        <QuestionWrapper number={props.number} type={props.type} changeTypeCallback={props.changeTypeCallback}>
            <div className="question-types video">
                Video
            </div>
        </QuestionWrapper>
    )
}

export default Video
