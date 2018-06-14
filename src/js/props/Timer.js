import React from 'react';

class Timer extends React.Component {
    constructor() {
        super();
        this.state = { time: {}, seconds: 60 };  //a minute to play the game
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
      }
    
      secondsToTime(secs){ 
        
        let timer = {
          "s": Math.ceil((secs % (60 * 60)) % 60)
        };
        return timer;
      }

      componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
      }
    
      startTimer() {
        if (this.timer === 0) {
          this.timer = setInterval(this.countDown, 1000);
        }
      }
    
      countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
          time: this.secondsToTime(seconds),
          seconds: seconds,
        });
        
        // Check if we're at zero.
        if (seconds === 0) { 
          clearInterval(this.timer);
        }
      }
    
      render() {
        return(
          <div>
            <button onClick={this.startTimer}>Start {this.state.time.s}</button>
          </div>
        );
      }
}

export default Timer;