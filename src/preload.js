const { contextBridge } = require('electron');
const fs = require('fs');
const path = require('path');
contextBridge.exposeInMainWorld('__PTAI_BOOT__', {version:'0.1.0'});
window.addEventListener('DOMContentLoaded',()=>{
  try { const source=fs.readFileSync(path.join(__dirname,'ai','inject.js'),'utf8'); const script=document.createElement('script'); script.textContent=source; (document.head||document.documentElement).appendChild(script); script.remove(); }
  catch(error){console.error('[PTAI] Could not initialize AI overlay:',error);}
});
