angular
  .module('houseBubble')
  .controller('AuthCtrl', AuthCtrl);

AuthCtrl.$inject = ['$auth', '$state', 'zoopla', 'House'];
function AuthCtrl($auth, $state, zoopla, House) {
  const vm = this;

  function register() {
    $auth.signup(vm.user)
      .then(() => $state.go('login'));
  }

  vm.register = register;

  function login() {
    $auth.login(vm.credentials)
      .then(() => $state.go('houses'));

  }

  vm.login = login;
}
