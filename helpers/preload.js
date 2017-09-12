import Nightmare from 'nightmare';
import path from 'path';


window.__nightmare = {};
__nightmare.ipc = require('electron').ipcRenderer;