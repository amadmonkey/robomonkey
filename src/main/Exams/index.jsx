import React from 'react';
import MainWrapper from '../../components/MainWrapper';
import Card from '../../components/Card';
import ExamsTable from '../../components/ExamsTable';
import Exam from '../../img/exam.svg';
import Plus from '../../img/plus.svg';
import './style.scss';

const Exams = () => {
    return (
        <MainWrapper>
            <div style={{ padding: "20px", paddingTop: "80px" }}>
                <ExamsTable link={{ label: <button><img src={Exam} style={{ height: "100%" }} /><img className="plus" src={Plus} /></button>, to: "/exams/new-exam/details" }} />
            </div>
        </MainWrapper>
    )
}

export default Exams
