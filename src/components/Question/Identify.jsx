import React from 'react';
import Input from '../Input';
import InputWrapper from '../InputWrapper';
import QuestionWrapper from './QuestionWrapper';
import './style.scss';

const Identify = (props) => {
    return (
        <QuestionWrapper number={props.number} type={props.type} changeTypeCallback={props.changeTypeCallback}>
            <div className="question-types identify">
                <InputWrapper label="Question" htmlFor={`question-${props.number}`} errors={props.errors}>
                    <Input text attr={{ name: `question-${props.number}`, className: '', autoFocus: props.focus }} register={props.register({ required: { value: true, message: "Question is required" } })} errors={props.errors[`question-${props.number}`]} />
                </InputWrapper>
                <InputWrapper label="Answer" htmlFor={`answer-${props.number}`} errors={props.errors}>
                    <Input text attr={{ name: `answer-${props.number}`, className: '' }} register={props.register({ required: { value: true, message: "Answer is required" } })} errors={props.errors[`answer-${props.number}`]} />
                </InputWrapper>
            </div>
        </QuestionWrapper>
    )
}

export default Identify
