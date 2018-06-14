import React from 'react';

const Answers = (props) => {
    return (
        <div className="col-5">
            {
                props.selectedNumbers.map((number, i) =>
                    <span key={i} onClick={() => props.unselectNumbers(number)}
                        className="numbers">{number}</span>
                )
            }
        </div>
    )
}

export default Answers;