// app.js is the main JS file which you should define your Angular module
angular
  .module('houseBubble', ['ui.router', 'ngResource', 'satellizer', 'ngMessages'])
  .constant('API_URL', 'http://localhost:3000/api')
  .config(Auth);

Auth.$inject = ['$authProvider', 'API_URL'];
function Auth($authProvider, API_URL) {
  $authProvider.signupUrl = `${API_URL}/register`;
  $authProvider.loginUrl = `${API_URL}/login`;
}
