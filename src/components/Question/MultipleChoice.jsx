import React, { useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import Input from '../Input';
import InputWrapper from '../InputWrapper';
import QuestionWrapper from './QuestionWrapper';
import Arrow from '../../img/arrow.svg';
import './style.scss';

const MultipleChoice = (props) => {

    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [myError, setMyError] = useState("");
    const { fields, append, remove } = useFieldArray({ name: `multipleChoice-${props.id}`, control: props.control });
    let hastError = props.errors && props.errors[`answer-${props.id}`] && props.errors[`answer-${props.id}`].type === "required";

    return (
        <QuestionWrapper id={props.id} number={props.number} type={props.type} changeTypeCallback={props.changeTypeCallback} errors={props.errors}>
            <div className="question-types multiple-choice">
                <InputWrapper label="Question" htmlFor={`question-${props.id}`} errors={props.errors}>
                    <Input text attr={{ name: `question-${props.id}`, className: '', autoFocus: props.focus }} register={props.register({ required: { value: true, message: "Please state your question" } })} errors={props.errors[`question-${props.id}`]} />
                </InputWrapper>
                <InputWrapper label={<>Options <span className="subtitle">(Click on an option's letter to specify the correct answer)</span></>} htmlFor={`question-${props.id}`} errors={props.errors}>
                    <div className={`options-wrapper ${hastError ? 'has-error' : ''}`}>
                        {
                            fields.map((field, i) => {
                                let myVal = String.fromCharCode(97 + i);
                                return (
                                    <div className="choice-container" key={field.id}>
                                        {myError && <img style={{ animation: "2s linear point-right infinite" }} src={Arrow} />}
                                        <input type="radio" name={`answer-${props.id}`} value={myVal} ref={props.register({ required: { value: true, message: "Please choose an answer from the list of choices" } })} hidden tabIndex="-1" />
                                        <button className={`letter ${props.getValues(`answer-${props.id}`) === myVal ? 'active' : ''} ${hastError ? 'blink' : ''}`} type="button" onClick={() => props.setValue(`answer-${props.id}`, myVal, { shouldValidate: true, shouldDirty: true })}><span>{myVal}</span></button>
                                        <Input text attr={{ defaultValue: field.text, name: `multipleChoice-${props.id}[${i}].text`, autoFocus: i === (fields.length - 1) ? true : false }} register={props.register()} onChange={(e) => !e.target.value && remove(i)} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    {/* add a blank one on the bottom for adding */}
                    <div className="choice-container">
                        <button className="letter add" type="button"><span>{String.fromCharCode(97 + fields.length)}</span></button>
                        <div className={`text ${props.errors ? 'danger' : ''}`}>
                            <input type="text" name={`choiceNew-${props.id}`} placeholder="Type to add new option" value={""} ref={props.register({ required: { value: fields.length > 1 ? false : true, message: "Please add choices" } })} onChange={(e) => append({ text: e.target.value })} />
                            {(props.errors && props.errors[`choiceNew-${props.id}`] && props.errors[`choiceNew-${props.id}`].type === "hasChoice") && <span className="error-message">This is required</span>}
                        </div>
                    </div>
                </InputWrapper>
            </div>
        </QuestionWrapper>
    )
}

export default MultipleChoice
