import React from 'react';
import _ from 'lodash';

const Numbers = (props) => {
    const numberClassName = (number) => {
        if (props.usedNumbers.indexOf(number) >= 0) {
            return "numbers used";
        } else if (props.selectedNumbers.indexOf(number) >= 0) {
            return "numbers selected";
        } else {
            return "numbers";
        }
    }

    return (
        <div className="card text-center">
            <div>
                {
                    Numbers.list.map((number, i) =>
                        <span key={i} className={numberClassName(number)}
                            onClick={() => props.selectedNumber(number)}>{number}</span>
                    )
                }
            </div>
        </div>
    );
}

Numbers.list = _.range(1, 10);

export default Numbers;