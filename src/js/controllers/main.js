angular
  .module('houseBubble')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth', 'zoopla', 'User'];
function MainCtrl($rootScope, $state, $auth, zoopla, User) {
  const vm = this;
  vm.navIsOpen = false;

  vm.isAuthenticated = $auth.isAuthenticated;

  $rootScope.$on('error', (e, err) => {
    vm.stateHasChanged = false;
    vm.message = err.data.message;
    $state.go('login');
  });

  vm.houseIds = [];

  $rootScope.$on('$stateChangeSuccess', () => {
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    vm.navIsOpen = false;

    if($auth.getPayload()) {
      User.get({ id: $auth.getPayload().id })
        .$promise
        .then((user) => {
          // console.log(user);
          vm.currentUser = user;
          vm.houseIds = vm.currentUser.houses.map(house => house.listing_id);
          return zoopla
            .getUserHouses(vm.houseIds);
        })
        .then((res) => {
          vm.userdata = res.data.listing;
          console.log('res from zoopla', vm.userdata);
        });
    }
  });

  function logout() {
    $auth.logout();
    $state.go('houses');
  }

  vm.logout = logout;
}
