import React from 'react';
import Time from '../../img/time.svg';
import './style.scss';

const OngoingExamItem = () => {

    let progressValue = '80';

    return (
        <li className="ongoing-exam-item">
            <p className="who"><span className="name bold">Kamote</span> is taking <span className="exam-name bold">Lorem Ipsum</span></p>
            <p className="what">Question <span className="current-question bold">69</span> of <span className="total-questions bold">420</span></p>
            <p className="when">Started <span className="started">45 mins ago</span></p>
            <div className="progress-bar">
                <img src={Time} alt="time icon" />
                <div className="meter-container">
                    <div className="meter-value" style={{ width: `${100 - progressValue}%` }}></div>
                </div>
            </div>
        </li>
    )
}

export default OngoingExamItem
