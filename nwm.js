const Nightmare = require('nightmare');
require('nightmare-window-manager')(Nightmare);

const nightmare = Nightmare({
    show: true,
    webPreferences: {
        partition: 'persist:derp'
    },
    
    alwaysOnTop: false
});

nightmare
.windowManager()
.goto('http://google.com')
.click('#something_opens_a_window')
.waitWindowLoad()
.currentWindow()
.then(function(window){
      //window contains useful information about the newly-opened window,
      //including the window ID
      console.dir(window)
});