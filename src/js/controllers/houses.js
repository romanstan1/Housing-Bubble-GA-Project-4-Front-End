angular
  .module('houseBubble')
  .controller('HousesIndexCtrl', HousesIndexCtrl);

HousesIndexCtrl.$inject = ['zoopla'];
function HousesIndexCtrl(zoopla) {

const vm = this;
let nodes = [];
vm.nodes = [];

  function getHouses(location) {
    vm.nodes = [];
    zoopla.getHouses(location)
      .then((res) => {
        vm.allProperties = res;
        vm.nodes = vm.allProperties.data.listing;
        // console.log('Result Count: ', vm.allProperties.data.result_count);
        // console.log('Area Name: ', vm.allProperties.data.area_name);
        console.log('nodes', vm.nodes);
      });
  }

  vm.getHouses = getHouses;

  function addProperty(item) {
    console.log(item);
  }

  vm.addProperty = addProperty;

vm.nodesOther = [
  {
    price: 70000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 17000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 17000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 17000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 17000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 17000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 17000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 17000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 17000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 17000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 17000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 17000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 17000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 17000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 17000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 17000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 227000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 227000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 227000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 227000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 227000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 227000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 227000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 2227000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 70000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 70000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 270000,
    property_type: "Detatched House",
    num_bedrooms: 2,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 270000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 370000,
    property_type: "Detatched House",
    num_bedrooms: 2,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 70000,
    property_type: "Detatched House",
    num_bedrooms: 2,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 170000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 1470000,
    property_type: "Detatched House",
    num_bedrooms: 7,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 870000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 260000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 230000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 270000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 170000,
    property_type: "Detatched House",
    num_bedrooms: 5,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 570000,
    property_type: "Detatched House",
    num_bedrooms: 3,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 270000,
    property_type: "Detatched House",
    num_bedrooms: 3,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 170000,
    property_type: "Detatched House",
    num_bedrooms: 5,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 570000,
    property_type: "Detatched House",
    num_bedrooms: 6,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 870000,
    property_type: "Detatched House",
    num_bedrooms: 9,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 770000,
    property_type: "Detatched House",
    num_bedrooms: 7,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 170000,
    property_type: "Detatched House",
    num_bedrooms: 6,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 470000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  },
  {
    price: 270000,
    property_type: "Detatched House",
    num_bedrooms: 4,
    num_bathrooms: 4,
    county: "Fife",
    street_name: "Whatever",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo.",
    price_change: 2
  }

];
}
