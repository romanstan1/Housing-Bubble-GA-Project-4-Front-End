angular
  .module('houseBubble')
  .directive('bubbles', bubbles);

bubbles.$inject = [];
function bubbles() {

  return {
    restrict: 'EA',
    scope: {
      nodes: '=',
      addProperty: '&'

    },
    link: function(scope, element, attrs) {

      scope.$watch('nodes', () => {
        if(scope.nodes.length > 0) generateD3();
      }, true);

      const svg = d3.select(element[0]).append('svg');

      ////-------- d3 code starts
      function generateD3() {

        svg.selectAll('circle').remove();
        const  w = 700,
               h = 600;

        const center = { x: w - 300, y: h - 300 };
        const damper = 0.6;

        let total = scope.nodes.reduce((value, d) => {
          return value + parseFloat(d.price);
        }, 0);

        const minAmount = d3.min(scope.nodes, function (d) {
          return Math.pow((d.price / 3.14), 0.5);
        });

        const scaling = d3.scale.linear()
          .domain([0, Math.pow((total / 3.14), 0.5) * 3.5])
          .range([0, w]);

        const nodes = scope.nodes.map(function (d) {
          return {
              value: d.price,
              r: scaling(Math.pow((d.price / 3.14), 0.5)),
              PropertyType: d.property_type,
              Bedrooms: d.num_bedrooms,
              Bathrooms: d.num_bathrooms,
              County: d.county,
              StreetName: d.street_name,
              Description: d.description,
              PriceChange: d.price_change
          };
        });

        svg
          .attr('width', w)
          .attr('height', h);

        const force = d3.layout.force()
          .nodes(nodes)
          .size([w, h])
          .charge(charge)
          .gravity(0.01)
          .friction(0.55)
          .on('tick', tick);

        var fillColor = d3.scale.linear()
          .domain([200000,2000000])
          .range(["#1ff2ee","#000080"]);

        const node = svg.selectAll('circle')
          .data(force.nodes())
          .enter()
          .append('circle')
          .attr('opacity', '0.7')
          .attr('fill', d => (fillColor(d.value)))
          // .attr('fill', 'Navy')
          .attr('r', d => (d.r))
          .on('click', d => scope.addProperty({ item: d }));

        function tick(e) {
          node.each(moveToCenter(e.alpha))
              .attr('cx', function (d) { return d.x; })
              .attr('cy', function (d) { return d.y; });
        }

        function moveToCenter(alpha) {
          return function (d) {
            d.x = d.x + (center.x - d.x) * alpha * damper;
            d.y = d.y + (center.y - d.y) * alpha * damper;
          };
        }

        function charge(d) {
          var charger = - (d.r * d.r * 1.25);
          return charger;
        }

        d3.select('#toolbar')
          .selectAll('.button')
          .on('click', function () {
            d3.selectAll('.button').classed('active', false);

            var button = d3.select(this);
            button.classed('active', true);

            var buttonId = button.attr('id');
            console.log(buttonId);
            // moveBubbles(buttonId);
          });

        force.start();
      }
    }
  };
}
