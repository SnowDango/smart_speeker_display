import {app,BrowserWindow} from 'electron';


let win: BrowserWindow | null = null;

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

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
