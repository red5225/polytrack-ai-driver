const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');
function createWindow() {
  const win = new BrowserWindow({width:1440,height:900,minWidth:980,minHeight:650,title:'PolyTrack AI Driver',backgroundColor:'#101318',webPreferences:{preload:path.join(__dirname,'preload.js'),contextIsolation:true,nodeIntegration:false,sandbox:false}});
  win.webContents.setWindowOpenHandler(({url}) => { if (url.startsWith('https://')) shell.openExternal(url); return {action:'deny'}; });
  win.loadURL('https://www.kodub.com/apps/polytrack');
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    {label:'PolyTrack AI Driver',submenu:[{role:'about'},{type:'separator'},{role:'quit'}]},
    {label:'View',submenu:[{role:'reload'},{role:'toggleDevTools'},{type:'separator'},{role:'resetZoom'},{role:'zoomIn'},{role:'zoomOut'}]},
    {label:'AI',submenu:[{label:'Show AI status',click:()=>win.webContents.executeJavaScript('window.__PTAI_UI__ && window.__PTAI_UI__.showStatus()')},{label:'Stop AI driver',accelerator:'Escape',click:()=>win.webContents.executeJavaScript('window.__PTAI_UI__ && window.__PTAI_UI__.stop()')}]}
  ]));
}
app.whenReady().then(()=>{createWindow();app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)createWindow();});});
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit();});
