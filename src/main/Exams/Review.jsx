import React from 'react';
import ReviewIcon from '../../img/review-icon.svg';
import Card from '../../components/Card';

const Review = () => {
    return (
        <Card title={<React.Fragment><img style={{ marginRight: "5px" }} src={ReviewIcon} /> Review</React.Fragment>}>
            test
        </Card>
    )
}

export default Review
