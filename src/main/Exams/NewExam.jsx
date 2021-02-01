import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { ReactComponent as WizardDetails } from '../../img/wizard-details.svg';
import { ReactComponent as WizardQuestions } from '../../img/wizard-questions.svg';
import { ReactComponent as WizardReview } from '../../img/wizard-review.svg';
import { ReactComponent as Line } from '../../img/line.svg';
import MainWrapper from '../../components/MainWrapper';
import Details from '../../main/Exams/Details';
import Questions from '../../main/Exams/Questions';
import Review from '../../main/Exams/Review';
import Finish from '../../main/Exams/Finish';
import './style.scss';

const NewExam = (props) => {

    const part = props.match.params.part;
    const history = useHistory();

    const getPart = () => {
        switch (props.match.params.part) {
            case "details":
                return <Details />
            case "questions":
                return <Questions />
            case "review":
                return <Review />
            case "finish":
                return <Finish />
            default:
                // return <Redirect to="/404" />
                break;
        }
    }

    useEffect(() => {
        // const part = props.match.params.part;
        !part && history.push('/exams/new-exam/details');
    }, [])

    return (
        <MainWrapper>
            <div style={{ padding: "20px", paddingTop: "50px" }}>
                <div className="wizard-guide">
                    <WizardDetails className={`wizard-guide-item details ${part === 'details' ? "active" : "done"}`} />
                    <Line className="wizard-guide-line" />
                    <WizardQuestions className={`wizard-guide-item questions ${part === 'questions' ? "active" : (part !== 'details' ? 'done' : '')}`} />
                    <Line className="wizard-guide-line" />
                    <WizardReview className={`wizard-guide-item review ${part === 'review' ? "active" : (part === 'finish' ? 'done' : '')}`} />
                </div>
                {getPart()}
            </div>
        </MainWrapper>
    )
}

export default NewExam
