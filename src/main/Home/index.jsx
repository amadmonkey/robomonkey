import React, { useState } from 'react';
import Test from '../../img/history.svg'
import Card from '../../components/Card';
import MainWrapper from '../../components/MainWrapper';
import ProfileCard from '../../components/ProfileCard';
import OngoingExams from '../../components/OngoingExams';
import Chat from '../../components/Chat';
import ExamsTable from '../../components/ExamsTable';

const Home = () => {

    const showMore = () => {
        alert('fetch');
    }

    return (
        <MainWrapper>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
                <div style={{ padding: "20px", paddingTop: "130px" }}>
                    <ProfileCard>
                        test
                    </ProfileCard>
                    <OngoingExams />
                </div>
                <div style={{ padding: "20px", paddingTop: "130px" }}>
                    <ExamsTable link={{ label: "Go to Exams", to: "/exams" }} dashboard />
                    <Card title={<React.Fragment><img style={{ marginRight: "5px" }} src={Test} /> Recent Activity</React.Fragment>} link={{ label: "Go to Polls", to: "/polls" }} showMore={showMore}>
                        <table>
                            <tbody>
                                <tr>
                                    <td width="60%">test</td>
                                    <td width="40%">test</td>
                                </tr>
                                <tr>
                                    <td width="60%">test</td>
                                    <td width="40%">test</td>
                                </tr>
                                <tr>
                                    <td width="60%">test</td>
                                    <td width="40%">test</td>
                                </tr>
                                <tr>
                                    <td width="60%">test</td>
                                    <td width="40%">test</td>
                                </tr>
                                <tr>
                                    <td width="60%">test</td>
                                    <td width="40%">test</td>
                                </tr>
                                <tr>
                                    <td width="60%">test</td>
                                    <td width="40%">test</td>
                                </tr>
                                <tr>
                                    <td width="60%">test</td>
                                    <td width="40%">test</td>
                                </tr>
                                <tr>
                                    <td width="60%">test</td>
                                    <td width="40%">test</td>
                                </tr>
                                <tr>
                                    <td width="60%">test</td>
                                    <td width="40%">test</td>
                                </tr>
                                <tr>
                                    <td width="60%">test</td>
                                    <td width="40%">test</td>
                                </tr>
                            </tbody>
                        </table>
                    </Card>
                </div>
            </div>
            <Chat />
        </MainWrapper>
    )
}

export default Home
