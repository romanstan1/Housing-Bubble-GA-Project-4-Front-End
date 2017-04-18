angular
  .module('houseBubble')
  .controller('HousesIndexCtrl', HousesIndexCtrl);

HousesIndexCtrl.$inject = ['zoopla'];
function HousesIndexCtrl(zoopla) {

const vm = this;

vm.houses = "WHADUP";

  function getHouses() {
    zoopla.getHouses()
      .then((res) => {
        vm.houses = res;
      });

  }

  vm.getHouses = getHouses;

}
