const {app, BrowserWindow, webFrame, Menu} = require('electron')
const path = require('path')
const url = require('url')
const shell = require('electron').shell;

let is_shown = true;

app.inspect = function()
{
  app.win.toggleDevTools();
}

app.toggle_fullscreen = function()
{
  app.win.setFullScreen(app.win.isFullScreen() ? false : true);
}

app.toggle_visible = function()
{
  if(process.platform == "win32"){
    if(!app.win.isMinimized()){ app.win.minimize(); } else{ app.win.restore(); }
  } else {
    if(is_shown){ app.win.hide(); } else{ app.win.show(); }
  }
}

app.inject_menu = function(m)
{
  Menu.setApplicationMenu(Menu.buildFromTemplate(m));
}

app.path = function()
{
  return __dirname
}

app.win = null;

app.on('ready', () => 
{
  app.win = new BrowserWindow({width: 880, height: 540, backgroundColor:"#000", minWidth: 587, minHeight: 540, frame:false, autoHideMenuBar: true, icon: __dirname + '/icon.ico'})

  app.win.loadURL(`file://${__dirname}/sources/index.html`)
  // app.win.toggleDevTools();
  
  app.win.on('closed', () => {
    win = null
    app.quit()
  })

  app.win.on('hide',function() {
    is_shown = false;
  })

  app.win.on('show',function() {
    is_shown = true;
  })
})

app.on('window-all-closed', () => 
{
  app.quit()
})

app.on('activate', () => {
  if (app.win === null) {
    createWindow()
  }
})