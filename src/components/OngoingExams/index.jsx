import React from 'react';
import Card from '../Card';
import OngoingExamItem from './OngoingExamItem';
import './style.scss';

const OngoingExams = () => {
    return (
        <Card className="ongoing-exam-container dark">
            <header>
                <h1>Live Updates</h1>
            </header>
            <ul>
                <OngoingExamItem />
                <OngoingExamItem />
                <OngoingExamItem />
            </ul>
        </Card>
    )
}

export default OngoingExams
