import React from 'react';
import { range } from 'lodash';
import '@fortawesome/fontawesome-free/css/all.min.css';

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
