angular
  .module('houseBubble')
  .directive('bubbles', bubbles);

bubbles.$inject = [];
function bubbles() {

  const directive = {
    restrict: 'E',
    replace: true,
    scope: {
      housesIndex: '=houses'
      // onClick: '&'
      // fliltering: '='
    },
    //template: '<div class="bubbles"> -- {{ housesIndex.houses }} --</div>'
    templateUrl: 'js/views/templates/d3bubbles.html'
  };
  return directive;
}
