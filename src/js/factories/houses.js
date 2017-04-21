angular
  .module('houseBubble')
  .factory('House', House);

House.$inject = ['$resource', 'API_URL'];
function House($resource, API_URL) {
  return new $resource(`${API_URL}/houses/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
