import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import placeholderImage from '../../img/Untitled.png';
import Card from '../Card';
import Tooltip from '../../components/Tooltip';
import './style.scss';
import Times from '../../img/times.svg';
import Settings from '../../img/settings.svg';

const ProfileCard = () => {

    let name = "Kamote";

    const statusConst = {
        ONLINE: "online",
        OFFLINE: "offline",
        BUSY: "busy",
        IDLE: "idle"
    }
    const [status, setStatus] = useState(statusConst.IDLE);
    const [choiceStatus, setChoiceStatus] = useState('');

    const updateStatus = (newStatus) => {
        setStatus(newStatus);
    }

    return (
        <Card className="profile-card">
            <header className="profile-card-header">
                <div>
                    <div className={`profile-image ${status}`}>
                        <img src={placeholderImage} />
                    </div>
                    <div className={`status-container ${choiceStatus}`}>
                        <button className={`status-item online ${status === statusConst.ONLINE ? 'active' : ''}`} onClick={() => updateStatus(statusConst.ONLINE)}><div></div>Online</button>
                        <button className={`status-item offline ${status === statusConst.OFFLINE ? 'active' : ''}`} onClick={() => updateStatus(statusConst.OFFLINE)}><div></div>Offline</button>
                        <button className={`status-item busy ${status === statusConst.BUSY ? 'active' : ''}`} onClick={() => updateStatus(statusConst.BUSY)}><div></div>Busy</button>
                        <button className={`status-item idle ${status === statusConst.IDLE ? 'active' : ''}`} onClick={() => updateStatus(statusConst.IDLE)}><div></div>Idle</button>
                    </div>
                </div>
            </header>
            <h2>Welcome back,</h2>
            <h1>{name}</h1>
            <ul className="alerts">
                <li className="alert-item">You have <span className="bold danger">2 new messages</span></li>
                <li className="alert-item"><span className="bold">Patatas</span>, and <span className="bold">2 others</span> finished <span className="bold info">Lorem Ipsum</span></li>
                <li className="alert-item"><span className="bold info">Lorem Ipsum</span> is ending in <span className="bold danger">2 days</span>. <Link to="/" className="link bold">Remind</Link></li>
                <li className="alert-item"><span className="bold info">Lorem Ipsum 2</span> is ending in <span className="bold danger">8 hours</span>. <Link to="/" className="link bold">Remind</Link></li>
            </ul>
            <div className="tools">
                <Tooltip label="Sign Out" dark>
                    <button aria-label="Sign Out" className="signout"><img src={Times} /></button>
                </Tooltip>
                <Tooltip label="Account Settings">
                    <button aria-label="Account Settings" className="settings"><img src={Settings} /></button>
                </Tooltip>
            </div>
        </Card >
    )
}

export default ProfileCard
