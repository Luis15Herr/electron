const	electron = require('electron');
const {app, BrowserWindow} = electron;
const remote = require('electron').remote;
const path = require ('path');
const url = require ('url');
const Menu = electron.Menu;


let win = null; 
app.on('ready',function(){
	win = new BrowserWindow({width: 640, height: 480, fullscreen: true});
	  const mainMenu = Menu.buildFromTemplate(templateMenu);
  		// Set The Menu to the Main Window
 		 Menu.setApplicationMenu(mainMenu);

	win.loadURL(
		url.format({
			pathname: path.join(__dirname,'index.html'),
			protocol : 'file',
			slashes: true
		}))
});

// Menu Template
const templateMenu = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Exit',
        accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  }
];

if (process.env.NODE_ENV !== 'production') {
  templateMenu.push({
    label: 'DevTools',
    submenu: [
      {
        label: 'Show/Hide Dev Tools',
        accelerator: process.platform == 'darwin' ? 'Comand+D' : 'Ctrl+D',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  })
}