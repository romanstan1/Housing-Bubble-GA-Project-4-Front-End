angular
  .module('houseBubble')
  .service('zoopla', Zoopla);

Zoopla.$inject = ['$http', 'API_URL'];
function Zoopla($http, API_URL) {
  const vm = this;

  function getHouses() {
    return $http
      .get(`${API_URL}/api/search_properties`)
      // .get(`${API_URL}/api/search_properties`, { params: { postcode } })
      .then((response) => {
        console.log(response);
        return response;
      });
  }

  vm.getHouses = getHouses;
}
