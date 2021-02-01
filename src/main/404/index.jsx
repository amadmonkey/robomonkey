import React from 'react';
import ConfusedMonkey from '../../img/monkey-404.svg';

const NotFound = () => {
    return (
        <div className="404-container">
            <div>
            <img src={ConfusedMonkey} />
            </div>
        </div>
    )
}

export default NotFound
