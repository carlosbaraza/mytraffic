// PhantomJS script to capture Google Map

var system = require('system');
var WebPage = require('webpage');
page = WebPage.create();
page.open('https://www.google.nl/maps/@49.4389858,6.1385456,14z/data=!5m1!1e1');
page.onLoadFinished = renderMapDelayed;

page.viewportSize = {
  width: 4000,
  height: 6800
};

function renderMapDelayed() {
  setTimeout(renderMap, 1000);
}

function renderMap() {
  console.log('Rendering traffic image to', system.args[1]);
  page.render(system.args[1]);
  phantom.exit();
}
