import React, { useState } from 'react';
import Plus from '../../img/plus.svg';
import Times from '../../img/times.svg';
import Select from '../../components/Select';
import _QUESTION from '../../data/Question';
import './style.scss';

const QuestionWrapper = (props) => {
    let hasError = props.errors && (props.errors[`question-${props.id}`] || props.errors[`answer-${props.id}`] || props.errors[`choiceNew-${props.id}`]) ? true : false;
    const [selectedType, setSelectedType] = useState(props.type ? props.type : null);

    const RenderNumber = () => {
        if (props.number) return <><span>#</span>{props.number}</>
        else return <img src={Plus} style={{ top: "3px", position: "relative" }} />
    }

    const selectOptionCallback = (option) => {
        props.changeTypeCallback(option, props.number);
    }

    return (
        <div className={`question-container ${hasError ? 'error' : ''}`}>
            <span className="number"><RenderNumber /></span>
            <div className={`question-content ${!props.children ? 'hold' : ''}`}>
                <header>
                    <div>
                        <span>Type:</span> <Select choices={_QUESTION.CONSTANTS} selectedOption={selectedType} selectOptionCallback={selectOptionCallback} disabled />
                    </div>
                    <div>
                        <span>Points:</span> <input className="question-points select-container" placeholder="1" type="text" />
                    </div>
                </header>
                <div>
                    {props.children}
                </div>
                {
                    hasError && (
                        <footer>
                            {props.errors[`question-${props.id}`] && props.errors[`question-${props.id}`].type === 'required' && <span>{props.errors[`question-${props.id}`].message}</span>}
                            {props.errors[`answer-${props.id}`] && props.errors[`answer-${props.id}`].type === 'required' && <span>{props.errors[`answer-${props.id}`].message}</span>}
                            {props.errors[`choiceNew-${props.id}`] && <span>{props.errors[`choiceNew-${props.id}`].message}</span>}
                        </footer>
                    )
                }
            </div>
        </div>
    )
}

export default QuestionWrapper
