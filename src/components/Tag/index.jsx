import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const Tag = (props) => {
    return (
        <Link to={props.data.link} style={{ display: "inline-block" }}>
            <div className="tag" style={{ backgroundColor: props.data.color }}>
                {props.data.name}
            </div>
        </Link>
    )
}

export default Tag
