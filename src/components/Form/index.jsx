import React, { useState, useRef, useEffect } from 'react';
import './style.scss';

const Form = (p) => {

    const [float, setFloat] = useState(null);
    const formRef = useRef();
    const submitBtnRef = useRef();

    const checkSticky = (e) => {
        if (submitBtnRef.current) {
            let submitCurrent = submitBtnRef.current;
            let submitRect = submitCurrent.getBoundingClientRect();
            if (window.innerHeight < submitRect.y + (submitRect.height - 100)) {
                setFloat('float');
                submitCurrent.style.top = `${40 + window.pageYOffset}px`;
            } else {
                setFloat('');
                submitCurrent.style.top = 'unset';
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', checkSticky);
        return () => window.removeEventListener('scroll', checkSticky);
    }, [])

    return (
        <form ref={formRef} onSubmit={p.onSubmit}>
            {p.children}
            <div ref={submitBtnRef} className={`form-button-group ${float}`}>
                {p.additionalButtons}
                <button type="submit" className="submit">Next</button>
            </div>
        </form>
    )
}

export default Form
