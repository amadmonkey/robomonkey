import React from 'react';
import Input from '../Input';
import InputWrapper from '../InputWrapper';
import QuestionWrapper from './QuestionWrapper';
import _ERROR_MESSAGE from '../../data/ErrorMessage';
import './style.scss';

const Identify = (props) => {
    const qName = `question-${props.id}`;
    const aName = `answer-${props.id}`;
    return (
        <QuestionWrapper id={props.id} number={props.number} type={props.type} changeTypeCallback={props.changeTypeCallback} errors={props.errors} errorNames={[qName, aName]}>
            <div className="question-types identify">
                <InputWrapper label="Question" htmlFor={qName} errors={props.errors}>
                    <Input text attr={{ name: qName, className: '', autoFocus: props.focus }} register={props.register({ required: { value: true, message: _ERROR_MESSAGE.GENERAL.QUESTION } })} errors={props.errors[qName]} />
                </InputWrapper>
                <InputWrapper label="Answer" htmlFor={aName} errors={props.errors}>
                    <Input text attr={{ name: aName, className: '' }} register={props.register({ required: { value: true, message: _ERROR_MESSAGE.GENERAL.ANSWER } })} errors={props.errors[aName]} />
                </InputWrapper>
            </div>
        </QuestionWrapper>
    )
}

export default Identify
