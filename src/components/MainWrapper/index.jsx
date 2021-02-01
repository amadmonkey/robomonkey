import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

import './style.scss';

const MainWrapper = (props) => {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                {props.children}
            </div>
            <Footer />
        </div>
    )
}

export default MainWrapper
