import React from 'react';
import Input from '../Input';
import './style.scss';

const MatchInput = (props) => {
    let p = props;
    let color = p.field.matched ? Object.keys(p.field.matched.color)[0] : '';
    let type = p.field.matched && !p.field.matched.source ? 'disabled' : '';
    let callBack = (e) => p.onClick(e, { id: p.field.id, name: p.name, index: p.index, col: p.reverse ? 2 : 1 });
    let events = {
        onClick: callBack
    }
    return (
        <div className={`match-input-container flex ${color}`}>
            <div className="choice-container" style={{ flexDirection: p.reverse ? 'row-reverse' : 'row' }}>
                <Input
                    text
                    attr={{ className: `match-input ${p.reverse ? "left" : "right"}`, defaultValue: p.field.text, name: p.name, autoFocus: p.index === (p.fields.length - 1) ? true : false }}
                    register={p.register()}
                    onChange={p.onChange}
                />
                <div className="choice-container">
                    <div className={`match-point ${p.activeDot && p.activeDot.id === p.field.id ? 'active' : ''} ${type}`} {...events}>
                        <div ref={p.elem} className="dot"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MatchInput
