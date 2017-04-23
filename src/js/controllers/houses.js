angular
  .module('houseBubble')
  .controller('HousesIndexCtrl', HousesIndexCtrl);

HousesIndexCtrl.$inject = ['zoopla', 'House', '$rootScope', '$auth', 'User'];
function HousesIndexCtrl(zoopla, House, $rootScope, $auth, User) {

const vm = this;
vm.nodes = [];
vm.house = {};

function getHouses(location) {
  zoopla.getHouses(location)
    .then((res) => {
      console.log(res);
      vm.nodes = res.data.listing;
    });
}

vm.getHouses = getHouses;

function addProperty(item) {
  vm.house.listing_id = item.Id;
  House.save({ house:vm.house });
}

vm.addProperty = addProperty;

function removeProperty(item) {
  User.get({ id: $auth.getPayload().id })
    .$promise
    .then((user) => {
      user.houses.forEach((house) => {
        if (house.listing_id === item.Id) {
          House.delete({ id: house.id });
        }
      });
  })
}

vm.removeProperty = removeProperty;

}
