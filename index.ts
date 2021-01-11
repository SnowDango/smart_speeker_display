import {app, BrowserWindow} from 'electron';

const windows: Array<BrowserWindow> = [];
let isObserverActive: boolean = true;
let stateData: string = "";
let anyData: string = "";

function setupWindow(): BrowserWindow{
    return new BrowserWindow({
        width: 1920,
        height: 1080,
        kiosk: true,
        'fullscreen': true,
        'frame': false,
        webPreferences: {
            nodeIntegration: true
        }
    });
}

function initView() {
    const win = setupWindow();
    windows.push(win);
    windows[0].loadFile('clock/index.html').catch(error => console.log(error));
    openThread();
}

function openThread(){
    let workerFarm = require('electron-worker-farm'),
        workers = workerFarm(require.resolve('./callApiThread'))
    const callbackFunc = (state: string,any: string) => {
        console.log(state);
        windows.forEach(win => {
            console.log(win.accessibleTitle);
        })
        if(stateData !== state || anyData !== any){
            if(state === '時計') {
                windows[0].loadFile('clock/index.html').catch(error => console.log(error));
            } else if(state === '検索'){
                windows[0].loadURL('https://www.google.com/search?q='+any).catch(error => console.log(error));
            }
        }
        stateData = state;
        anyData = any;
        workers(callbackFunc);
    }
    workers(callbackFunc);
}


//開いた時
app.on('ready', initView);

//windowがcloseされた時
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        isObserverActive = false;
        app.quit();
    }
});

//
app.on('activate', () => {
    if (windows.length === 0) {
        initView();
    }
});

