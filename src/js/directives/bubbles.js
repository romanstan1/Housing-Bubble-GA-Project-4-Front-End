angular
  .module('houseBubble')
  .directive('bubbles', bubbles);

bubbles.$inject = [];
function bubbles() {

  return {
    restrict: 'EA',
    scope: {
      nodes: '=',
      userdata: '=',
      addProperty: '&',
      removeProperty: '&'

    },
    link: function(scope, element, attrs) {




      const  w = window.innerWidth,
             h = window.innerHeight - 50,
             damper = 0.6;

      let center = { x: w / 2, y: h / 2 };
      let force = null;
      let userNodes = null;
      let nextIndex = null;

      const svg = d3.select(element[0]).append('svg');

      svg
        .attr('width', w)
        .attr('height', h);



      scope.$watch('nodes', () => {
        if(scope.nodes.length > 0) {

          const total = scope.nodes.reduce((value, d) => {
            return value + parseFloat(d.price);
          }, 0);

          const scaling = d3.scale.linear()
            .domain([0, Math.pow((total / 3.14), 0.5) * 6])
            .range([0, w]);

          console.log('hitttscopenodes', scope.nodes);

          const nodes = scope.nodes.map(function (d) {
            return {
                value: d.price,
                r: scaling(Math.pow((d.price / 3.14), 0.5)),
                PropertyType: d.property_type,
                Bedrooms: d.num_bedrooms,
                Bathrooms: d.num_bathrooms,
                Id: d.listing_id,
                County: d.county,
                StreetName: d.street_name,
                Description: d.description,
                PriceChange: d.price_change,
                Address: d.displayable_address,
                Receptions: d.num_recepts,
                Url: d.details_url,
                NodeType: "search",
                centerPoint: { x: w * 0.35, y: h / 2 },
                indexValue: 'index'
            };
          });

          generate(nodes, 'search');
        }
      }, true);

      scope.$watch('userdata', () => {
        if(scope.userdata > 0) {
          console.log('hitttscopedata', scope.userdata);
          userNodes = scope.userdata.map(function (d, i) {
            return {
                value: d.price,
                r: w * 0.012,
                PropertyType: d.property_type,
                Bedrooms: d.num_bedrooms,
                Bathrooms: d.num_bathrooms,
                Id: d.listing_id,
                County: d.county,
                StreetName: d.street_name,
                Description: d.description,
                PriceChange: d.price_change,
                Address: d.displayable_address,
                Receptions: d.num_recepts,
                Url: d.details_url,
                NodeType: "user",
                centerPoint: { x: w * 0.75 , y: h * 0.5 },
                indexValue: 'index' + i
            };
          });
          // force = d3.layout.force()
          //   .nodes(userNodes)
          //   .size([w, h])
          //   .charge( d => (- d.r * d.r * 1.25))
          //   .gravity(0.01)
          //   .friction(0.55);
          nextIndex = userNodes.length - 1;
          generate(userNodes, 'user');
        }
      }, true);










      function generate(nodes, type) {
        // svg.selectAll('circle')
        //   .filter(function(d) {
        //     return d.NodeType === "search"; })
        //   .remove();

        svg.selectAll('circle').remove();

        if(nodes[0].NodeType === "search" && userNodes ) {
          nodes = nodes.concat(userNodes);
          // chargeCorrection();
        }

        force = d3.layout.force()
          .nodes(nodes)
          .size([w, h])
          .charge( (d) => {
            if (d.NodeType === 'search') {
              return (- d.r * d.r * 1.45);
            } else {
              return 0;
            }
          })
          .gravity(0)
          .friction(0.45);

        if(userNodes>0){
          let userNodesIndexes = userNodes.map((house, i) => {
            return parseInt(house.indexValue.substring(5));
          });
          console.log(userNodesIndexes);
        }


        function findNextIndex(d) {
          console.log("hit1?");


          if(d.NodeType ==="user") {
            console.log("hit2?");
            userNodes.forEach((house, i) => {
              house.indexValue = i;
            });
            destroyAllBoxes();
            createBoxes();
          }


            // const index = userNodesIndexes.indexOf(parseInt(d.indexValue.substring(5)));
            // userNodesIndexes.splice(index, 1);
            // for(let i = 0; i < userNodesIndexes.length; i++) {
            //   if (userNodesIndexes[i] != i){
            //     nextIndex = i - 1;
            //     break;
            //   }
            // }

          // console.log(nextIndex);

        }

        var fillColor = d3.scale.linear()
          .domain([200000,2000000])
          .range(["#1ff2ee","#000080"]);

        const node = svg.selectAll('circle')
          .filter(function(d) { return d.NodeType === type; })
          .data(force.nodes())
          .enter()
          .append('circle')
          .attr('opacity', '0.7')
          .attr('fill', d => (fillColor(d.value)))
          .attr('r', d => (d.r))
          .on('click', function (d) {
            if ( d.NodeType === "search") {
              scope.addProperty({ item: d });
              d.centerPoint = { x: w * 0.75, y: h * 0.5};
              findNextIndex(d);
              d.NodeType = "user";
              d.centerPoint = { x: w - 300 , y: 10 + (2 * (w * 0.012)) + (nextIndex*(boxHeight*1.22)) };
            } else {
              scope.removeProperty({ item: d });
              d.centerPoint.x = w + 300;
              // destroyBoxes(d.indexValue);
              findNextIndex(d);
            }
            moveBubbles();
            // createBoxes();
          });



  
        const boxHeight = (h * 0.08);

        function destroyBoxes(indexValue) {
          svg.select('#' + indexValue).remove();
        }

        function destroyAllBoxes() {
          svg.selectAll('svg').remove();
        }

        function createBoxes() {
          userNodes.forEach((house, i) => {
            console.log(house, i);

            const g = svg.append('svg')
            .attr("x", w - 260)
            .attr("y", 10 + (i* (boxHeight * 1.22)))
            .attr("width", 250)
            .attr("height", boxHeight )
            .attr("id", 'index' + i);

            const rect = g.append('rect')
            .attr("width", 250)
            .attr("height", boxHeight )
            .attr('fill', 'grey')
            .attr('opacity', '0.1');

            g.append('text')
            .text(house.Address)
            .attr("x", 10)
            .attr("y", 20)
            .attr("font-size", w * 0.01);

            g.append('text')
            .text('£' + parseInt(house.value).toLocaleString())
            .attr("x", 140)
            .attr("y", 40)
            .attr("fill", 'dodgerblue')
            .attr("font-size", w * 0.01);

            g.append('text')
            .text('BEDS: ' + house.Bedrooms +' BATHS: ' + house.Bathrooms)
            .attr("x", 10)
            .attr("y", 40)
            .attr("font-size", w * 0.01);

            house.centerPoint = { x: w - 300 , y: 10 + (2 * (w * 0.012)) + (i*(boxHeight*1.22)) };
          });
        }

        if(nodes[0].NodeType === "user" && userNodes ) createBoxes();

        const indexWeights = [ 1, 2, 3, 4, 5, 5, 4, 3, 2, 1 ];

        if(nodes[0].NodeType === "search" && userNodes ) {
          userNodes.forEach((house, i) => {
            // console.log(house.centerPoint);
            // house.centerPoint.x = house.centerPoint.x - (15 + (8 * indexWeights[i]));
            // house.centerPoint.y = house.centerPoint.y - ((house.centerPoint.y - (h * 0.5)) * 0.05);
            // { x: w * 0.4, y: h / 2 }
          });
        }
        // function chargeCorrection() {
        //   userNodes.forEach((house, i) => {
        //     console.log(house.centerPoint);
        //     house.centerPoint.x = house.centerPoint.x - (80 + (8 * indexWeights[i]));
        //   });
        // }
        // chargeCorrection();

        // d3.selectAll('rect')
        //   .insert('div', '#circle + *')
        //   // .attr('id', 'second');
        //   .attr('class', 'tooltip')
        //   .text('hello');

        // nodes.forEach(function (n) {
        //   n.centerPoint = target;
        // });
        //
        // svg
        // // .append('svg:div')
        // .append('rect')
        // // .attr('r', 30)
        // .attr('fill', 'red')
        // .attr("width", 150)
        // .attr("height", 40);
        // .attr('class', 'tooltip')
        // .attr("width", 200)
        // .attr("height", 200);


        function moveBubbles() {
          force
            .on('tick', ((e) => { node.each(moveToTarget(e.alpha))
            .attr('cx', function (d) { return d.x; })
            .attr('cy', function (d) { return d.y; });
          })).start();
        }
        moveBubbles();

        function defineTarget(target) {
          nodes.forEach(function (n) {
            n.centerPoint = target;
          });
          moveBubbles();
        }

        function defineMultipleTargets(buttonId) {
          if(nodes[0].NodeType === "search") {
            let unique = nodes.map(n => eval('n.' + buttonId));
            unique = unique.filter((item, i, ar) => {
              return ar.indexOf(item) === i;
            });
            unique.sort(function(a,b){return a - b;});

            console.log(buttonId, unique, unique.length);

            if (unique.length <= 1) {
              nodes.forEach(function (n, i) {
                n.centerPoint = { x: w * 0.3, y: h * 0.5 };
              });
            }

            if (unique.length <= 6) {
              nodes.forEach(function (n, i) {
                // console.log(eval('n.' + buttonId));
                const num = unique.indexOf(eval('n.' + buttonId)) + 1;
                // console.log(num);
                if (num <= 3 ) n.centerPoint = { x: w * num * 0.2, y: h * 0.33 };
                if (num >= 4 ) n.centerPoint = { x: w * (num-3) * 0.2, y: h * 0.66 };
              });
            }

            moveBubbles();

          }
        }

        function moveToTarget(alpha) {
          return function (d) {
            d.x = d.x + (d.centerPoint.x - d.x) * alpha * damper;
            d.y = d.y + (d.centerPoint.y - d.y) * alpha * damper;
          };
        }

        d3.select('#toolbar')
          .selectAll('.button')
          .on('click', function () {
            d3.selectAll('.button').classed('active', false);

            var button = d3.select(this);
            button.classed('active', true);

            var buttonId = button.attr('id');
            if (buttonId === 'All') {
              const target = { x: w / 2, y: h / 2 };
              // const target = { x: w * 0.4, y: h / 2 };
              defineTarget(target);
            } else {
              defineMultipleTargets(buttonId);
            }


        });
      }
    }
  };
}
