import React, { useState } from 'react';
import './style.scss';

const Select = (props) => {

    const [active, setActive] = useState(false);
    const [selected, setSelected] = useState(props.selectedOption ? props.selectedOption : { label: '', value: '' });

    const setSelectedOption = (option) => {
        !props.disabled && setSelected(option);
        props.selectOptionCallback(option);
    }

    return (
        <div className={`select-container ${active ? 'active' : ''}`} onClick={() => setActive(!active)}>
            <input type="text" value={selected.label} placeholder="Select One" readOnly />
            <ul className="options">
                {
                    Object.keys(props.choices).map((key, i) => {
                        return <li key={i} onClick={() => setSelectedOption(props.choices[key])}>{props.choices[key].label}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default Select
