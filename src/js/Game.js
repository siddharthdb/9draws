import React from "react";
import Stars from "./props/Stars";
import Answers from "./props/Answers";
import Button from "./props/Button";
import Numbers from "./props/Numbers";
import DoneFrame from "./props/Done";
import _ from "lodash";

class Game extends React.Component {
  static randomNumber = () => 1 + Math.floor(Math.random() * 9);
  static initialState = () => ({
    selectedNumbers: [],
    randomNumberOfStars: Game.randomNumber(),
    answerIsCorrect: null,
    usedNumbers: [],
    redraws: 5,
    doneStatus: null,
  });

  state = Game.initialState();

  updateDoneStatus = () => {
    this.setState((prevState) => {
      if (prevState.usedNumbers.length === 9) {
        return { doneStatus: "Done Nice!" };
      }

      if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
        return { doneStatus: "Game Over!" };
      }
    });
  };

  possibleSolutions = ({ randomNumberOfStars, usedNumbers }) => {
    const possibleNumbers = _.range(1, 10).filter(
      (number) => usedNumbers.indexOf(number) === -1
    );

    return this.possibleCombinationSum(possibleNumbers, randomNumberOfStars);
  };

  possibleCombinationSum = (arr, n) => {
    if (arr.indexOf(n) >= 0) {
      return true;
    }

    if (arr[0] > n) {
      return false;
    }

    if (arr[arr.length - 1] > n) {
      arr.pop();
      return this.possibleCombinationSum(arr, n);
    }

    const listSize = arr.length,
      combinationCount = 1 << listSize;
    for (const i = 0; i < combinationCount; i++) {
      const combinationSum = 0;
      for (const j = 0; j < listSize; j++) {
        if (i & (1 << j)) {
          combinationSum += arr[j];
        }
      }
      if (n === combinationSum) {
        return true;
      }
    }
    return false;
  };

  selectNumber = (clickedNumber) => {
    if (this.state.usedNumbers.indexOf(clickedNumber) >= 0) {
      return;
    }
    this.setState((prevState) => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
    }));
  };

  unselectNumbers = (clickedNumber) => {
    this.setState((prevState) => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.filter(
        (number) => number !== clickedNumber
      ),
    }));
  };

  checkAnswer = () => {
    this.setState((prevState) => ({
      answerIsCorrect:
        prevState.randomNumberOfStars ===
        prevState.selectedNumbers.reduce((acc, n) => acc + n, 0),
    }));
  };

  acceptAnswer = () => {
    this.setState(
      (prevState) => ({
        usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
        selectedNumbers: [],
        answerIsCorrect: null,
        randomNumberOfStars: Game.randomNumber(),
      }),
      this.updateDoneStatus
    );
  };

  redraw = () => {
    if (this.state.redraws === 0) {
      return;
    }
    this.setState(
      (prevState) => ({
        randomNumberOfStars: Game.randomNumber(),
        answerIsCorrect: null,
        selectedNumbers: [],
        redraws: prevState.redraws - 1,
      }),
      this.updateDoneStatus
    );
  };

  resetGame = () => this.setState(Game.initialState());

  render() {
    const {
      selectedNumbers,
      randomNumberOfStars,
      answerIsCorrect,
      usedNumbers,
      redraws,
      doneStatus,
    } = this.state;

    return (
      <div className='container'>
        <div className='clearfix'>
          <h3> Play Nine </h3>
          <div className='pull-right'></div>
        </div>

        <hr />
        <div className='row'>
          <Stars numberOfStars={randomNumberOfStars} />

          <Button
            selectedNumbers={selectedNumbers}
            checkAnswer={this.checkAnswer}
            answerIsCorrect={answerIsCorrect}
            acceptAnswer={this.acceptAnswer}
            redraw={this.redraw}
            redraws={redraws}
          />
          <Answers
            selectedNumbers={selectedNumbers}
            unselectNumbers={this.unselectNumbers}
          />
        </div>
        <br />
        {doneStatus ? (
          <DoneFrame resetGame={this.resetGame} doneStatus={doneStatus} />
        ) : (
          <Numbers
            selectedNumbers={selectedNumbers}
            selectedNumber={this.selectNumber}
            usedNumbers={usedNumbers}
          />
        )}
      </div>
    );
  }
}

export default Game;
