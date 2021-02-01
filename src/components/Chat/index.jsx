import React, { useState } from 'react';
import { ReactComponent as Message } from '../../img/message.svg';
import './style.scss';

const Chat = () => {

    const [active, setActive] = useState(false);

    return (
        <div className={`chat-container ${active ? 'active' : ''}`}>
            <header onClick={() => setActive(!active)}>
                <Message />
                <h1 style={{ marginLeft: '2px' }}>Messages</h1>
            </header>
        </div>
    )
}

export default Chat
