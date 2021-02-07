import React, { useState } from 'react';
import Plus from '../../img/plus.svg';
import Times from '../../img/times.svg';
import Select from '../../components/Select';
import _QUESTION from '../../data/Question';
import './style.scss';

const QuestionWrapper = (props) => {

    const p = props;
    const e = p.errors;
    const [selectedType, setSelectedType] = useState(p.type ? p.type : null);
    const hasError = e && Object.keys(e).filter(name => p.errorNames.includes(name));

    return (
        <div ref={p.questionRef} className={`question-container ${hasError && hasError.length ? 'error' : ''}`} onClick={p.onClick} onMouseDown={p.onMouseDown}>
            <span className="number">{p.number ? <><span>#</span>{p.number}</> : <img src={Plus} style={{ top: "3px", position: "relative" }} />}</span>
            <div className={`question-content ${!p.children ? 'hold' : ''}`}>
                <header>
                    <div>
                        <span>Type:</span> <Select choices={_QUESTION.CONSTANTS} selectedOption={selectedType} selectOptionCallback={(option) => p.changeTypeCallback(option, p.number)} disabled />
                    </div>
                    <div>
                        <span>Points:</span> <input className="question-points select-container" placeholder="1" type="text" />
                    </div>
                </header>
                <div>
                    {p.children}
                </div>
                {
                    hasError &&
                    (
                        <footer>
                            <div className="errors">
                                {hasError.slice(0, 3).map((text, i) => {
                                    try {
                                        return <span key={i}>{e[text].message}</span>
                                    } catch (e) {
                                        console.log(e);
                                    }
                                })}
                            </div>
                            {/* {p.errors[`choiceNew-${p.id}`] && <span>{p.errors[`choiceNew-${p.id}`].message}</span>} */}
                        </footer>
                    )
                }
            </div>
        </div>
    )
}

export default QuestionWrapper
