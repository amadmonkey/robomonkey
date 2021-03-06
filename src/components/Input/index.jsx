import React from 'react';
import './style.scss';

const Input = (props) => {
    return (
        <div>
            {
                props.text &&
                <div className={`text ${props.errors ? 'danger' : ''}`}>
                    <input type="text" {...props.attr} ref={props.register} onChange={props.onChange} />
                </div>
            }
            {
                props.textArea &&
                <div className={`textarea ${props.errors ? 'danger' : ''}`}>
                    <textarea rows="5" {...props.attr} ref={props.register} onChange={props.onChange} ></textarea>
                </div>
            }
            {props.errors && <span className="error-message">{props.errors.message}</span>}
        </div>
    )
}


export default Input
