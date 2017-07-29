import React from 'react';
import ReactDOM from 'react-dom';
import './base-style.css';

import {MusicMachine} from './components/App';


const AppRoot = document.querySelector("#app-root");


ReactDOM.render(<MusicMachine />, AppRoot);