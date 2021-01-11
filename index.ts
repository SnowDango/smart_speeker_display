import {app,BrowserWindow} from 'electron';
import {worker} from "cluster";


let win: BrowserWindow | null = null;
let isObserverActive: boolean = true;
let apiData: string = "";

function createWindow () {
    win = new BrowserWindow({
        width: 1920,
        height: 1080,
        kiosk: true,
        'fullscreen': true,
        'frame': false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadFile('clock/index.html').catch(error => console.log(error));
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    });
    openThread();
}

function openThread(){
    let workerFarm = require('electron-worker-farm'),
        workers = workerFarm(require.resolve('./callApiThread')),
        ret = 0

    const callbackFunc = (string: string) => {
        console.log(string);
        workers(callbackFunc);
    }
    workers(callbackFunc);
}
//開いた時
app.on('ready', createWindow);

//windowがcloseされた時
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        isObserverActive = false;
        app.quit();
    }
});

//
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

