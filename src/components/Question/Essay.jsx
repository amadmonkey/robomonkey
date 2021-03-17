import React from 'react';
import QuestionWrapper from './QuestionWrapper';
import InputWrapper from '../InputWrapper';
import Input from '../Input';
import _ERROR_MESSAGE from '../../data/ErrorMessage';
import './style.scss';
import TextEditor from '../TextEditor';

const Essay = (props) => {
    let p = props;
    const qName = `question-${p.id}`;
    const aName = `answer-${p.id}`;
    return (
        <QuestionWrapper number={p.number} type={p.type} changeTypeCallback={p.changeTypeCallback}>
            <div className="question-types essay">
                <InputWrapper label="Question" htmlFor={qName} errors={p.errors}>
                    <Input text attr={{ name: qName, className: '', autoFocus: p.focus }} register={p.register({ required: { value: true, message: _ERROR_MESSAGE.GENERAL.QUESTION } })} errors={p.errors[qName]} />
                </InputWrapper>
                <InputWrapper label="Answer" htmlFor={aName} errors={p.errors}>
                    <input hidden />
                    <TextEditor />
                </InputWrapper>
            </div>
        </QuestionWrapper>
    )
}

export default Essay
