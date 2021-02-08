import React, { useState, useEffect, useRef } from 'react';
import { useFieldArray } from 'react-hook-form';
import Input from '../Input';
import InputWrapper from '../InputWrapper';
import QuestionWrapper from './QuestionWrapper';
import _ERROR_MESSAGE from '../../data/ErrorMessage';
import _COLORS from '../../data/Colors';
import './style.scss';
import MatchInput from '../MatchInput';

import _STYLE_VARS from '../../variables.scss';

class Column {
    constructor(title, name, inputName, watchTitle) {
        this.title = title;
        this.name = name;
        this.inputName = inputName;
        this.watchTitle = watchTitle;
    }
}

const Matching = (props) => {

    const p = props;
    const qName = `question-${p.id}`;
    const aName = `answer-${p.id}`;
    const c1 = new Column(`column-1-title-${p.id}`, `column-1-name-${p.id}`, `new-column-1-${p.id}`, p.watch(`column-1-title-${p.id}`, "Column A"));
    const c2 = new Column(`column-2-title-${p.id}`, `column-2-name-${p.id}`, `new-column-2-${p.id}`, p.watch(`column-2-title-${p.id}`, "Column B"));
    const { fields: c1Fields, append: c1Append, remove: c1Remove } = useFieldArray({ name: c1.name, control: p.control });
    const { fields: c2Fields, append: c2Append, remove: c2Remove } = useFieldArray({ name: c2.name, control: p.control });
    const dotContainerRefs = { c1: useRef([]), c2: useRef([]) }
    const dotRefs = { c1: useRef([]), c2: useRef([]) }

    const [colors, setColors] = useState(_COLORS);
    const [dot, setDot] = useState(null);

    // render line
    const setLine = (dot, pageX, pageY, startX, startY, move) => {
        if (dot) {
            let allowance = 0;
            if (move) { pageY += window.pageYOffset; allowance = 17 }
            let calcX = pageX > startX ? (pageX - startX - (allowance)) : (startX - pageX + (allowance));
            let calcY = pageY > startY ? (pageY - startY - (allowance)) : (startY - pageY + (allowance));
            let totalLength = Math.sqrt(Math.pow(Math.abs(calcX) + 11, 2) + Math.pow(Math.abs(calcY) + 11, 2))
            let angle = Math.atan2(pageX - startX - allowance, - (pageY - (startY) - allowance)) * (180 / Math.PI);
            let ref = dotRefs[`c${dot.col}`].current[dot.index];
            if (ref) {
                ref.style.height = `${totalLength}px`;
                ref.style.transform = `rotate(${(angle + 180) % 360}deg)`;
            }
        }
    }

    // reset dot
    const resetTarget = (clickedDot) => {
        if (clickedDot) {
            let i = clickedDot.col === 1 ? c2Fields.findIndex(obj => obj.matched && obj.matched.id === clickedDot.id) : c1Fields.findIndex(obj => obj.matched && obj.matched.id === clickedDot.id);
            if (i > -1) {
                let clicked = getField(clickedDot);
                let matched = getField({ col: clickedDot.col === 1 ? 2 : 1, index: i })
                addColor(clickedDot.col === 1 ? c1Fields[clickedDot.index].matched.color : c2Fields[clickedDot.index].matched.color);
                delete clicked.matched;
                delete matched.matched;
                dotRefs[`c${clickedDot.col}`].current[clickedDot.index].style.height = dotRefs[`c${clickedDot.col === 1 ? 2 : 1}`].current[i].style.height = `${16}px`;
            }
            getField(clickedDot)
            !c1Fields.filter(obj => obj.matched).length && p.setValue(aName, null, { shouldValidate: true, shouldDirty: true });
        }
        dotRefs[`c${clickedDot.col}`].current[clickedDot.index].style.height = `${16}px`;
        setDot(null);
    }

    // on dot click
    const clickDot = (e, clickedDot) => {
        e.stopPropagation();
        if (clickedDot) { // clicked on a dot
            if (dot) { // has active dot
                if (dot.col !== clickedDot.col) { // is opposing dot of the active dot
                    // set matched
                    let newColor = getColor(getField(dot).matched && getField(dot).matched.color);
                    getField(dot).matched = { id: clickedDot.id, color: newColor, source: true };
                    getField(clickedDot).matched = { id: dot.id, color: newColor, source: false };
                    setLine(dot, getField(clickedDot).rect.x, getField(clickedDot).rect.y, getField(dot).rect.x, getField(dot).rect.y, false);
                    // clear active dot
                    setDot(null);
                    p.setValue(aName, "matched", { shouldValidate: true, shouldDirty: true });
                }
            } else { // no active dot = set active dot / start line
                getField(clickedDot).matched && resetTarget(clickedDot);
                setDot(clickedDot);
            }
        } else { // did not click on a dot
            dot && resetTarget(dot);
        }
    }

    const addColor = (color) => setColors({ ...colors, ...color });
    const getColor = () => {
        let colorsCopy = { ...colors };
        let keys = Object.keys(colors);
        let key = keys[keys.length * Math.random() << 0];
        let newColor = { [key]: colorsCopy[key] }
        delete colorsCopy[key];
        setColors(colorsCopy);
        return newColor;
    }

    const getField = (dot) => dot ? (dot.col === 1 ? c1Fields[dot.index] : c2Fields[dot.index]) : null;
    const mouseMove = (e) => dot && setLine(dot, e.clientX, e.clientY, getField(dot).rect.x, getField(dot).rect.y, true);

    const removeField = (index, field) => {
        field.col === 1 ? c1Remove(index) : c2Remove(index);
        resetTarget(field);
    }

    useEffect(() => {
        [c1Fields, c2Fields].map((fieldGroup, i) => {
            let col = i + 1;
            fieldGroup.map((obj, i) => {
                obj.index = i;
                let rect = dotContainerRefs[`c${col}`].current[i].getBoundingClientRect();
                obj.rect = { x: rect.x, y: rect.y + window.pageYOffset }
                if (obj.matched && obj.matched.source) {
                    let otherColIndex = col === 1 ? c2Fields.findIndex(field => field.matched && field.matched.id === obj.id) : c1Fields.findIndex(field => field.matched && field.matched.id === obj.id);
                    let newDestinationRect = dotContainerRefs[`c${col === 1 ? 2 : 1}`].current[otherColIndex].getBoundingClientRect();
                    setLine(obj, newDestinationRect.x, newDestinationRect.y + window.pageYOffset, obj.rect.x, obj.rect.y, false);
                }
            })
        })
        p.setValue(c1.inputName, '');
        p.setValue(c2.inputName, '');
    }, [c1Fields, c2Fields])

    useEffect(() => {
        window.onmousemove = mouseMove;
        return () => window.removeEventListener('onmousemove', mouseMove);
    }, [dot])

    useEffect(() => { p.register(aName, { required: { value: true, message: 'Please match at least 2 fields from each columns' } }) }, [p.register])

    return (
        <QuestionWrapper questionRef={p.questionRef} onClick={clickDot} move={mouseMove} id={p.id} number={p.number} type={p.type} changeTypeCallback={p.changeTypeCallback} errors={p.errors} errorNames={[qName, aName, c1.title, c2.title, c1.name, c2.name, c1.inputName, c2.inputName]}>
            <div className="question-types matching">
                <InputWrapper label="Instructions" htmlFor={qName} errors={p.errors}>
                    <Input text attr={{ name: qName, placeholder: _ERROR_MESSAGE.GENERAL.QUESTION }} register={p.register({ required: { value: true, message: _ERROR_MESSAGE.GENERAL.QUESTION } })} errors={p.errors[qName]} />
                </InputWrapper>
                <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                    <InputWrapper label="" htmlFor={c1.name} errors={p.errors}>
                        <div className="choice-container">
                            <Input text attr={{ name: c1.title, className: 'title right', placeholder: "Column A" }} register={p.register()} />
                        </div>
                        <div className="options-wrapper">
                            {c1Fields.map((field, i) => {
                                return (
                                    <MatchInput
                                        key={field.id}
                                        index={i}
                                        dotRef={el => dotRefs.c1.current[i] = el}
                                        dotContainerRef={el => dotContainerRefs.c1.current[i] = el}
                                        activeDot={dot}
                                        name={`${c1.name}[${i}].text`}
                                        field={field}
                                        fields={c1Fields}
                                        register={p.register()}
                                        onChange={(e) => !e.target.value && removeField(i, field)}
                                        onClick={clickDot}
                                    />
                                )
                            })}
                        </div>
                        {c1Fields.length < 10 && (
                            <div className="match-input-container">
                                <div className="choice-container">
                                    <div className={`text flex ${p.errors[c1.name] ? 'danger' : ''}`}>
                                        <input type="text" className="right" name={c1.inputName} ref={p.register({ required: { value: !c1Fields.length, message: _ERROR_MESSAGE.MATCHING.REQUIRED_CHOICES(c1.watchTitle ? c1.watchTitle : "Column A") } })} placeholder="Type to add new option" onChange={(e) => c1Append({ text: e.target.value, col: 1 })} />
                                        <div className="choice-container"><div className="match-point disabled" style={{ border: "none" }}></div></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </InputWrapper>
                    <div className={`matching-error ${p.errors && p.errors[aName] && p.errors[aName].type === 'required' && c1Fields.length && c2Fields.length ? 'has-error' : ''} ${c1Fields.length === 10 || c2Fields.length === 10 ? 'max' : ''}`}></div>
                    <InputWrapper label="" htmlFor={c2.name} errors={p.errors} style={{ marginTop: "0" }}>
                        <div className="options-wrapper">
                            <div className="choice-container" style={{ display: "flex", flexDirection: "row-reverse" }}>
                                <Input text attr={{ name: c2.title, className: 'title left', placeholder: "Column B" }} register={p.register} />
                            </div>
                            {c2Fields.map((field, i) => {
                                return (
                                    <MatchInput
                                        reverse
                                        key={field.id}
                                        index={i}
                                        dotRef={el => dotRefs.c2.current[i] = el}
                                        dotContainerRef={el => dotContainerRefs.c2.current[i] = el}
                                        activeDot={dot}
                                        name={`${c2.name}[${i}].text`}
                                        field={field}
                                        fields={c2Fields}
                                        register={p.register()}
                                        onChange={(e) => !e.target.value && removeField(i, field)}
                                        onClick={clickDot}
                                    />
                                )
                            })}
                        </div>
                        {c2Fields.length < 10 && (
                            <div className="match-input-container">
                                <div className="choice-container" style={{ flexDirection: "row-reverse" }}>
                                    <div style={{ display: "flex" }} className={`text ${p.errors[c2.name] ? 'danger' : ''}`}>
                                        <div className="choice-container disabled"><div className="match-point disabled" style={{ border: "none" }}></div></div>
                                        <input type="text" name={c2.inputName} ref={p.register({ required: { value: !c2Fields.length, message: _ERROR_MESSAGE.MATCHING.REQUIRED_CHOICES(c2.watchTitle ? c2.watchTitle : "Column B") } })} placeholder="Type to add new option" onChange={(e) => c2Append({ text: e.target.value, col: 2 })} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </InputWrapper>
                </div>
            </div>
        </QuestionWrapper >
    )
}

export default Matching
