import React from 'react';
import { range } from 'lodash';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

const Stars = (props) => {
  return (
    <div className='col-5'>
      {range(props.numberOfStars).map((i) => (
        <i key={i} className='fa fa-star'></i>
      ))}
    </div>
  );
};

export default Stars;
