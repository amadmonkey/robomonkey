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
    const dotRefs = { c1: useRef([]), c2: useRef([]) }
    const { fields: c1Fields, append: c1Append, remove: c1Remove } = useFieldArray({ name: name.c1, control: p.control });
    const { fields: c2Fields, append: c2Append, remove: c2Remove } = useFieldArray({ name: name.c2, control: p.control });

    let hasError = false;

    const questionRef = useRef();
    const [colors, setColors] = useState(_COLORS);
    const [dot, setDot] = useState(null);
    const [coords, setCoords] = useState({ length: null, angle: null });

    // dot to update, destinationX, destinationY, sourceX, sourceY
    const setLine = (dot, pageX, pageY, startX, startY, move) => {
        if (dot) {
            pageY = move ? pageY + window.pageYOffset : pageY;
            let ref = dotRefs[`c${dot.col}`].current[dot.index];
            let calcX = pageX > startX ? (pageX - startX - (8)) : (startX - pageX + (8));
            let calcY = pageY > startY ? (pageY - startY - (8)) : (startY - pageY + (8));
            let totalLength = Math.sqrt(Math.pow(Math.abs(calcX) + 12, 2) + Math.pow(Math.abs(calcY) + 12, 2))
            let angle = Math.atan2(pageX - startX - 8, - (pageY - (startY) - 8)) * (180 / Math.PI);
            ref.style.height = `${totalLength}px`;
            ref.style.transform = `rotate(${(angle + 180) % 360}deg)`;
        }
    }

    const resetTarget = (clickedDot) => {
        let ref = dotRefs[`c${clickedDot.col}`].current[clickedDot.index];
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
            }
            getField(clickedDot)
            !c1Fields.filter(obj => obj.matched).length && p.setValue(aName, null, { shouldValidate: true, shouldDirty: true });
        }
        ref.style.height = `${16}px`;
        setDot(null);
    }

    const clickMatch = (e, clickedDot) => {
        e.stopPropagation();
        if (clickedDot) { // clicked on a dot
            // let rect = e.currentTarget.getBoundingClientRect();
            let rect = dotRefs[`c${clickedDot.col}`].current[clickedDot.index].getBoundingClientRect();
            getField(clickedDot).rect = !getField(clickedDot).rect ? { x: rect.x, y: rect.y + window.pageYOffset } : getField(clickedDot).rect
            if (dot) { // has active dot
                if (dot.col !== clickedDot.col) { // is opposing dot of the active dot

                    // set matched
                    let newColor = getColor(getField(dot).matched && getField(dot).matched.color);
                    getField(dot).matched = { id: clickedDot.id, color: newColor, source: true };
                    getField(clickedDot).matched = { id: dot.id, color: newColor, source: false };
                    setLine(dot, getField(clickedDot).rect.x + 8, getField(clickedDot).rect.y + 8, getField(dot).rect.x, getField(dot).rect.y, false);

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

    const getField = (dot) => {
        return dot ? (dot.col === 1 ? c1Fields[dot.index] : c2Fields[dot.index]) : null;
    };

    const mouseMove = (e) => dot && setLine(dot, e.clientX, e.clientY, getField(dot).rect.x, getField(dot).rect.y, true);

    useEffect(() => {
        questionRef.current.onmousemove = mouseMove;
        return () => questionRef.current.removeEventListener('onmousemove', mouseMove);
    }, [dot])

    useEffect(() => {
        dotRefs.c1.current = dotRefs.c1.current.slice(0, c1Fields.length);
        dotRefs.c2.current = dotRefs.c2.current.slice(0, c2Fields.length);
    }, [dotRefs])

    useEffect(() => { p.setValue(inputName.c1, '') }, [c1Fields])
    useEffect(() => { p.setValue(inputName.c2, '') }, [c2Fields])
    useEffect(() => { p.register(aName, { required: { value: true, message: 'Please match at least 2 fields from each columns' } }) }, [p.register])

    return (
        <QuestionWrapper questionRef={questionRef} onClick={clickMatch} move={mouseMove} id={p.id} number={p.number} type={p.type} changeTypeCallback={p.changeTypeCallback} errors={p.errors} errorNames={[qName, aName, title.c1, title.c2, name.c1, name.c2, inputName.c1, inputName.c2]}>
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
                                        elem={el => dotRefs.c1.current[i] = el}
                                        activeDot={dot}
                                        name={`${name.c1}[${i}].text`}
                                        field={field}
                                        fields={c1Fields}
                                        register={p.register()}
                                        onChange={(e) => !e.target.value && c1Remove(i)}
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
                                        <input type="text" className="right" name={inputName.c1} ref={p.register({ required: { value: !c1Fields.length, message: _ERROR_MESSAGE.MATCHING.REQUIRED_CHOICES(watchTitle.c1 ? watchTitle.c1 : "Column A") } })} placeholder="Type to add new option" onChange={(e) => c1Append({ text: e.target.value })} />
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
                                        elem={el => dotRefs.c2.current[i] = el}
                                        activeDot={dot}
                                        name={`${name.c2}[${i}].text`}
                                        field={field}
                                        fields={c2Fields}
                                        register={p.register()}
                                        onChange={(e) => !e.target.value && c2Remove(i)}
                                        onClick={clickMatch}
                                        coords={coords}
                                    />
                                )
                            })}
                        </div>
                        {c2Fields.length < 10 && (
                            <div className="match-input-container">
                                <div className="choice-container" style={{ flexDirection: "row-reverse" }}>
                                    <div style={{ display: "flex" }} className={`text ${p.errors[name.c2] ? 'danger' : ''}`}>
                                        <div className="choice-container disabled"><div className="match-point disabled" style={{ border: "none" }}></div></div>
                                        <input type="text" name={inputName.c2} ref={p.register({ required: { value: !c2Fields.length, message: _ERROR_MESSAGE.MATCHING.REQUIRED_CHOICES(watchTitle.c2 ? watchTitle.c2 : "Column B") } })} placeholder="Type to add new option" onChange={(e) => c2Append({ text: e.target.value })} />
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
