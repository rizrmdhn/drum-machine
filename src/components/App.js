import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/styles.css";
import React from 'react';

const AUDIO = {
Q: { 
    letter: 'Q',
    keycode: 81,
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
   },
W: { 
    letter: 'W',
    keycode: 87,
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
   },
E: { 
    letter: 'E',
    keycode: 69,
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
   },
A: { 
    letter: 'A',
    keycode: 65,
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
   },
S: { 
    letter: 'S',
    keycode: 83,
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
   },
D: {
    letter: 'D',
    keycode: 68,
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
   },
Z: { 
    letter: 'Z',
    keycode: 90,
    id: 'Kick-n-Hat',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
   },
X: { 
    letter: 'X',
    keycode: 88,
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
   },
C: { 
    letter: 'C',
    keycode: 67,
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
   },
};

const DrumPad = props => {
  const padId = props.keypad.id.replace(/\s/g, "-");
  return (
    <div onClick={props.onClick} id={padId} className="drum-pad btn btn-secondary">
      <audio src={props.keypad.url} id={props.keypad.letter} className="clip"/>
      {props.keypad.letter}
    </div>
  );
};

const PadBank = props => {
  return <div id="pad-bank"><div className='col-sm'>{props.children}</div></div>
}

const InterfaceBank = props => {
  return <div id="control-container">{props.children}</div>
}

const Display = props => {
  return <h1 id="display">{props.display}</h1>
};

class DrumMachine extends React.Component {
  constructor() {
    super();
    this.state = {
      display: "",
      volume: 1
    }

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDisplay = this.handleDisplay.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(event) {
    const keypress = event.key.toUpperCase();
    const elementPressed = document.getElementById(keypress).parentElement
    elementPressed.click()
  };

  handleClick(event) {
    const element = event.target;
    const audio = element.querySelector("audio");
    const display = AUDIO[audio.id].id;
    element.classList.toggle("drum-pad-active");
    setTimeout(() => element.classList.toggle("drum-pad-active"), 100);
    this.handleDisplay(display);
    this.handlePlay(audio);
  }

  handleDisplay(display) {
    this.setState({
      display: display
    })
  };

  handlePlay(audio) {
    audio.currentTime = 0;
    audio.volume = this.state.volume
    audio.play();
  };

  render() {
    const drumPads = Object.values(AUDIO).map(audio => (
      <DrumPad keypad={audio} key={audio.keypad} onClick={this.handleClick} />
    ));
    return (
      <div id="drum-machine">
        <PadBank>{drumPads}</PadBank>
        <InterfaceBank>
          <Display display={this.state.display} />
        </InterfaceBank>
      </div>
    )
  }
}

export default DrumMachine;