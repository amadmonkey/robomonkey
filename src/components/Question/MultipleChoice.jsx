import React, { useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import Input from '../Input';
import InputWrapper from '../InputWrapper';
import QuestionWrapper from './QuestionWrapper';
import _ERROR_MESSAGE from '../../data/ErrorMessage';
import './style.scss';

const MultipleChoice = (props) => {
    let p = props;
    const qName = `question-${p.id}`;
    const aName = `answer-${p.id}`;
    const cName = `multiple-choice-${p.id}`;
    const nName = `choice-new-${p.id}`;
    const watch = p.watch(aName);
    const { fields, append, remove } = useFieldArray({ name: cName, control: p.control });
    let hasError = p.errors && p.errors[aName] && p.errors[aName].type === "required";

    useEffect(() => {
        p.setValue(nName, '')
    }, [fields])

    return (
        <QuestionWrapper id={p.id} number={p.number} type={p.type} changeTypeCallback={p.changeTypeCallback} errors={p.errors} errorNames={[qName, aName, cName, nName]}>
            <div className="question-types multiple-choice">
                <InputWrapper label="Question" htmlFor={qName} errors={p.errors}>
                    <Input text attr={{ name: qName, className: '', autoFocus: p.focus }} register={p.register({ required: { value: true, message: _ERROR_MESSAGE.GENERAL.QUESTION } })} errors={p.errors[qName]} />
                </InputWrapper>
                <InputWrapper label={<>Options <span className="subtitle">(Click on an option's letter to specify the correct answer)</span></>} htmlFor={qName} errors={p.errors}>
                    <div className={`options-wrapper ${hasError ? 'has-error' : ''}`}>
                        {fields.map((field, i) => {
                            let myVal = String.fromCharCode(97 + i);
                            return (
                                <div className="choice-container" key={field.id}>
                                    <input type="radio" name={aName} value={myVal} ref={p.register({ required: { value: fields.length > 1, message: _ERROR_MESSAGE.MULTIPLE_CHOICE.REQUIRED_ANSWER } })} hidden tabIndex="-1" />
                                    <button className={`letter ${p.getValues(aName) === myVal ? 'active' : ''} ${hasError ? 'blink' : ''}`} onClick={() => p.setValue(aName, myVal, { shouldValidate: true, shouldDirty: true })} type="button" ><span>{myVal}</span></button>
                                    <Input text attr={{ defaultValue: field.text, name: `${cName}[${i}].text`, autoFocus: i === (fields.length - 1) ? true : false }} register={p.register()} onChange={(e) => !e.target.value && remove(i)} />
                                </div>
                            )
                        })}
                    </div>
                    {/* add a blank one on the bottom for adding */}
                    <div className="choice-container">
                        <button className="letter add" type="button" tabIndex="-1"><span>{String.fromCharCode(97 + fields.length)}</span></button>
                        <div className={`text ${p.errors ? 'danger' : ''}`}>
                            <input type="text" name={nName} placeholder="Type to add new option" ref={p.register({ required: { value: fields.length < 2, message: _ERROR_MESSAGE.MULTIPLE_CHOICE.REQUIRED_CHOICES } })} onChange={(e) => append({ text: e.target.value })} />
                        </div>
                    </div>
                </InputWrapper>
            </div>
        </QuestionWrapper>
    )
}

export default MultipleChoice
