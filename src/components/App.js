import React, { Component } from "react";

import "./App.css";

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const oscillator = audioContext.createOscillator();
const gainNode = audioContext.createGain();
gainNode.connect(audioContext.destination);
oscillator.connect(gainNode);
oscillator.type = 'sine';
gainNode.gain.value = 0;
oscillator.start();

function press(frequency) {
    const now = audioContext.currentTime;
    oscillator.frequency.cancelScheduledValues(0);
    oscillator.frequency.linearRampToValueAtTime(frequency, now + 0.01);
    gainNode.gain.cancelScheduledValues(0);
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.8, now + 0.1);
    gainNode.gain.linearRampToValueAtTime(0.5, now + 0.2);
}

function release() {
    const now = audioContext.currentTime;
    gainNode.gain.cancelScheduledValues(0);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.1);
}

export class MusicMachine extends Component {
    constructor() {
        super();
        this.state = {
            low: 60,
            high: 72
        };
        this.oscillator = oscillator;
        this.changeOscillator = this.changeOscillator.bind(this);
        this.changeRange = this.changeRange.bind(this);
    }

    changeRange(event){
        const {name, value} = event.target;
        this.setState({
            [name]: Number(value)
        })
    }

    changeOscillator() {
        const {oscillator, typeSelector} = this;
        oscillator.type = typeSelector.value;
    }

    render() {
        const { low, high } = this.state;
        console.log("Low:", low, "High:", high);
        const range = Array.from(new Array(high - low + 1).keys());
        const keys = range.map(function(i) {
            const f = Math.pow(2, ((low+i) - 69)/12) * 440;
            return (
                <Key
                    key={i}
                    note={low+i}
                    down={press.bind(null, f)}
                    up={release}
                />
            );
        });

        return (
            <div className="machine-main">
                <h1 className="machine-title">HELLO MUSIC</h1>
                <div className="machine-knobs">
                    <select onChange={this.changeOscillator} ref={ s => this.typeSelector = s }>
                        <option value='sine'>sine</option>
                        <option value='sawtooth'>sawtooth</option>
                        <option value='square'>square</option>
                        <option value='triangle'>triangle</option>
                    </select>
                    <input type='number' name='low' defaultValue={low} min='0' max={high - 1} onChange={this.changeRange}/>
                    <input type='number' name='high' defaultValue={high} min={low+1} max='127'  onChange={this.changeRange}/>
                </div>
                <div className="machine-buttons">
                    {keys}
                </div>
            </div>
        );
    }
}

function Key(props) {
    const scale = props.note % 12;
    const black = [1,3,6,8,10].includes(scale);
    const keyClass = black ? 'machine-semi-tone':'machine-tone';
    return (
        <div
            className={keyClass}
            onMouseEnter={props.down}
            onMouseLeave={props.up}
        />
    );
}
