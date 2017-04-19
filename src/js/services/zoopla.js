angular
  .module('houseBubble')
  .service('zoopla', Zoopla);

Zoopla.$inject = ['$http', 'API_URL'];
function Zoopla($http, API_URL) {
  const vm = this;

  function getHouses(location) {
    return $http
      .get(`${API_URL}/api/search_properties`, { params: { location } })
      .then((response) => {
        return response;
      });
  }

  vm.getHouses = getHouses;
}
