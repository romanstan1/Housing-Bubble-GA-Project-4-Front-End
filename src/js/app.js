// app.js is the main JS file which you should define your Angular module
angular
  .module('houseBubble', ['ui.router', 'ngResource'])
  .constant('API_URL', 'http://localhost:3000');
