import React from 'react';
import Input from '../Input';
import InputWrapper from '../InputWrapper';
import QuestionWrapper from './QuestionWrapper';
import True from '../../img/true.svg';
import False from '../../img/false.svg';
import _ERROR_MESSAGE from '../../data/ErrorMessage';
import './style.scss';

const TrueFalse = (props) => {

    const qName = `question-${props.id}`;
    const aName = `answer-${props.id}`;
    const watch = props.watch(aName);

    const selectChoice = (choice) => props.setValue(aName, choice, { shouldValidate: true, shouldDirty: true })

    return (
        <QuestionWrapper id={props.id} number={props.number} type={props.type} changeTypeCallback={props.changeTypeCallback} errors={props.errors} errorNames={[qName, aName]}>
            <div className="question-types true-false">
                <InputWrapper label="Question" htmlFor={qName} errors={props.errors}>
                    <Input text attr={{ name: qName, className: '' }} register={props.register({ required: { value: true, message: "Question is required" } })} errors={props.errors[qName]} />
                </InputWrapper>
                <InputWrapper htmlFor={qName} errors={props.errors}>
                    <div className="true-false-container">
                        Is this
                        <div className={props.errors && props.errors[aName] && props.errors[aName].type === 'required' ? 'has-error' : ''}>
                            <button type="button" className={`true bold ${props.getValues(aName) === "TRUE" ? 'active' : ''}`} onClick={() => selectChoice("TRUE")}><img src={True} alt="True" /> true</button>
                            or
                            <button type="button" className={`false bold ${props.getValues(aName) === "FALSE" ? 'active' : ''}`} onClick={() => selectChoice("FALSE")}><img src={False} alt="False" /> false</button>?
                        </div>
                    </div>
                    <input type="radio" name={aName} value="TRUE" ref={props.register({ required: { value: true, message: _ERROR_MESSAGE.TRUE_FALSE.REQUIRED } })} hidden readOnly />
                    <input type="radio" name={aName} value="FALSE" ref={props.register({ required: { value: true, message: _ERROR_MESSAGE.TRUE_FALSE.REQUIRED } })} hidden readOnly />
                </InputWrapper>
            </div>
        </QuestionWrapper>
    )
}

export default TrueFalse
