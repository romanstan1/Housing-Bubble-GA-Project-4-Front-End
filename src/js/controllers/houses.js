angular
  .module('houseBubble')
  .controller('HousesIndexCtrl', HousesIndexCtrl);

HousesIndexCtrl.$inject = ['zoopla'];
function HousesIndexCtrl(zoopla) {

const vm = this;
vm.city = "E1";

vm.houses = "WHADUP";


  function getHouses(location) {
    zoopla.getHouses(location)
      .then((res) => {
        vm.houses = res;
      });

  }

  vm.getHouses = getHouses;

}
