import React from 'react';
import './style.scss';

const Radio = (props) => {
    return (
        <div className="radio-group-container">
            <div className={`radio-group ${props.vertical ? 'vertical' : 'horizontal'}`}>
                {
                    props.options.map((obj, i) => {
                        return (
                            <div className="radio-item" key={i}>
                                {obj.icon}
                                <input type="radio" {...props.attr} value={obj.value} ref={props.register} defaultChecked={obj.default} />
                                <h1>{obj.label}</h1>
                                <p>{obj.description}</p>
                            </div>
                        )
                    })
                }
                {props.children}
            </div>
            {props.errors && props.errors.type === "required" && <span className="error-message">This is required</span>}
            {props.errors && props.errors.type === "maxLength" && <span className="error-message">Length</span>}
        </div>
    )
}

export default Radio
