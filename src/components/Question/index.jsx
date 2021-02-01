import React, { useState, Fragment } from 'react';
import Input from '../Input';
import InputWrapper from '../InputWrapper';
import Select from '../Select';
import Plus from '../../img/plus.svg';
import Times from '../../img/times.svg';
import _QUESTION from '../../data/Question';
import './style.scss';

const Question = (props) => {

    const [selectedType, setSelectedType] = useState(props.type ? props.type : null);

    const RenderNumber = () => {
        if (props.number) return <><span>#</span>{props.number}</>
        else return <img src={Plus} style={{ top: "3px", position: "relative" }} />
    }

    const selectOptionCallback = (option) => {
        props.add ? props.add(option) : setSelectedType(option);
    }

    const RenderQuestion = () => {
        if (selectedType)
            switch (selectedType.value) {
                case "IDENTIFY":
                    return (
                        <Fragment>
                            <InputWrapper label="Question" htmlFor={`question${props.number}`} errors={props.errors}>
                                <Input text attr={{ name: `question${props.number}`, className: '' }} register={props.register} errors={props.errors[`question${props.number}`]} />
                            </InputWrapper>
                            <InputWrapper label="Answer" htmlFor={`answer${props.number}`} errors={props.errors} style={{ marginTop: '20px' }}>
                                <Input text attr={{ name: `answer${props.number}`, className: '' }} register={props.register} errors={props.errors[`answer${props.number}`]} />
                            </InputWrapper>
                        </Fragment>
                    )
                case "MULTIPLE_CHOICE":
                    return (
                        <Fragment>
                            {/* <InputWrapper label="Question" htmlFor="question" error={props.errors}>
                                <Input text attr={{ name: 'question', className: '' }} />
                            </InputWrapper> */}
                            <ul className="multiple-container">
                                <li>{ }</li>
                            </ul>
                        </Fragment>
                    );
                case "TRUE_FALSE":
                    return (
                        <Fragment>
                        </Fragment>
                    );
                case "MATCHING":
                    return (
                        <Fragment>
                        </Fragment>
                    );
                case "ESSAY":
                    return (
                        <Fragment>
                        </Fragment>
                    );
                case "CODE":
                    return (
                        <Fragment>
                        </Fragment>
                    );
                case "VIDEO":
                    return (
                        <Fragment>
                        </Fragment>
                    );
                default:
                    return (
                        <Fragment>
                        </Fragment>
                    );
            }
        else return "";
    }

    return (
        <div className="question-container">
            <span className="number"><RenderNumber /></span>
            <div className={`question-content ${!selectedType ? 'hold' : ''}`}>
                <header>
                    <div>
                        <span>Type:</span> <Select choices={_QUESTION.CONSTANTS} selectedOption={selectedType} selectOptionCallback={selectOptionCallback} isStatic={props.add ? true : false} />
                    </div>
                    <div>
                        <span>Points:</span> <input className="question-points select-container" placeholder="1" type="text" />
                    </div>
                </header>
                <div className="question-types">
                    <RenderQuestion />
                </div>
            </div>
        </div>
    )
}

export default Question
