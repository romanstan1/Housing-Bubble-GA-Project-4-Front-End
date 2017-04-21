angular
  .module('houseBubble')
  .controller('HousesIndexCtrl', HousesIndexCtrl);

HousesIndexCtrl.$inject = ['zoopla', 'House'];
function HousesIndexCtrl(zoopla, House) {

const vm = this;
vm.nodes = [];
vm.house = {};

vm.clickdis = false;

function click() {
  if (vm.clickdis) {
    vm.clickdis = false;
  } else {
    vm.clickdis = true;
  }
  console.log(vm.clickdis);
}
vm.click = click;


function getHouses(location) {
  // vm.nodes = [];
  zoopla.getHouses(location)
    .then((res) => {
      // vm.allProperties = res;
      vm.nodes = res.data.listing;
    });
}

vm.getHouses = getHouses;

function addProperty(item) {
  vm.house.listing_id = item.Id;
  House
    .save({ house:vm.house })
    .$promise
    .then((house) => {
      console.log('addedHouse',house);
    });
}

vm.addProperty = addProperty;

  // function getPropertiesArray() {
  //   House
  //     .query()
  //     .$promise
  //     .then(function(data) {
  //       console.log('Houses saved on database', data);
  //       vm.all = data; })
  //     .then(function(){
  //       vm.all.forEach(function(e) {
  //         vm.housesIds = vm.housesIds.concat(',', e.listing_id);
  //       });
  //       vm.housesIds = [vm.housesIds.substr(1)];
  //
  //       zoopla
  //         .getUserHouses(vm.housesIds)
  //         .then((res) => {
  //           console.log('Up to date Zoopla listings', res);
  //         });
  //     });
  // }
  //
  // vm.getPropertiesArray = getPropertiesArray;
  //
  // function findUserProperties() {
    // zoopla.getUserHouses(['35940943,43307305,43252778,41760213'])
  //   zoopla
  //     .getUserHouses(vm.housesIds)
  //     .then((res) => {
  //       console.log('Up to date Zoopla listings', res);
  //     });
  // }
  //
  // vm.findUserProperties = findUserProperties;

}
