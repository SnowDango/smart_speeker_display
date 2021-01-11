import {app,BrowserWindow} from 'electron';

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
}

function setupApp(){
    createWindow();
    observerApi().catch(error => alert(error));
}

async function　observerApi(){
    while (isObserverActive){
        const newApiData: string = await apiRequest();
        if(apiData !== newApiData){
            //TODO　画面の切り替え
        }
    }
}

async function apiRequest(): Promise<string>{
    //TODO api request
    return  "";
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


