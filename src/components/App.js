import React, { Component } from "react";

import "./App.css";

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscillator = audioContext.createOscillator();
const gainNode = audioContext.createGain();

oscillator.connect(gainNode);
gainNode.connect(audioContext.destination);

oscillator.type = "sine";
oscillator.frequency.value = 440;

function press(frequency) {
    oscillator.frequency.value = frequency;
    oscillator.start();
}

function release() {
    oscillator.stop();
    oscillator = audioContext.createOscillator();
    oscillator.connect(gainNode);
    oscillator.type = "sine";
}

export class MusicMachine extends Component {
    constructor() {
        super();
        this.state = {
            number_of_keys: 24,
            low: 200,
            high: 3000
        };
    }

    render() {
        const { number_of_keys, low, high } = this.state;
        const step = (high - low) / number_of_keys;
        const range = Array.from(new Array(number_of_keys).keys());
        const keys = range.map(function(i) {
            const f = i * step + low;
            return <Key key={i} index={i} down={press.bind(null, f)} up={release} />;
        });

        return (
            <div className="machine-main">
                <h1 className="machine-title">HELLO MUSIC</h1>
                <div className="machine-knobs">Here there be settings.</div>
                <div className="machine-buttons">
                    {keys}
                </div>
            </div>
        );
    }
}

function Key(props) {
    return (
        <div
            className="machine-key"
            onMouseDown={props.down}
            onMouseEnter={props.down}
            onMouseLeave={props.up}
            onMouseUp={props.up}
        />
    );
}
