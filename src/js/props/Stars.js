import React from 'react';
import _ from 'lodash';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

const Stars = (props) => {

    //const nuumberOfStars = 1 + Math.floor(Math.random() * 9);

    return (
        <div className="col-5">
            {_.range(props.numberOfStars).map(i =>
                <i key={i} className="fa fa-star"></i>
            )}
        </div>
    )
}

export default Stars;
