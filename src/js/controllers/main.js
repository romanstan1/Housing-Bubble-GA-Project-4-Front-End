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

  $rootScope.userdata = [];

  $rootScope.$on('$stateChangeSuccess', () => {
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    vm.navIsOpen = false;

    if($auth.getPayload()) {
      // if(!vm.currentUser) {
        User.get({ id: $auth.getPayload().id })
          .$promise
          .then((user) => {
            vm.currentUser = user;
            // console.log('current user', vm.currentUser);
            const houseIds = vm.currentUser.houses.map(house => house.listing_id);
            // console.log('house iDs', houseIds);
            return zoopla
              .getUserHouses(houseIds);
          })
          .then((res) => {
            vm.userdata = res.data.listing;
            // console.log('Up to date Zoopla listings', vm.userdata);
          });
      // }
    }
  });

  function logout() {
    $auth.logout();
    $state.go('houses');
  }

  vm.logout = logout;
}
