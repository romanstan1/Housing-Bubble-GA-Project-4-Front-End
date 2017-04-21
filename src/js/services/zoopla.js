angular
  .module('houseBubble')
  .service('zoopla', Zoopla);

Zoopla.$inject = ['$http', 'API_URL'];
function Zoopla($http, API_URL) {
  const vm = this;

  function getHouses(location) {
    return $http
      .get(`${API_URL}/search_properties`, { params: { location } })
      .then((response) => {
        return response;
      });
  }

  vm.getHouses = getHouses;

  function getUserHouses(listing_ids) {
    return $http
      .get(`${API_URL}/user_properties`, { params: { listing_ids: listing_ids.join(',') }})
      .then((response) => {
          // console.log('response', response);
        return response;
      });
  }

  vm.getUserHouses = getUserHouses;
}
