import React, { useState, useEffect, useRef } from 'react';
import { get, useFieldArray } from 'react-hook-form';
import Input from '../Input';
import InputWrapper from '../InputWrapper';
import QuestionWrapper from './QuestionWrapper';
import _ERROR_MESSAGE from '../../data/ErrorMessage';
import _COLORS from '../../data/Colors';
import './style.scss';
import MatchInput from '../MatchInput';

import _STYLE_VARS from '../../variables.scss';

const Matching = (props) => {

    const p = props;
    const qName = `question-${p.id}`;
    const aName = `answer-${p.id}`;
    const title = { c1: `column-1-title-${p.id}`, c2: `column-2-title-${p.id}` }
    const name = { c1: `column-1-${p.id}`, c2: `column-2-${p.id}` }
    const inputName = { c1: `new-column-1-${p.id}`, c2: `new-column-2-${p.id}` }
    const watchTitle = { c1: p.watch(title.c1, "Column A"), c2: p.watch(title.c2, "Column B") }
    const dotParentRefs = { c1: useRef([]), c2: useRef([]) }
    const dotRefs = { c1: useRef([]), c2: useRef([]) }
    const { fields: c1Fields, append: c1Append, remove: c1Remove } = useFieldArray({ name: name.c1, control: p.control });
    const { fields: c2Fields, append: c2Append, remove: c2Remove } = useFieldArray({ name: name.c2, control: p.control });

    let hasError = false;

    const [colors, setColors] = useState(_COLORS);
    const [dot, setDot] = useState(null);

    // dot to update, destinationX, destinationY, sourceX, sourceY
    const setLine = (dot, pageX, pageY, startX, startY, move) => {
        if (dot) {
            let allowance = 0;
            if (move) {
                pageY += window.pageYOffset
                allowance = 17;
            }
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

    const resetTarget = (clickedDot) => {
        if (clickedDot) {
            let i = clickedDot.col === 1 ? c2Fields.findIndex(obj => obj.matched && obj.matched.id === clickedDot.id) : c1Fields.findIndex(obj => obj.matched && obj.matched.id === clickedDot.id);
            if (i > -1) {
                switch (clickedDot.col) {
                    case 1:
                        addColor(c2Fields[i].matched.color);
                        delete c2Fields[i].matched;
                        delete c1Fields[clickedDot.index].matched;
                        break;
                    case 2:
                        addColor(c1Fields[i].matched.color);
                        delete c1Fields[i].matched;
                        delete c2Fields[clickedDot.index].matched;
                        break;
                    default:
                        break;
                }
                let clickedRef = dotRefs[`c${clickedDot.col}`].current[clickedDot.index];
                let matchedRef = dotRefs[`c${clickedDot.col === 1 ? 2 : 1}`].current[i];
                clickedRef.style.height = matchedRef.style.height = `${16}px`;
            }
            getField(clickedDot)
            !c1Fields.filter(obj => obj.matched).length && p.setValue(aName, null, { shouldValidate: true, shouldDirty: true });
        }
        dotRefs[`c${clickedDot.col}`].current[clickedDot.index].style.height = `${16}px`;
        setDot(null);
    }

    const clickMatch = (e, clickedDot) => {
        e.stopPropagation();
        if (clickedDot) { // clicked on a dot
            if (dot) { // has active dot
                if (dot.col !== clickedDot.col) { // is opposing dot of the active dot
                    // set matched
                    let newColor = getColor(getField(dot).matched && getField(dot).matched.color);
                    getField(dot).matched = { id: clickedDot.id, color: newColor, source: true };
                    getField(clickedDot).matched = { id: dot.id, color: newColor, source: false };
                    setLine(dot, getField(clickedDot).rect.x, getField(clickedDot).rect.y, getField(dot).rect.x, getField(dot).rect.y, false);
                    // clear
                    setDot(null);
                    p.setValue(aName, "matched", { shouldValidate: true, shouldDirty: true });
                }
            } else { // no active dot = start line
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
        window.onmousemove = mouseMove;
        return () => window.removeEventListener('onmousemove', mouseMove);
    }, [dot])


    useEffect(() => {
        [c1Fields, c2Fields].map((fields, i) => {
            let col = i + 1;
            fields.map((obj, i) => {
                obj.index = i;
                let rect = dotParentRefs[`c${col}`].current[i].getBoundingClientRect();
                obj.rect = { x: rect.x, y: rect.y }
                if (obj.matched && obj.matched.source) {
                    let otherColIndex = col === 1 ? c2Fields.findIndex(field => field.matched && field.matched.id === obj.id) : c1Fields.findIndex(field => field.matched && field.matched.id === obj.id);
                    let newDestinationRect = dotParentRefs[`c${col === 1 ? 2 : 1}`].current[otherColIndex].getBoundingClientRect();
                    setLine(obj, newDestinationRect.x, newDestinationRect.y, obj.rect.x, obj.rect.y, false);
                }
            })
        })
        p.setValue(inputName.c1, '');
        p.setValue(inputName.c2, '');
    }, [c1Fields, c2Fields])

    useEffect(() => { p.register(aName, { required: { value: true, message: 'Please match at least 2 fields from each columns' } }) }, [p.register])

    return (
        <QuestionWrapper questionRef={p.questionRef} onClick={clickMatch} move={mouseMove} id={p.id} number={p.number} type={p.type} changeTypeCallback={p.changeTypeCallback} errors={p.errors} errorNames={[qName, aName, title.c1, title.c2, name.c1, name.c2, inputName.c1, inputName.c2]}>
            <div className="question-types matching">
                <InputWrapper label="Instructions" htmlFor={qName} errors={p.errors}>
                    <Input text attr={{ name: qName, placeholder: _ERROR_MESSAGE.GENERAL.QUESTION }} register={p.register({ required: { value: true, message: _ERROR_MESSAGE.GENERAL.QUESTION } })} errors={p.errors[qName]} />
                </InputWrapper>
                <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                    <InputWrapper label="" htmlFor={name.c1} errors={p.errors}>
                        <div className="choice-container">
                            <Input text attr={{ name: title.c1, className: 'title right', placeholder: "Column A" }} register={p.register()} />
                        </div>
                        <div className={`options-wrapper ${hasError ? 'has-error' : ''}`}>
                            {c1Fields.map((field, i) => {
                                return (
                                    <MatchInput
                                        key={field.id}
                                        index={i}
                                        dotRef={el => dotRefs.c1.current[i] = el}
                                        dotParentRef={el => dotParentRefs.c1.current[i] = el}
                                        activeDot={dot}
                                        name={`${name.c1}[${i}].text`}
                                        field={field}
                                        fields={c1Fields}
                                        register={p.register()}
                                        onChange={(e) => !e.target.value && removeField(i, field)}
                                        onClick={clickMatch}
                                    />
                                )
                            })}
                        </div>
                        {/* add a blank one on the bottom for adding */}
                        {c1Fields.length < 10 && (
                            <div className="match-input-container">
                                <div className="choice-container">
                                    <div className={`text flex ${p.errors[name.c1] ? 'danger' : ''}`}>
                                        <input type="text" className="right" name={inputName.c1} ref={p.register({ required: { value: !c1Fields.length, message: _ERROR_MESSAGE.MATCHING.REQUIRED_CHOICES(watchTitle.c1 ? watchTitle.c1 : "Column A") } })} placeholder="Type to add new option" onChange={(e) => c1Append({ text: e.target.value, col: 1 })} />
                                        <div className="choice-container"><div className="match-point disabled" style={{ border: "none" }}></div></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </InputWrapper>
                    <div style={{ width: "100px" }}></div>
                    <InputWrapper label="" htmlFor={name.c2} errors={p.errors} style={{ marginTop: "0" }}>
                        <div className={`options-wrapper ${hasError ? 'has-error' : ''}`}>
                            <div className="choice-container" style={{ display: "flex", flexDirection: "row-reverse" }}>
                                <Input text attr={{ name: title.c2, className: 'title left', placeholder: "Column B" }} register={p.register} />
                            </div>
                            {c2Fields.map((field, i) => {
                                return (
                                    <MatchInput
                                        reverse
                                        key={field.id}
                                        index={i}
                                        dotRef={el => dotRefs.c2.current[i] = el}
                                        dotParentRef={el => dotParentRefs.c2.current[i] = el}
                                        activeDot={dot}
                                        name={`${name.c2}[${i}].text`}
                                        field={field}
                                        fields={c2Fields}
                                        register={p.register()}
                                        onChange={(e) => !e.target.value && removeField(i, field)}
                                        onClick={clickMatch}
                                    />
                                )
                            })}
                        </div>
                        {c2Fields.length < 10 && (
                            <div className="match-input-container">
                                <div className="choice-container" style={{ flexDirection: "row-reverse" }}>
                                    <div style={{ display: "flex" }} className={`text ${p.errors[name.c2] ? 'danger' : ''}`}>
                                        <div className="choice-container disabled"><div className="match-point disabled" style={{ border: "none" }}></div></div>
                                        <input type="text" name={inputName.c2} ref={p.register({ required: { value: !c2Fields.length, message: _ERROR_MESSAGE.MATCHING.REQUIRED_CHOICES(watchTitle.c2 ? watchTitle.c2 : "Column B") } })} placeholder="Type to add new option" onChange={(e) => c2Append({ text: e.target.value, col: 2 })} />
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
