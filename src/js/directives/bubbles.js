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

      let target = { x: w * 0.35, y: h * 0.5 }; //center
      let force = null;
      let userNodes = [];
      let nextIndex = null;

      const svg = d3.select(element[0]).append('svg');
      const indexWeights = [ 15, 12, 10, 7, 3, -3, -7, -10, -12, -15, -18, -22];
      let chargeBoolean = false;
      let userSearchBoolean = false;

      svg
        .attr('width', w)
        .attr('height', h);

      scope.$watch('nodes', () => {
        console.log(scope.nodes);
        if(scope.nodes.length > 0) {
          userSearchBoolean = true;
          const total = scope.nodes.reduce((value, d) => {
            return value + parseFloat(d.price);
          }, 0);

          const scaling = d3.scale.linear()
            .domain([0, Math.pow((total / 3.14), 0.5) * 6])
            .range([0, w]);

          const nodes = scope.nodes.map(function (d) {
            if(scope.userdata) target = { x: w * 0.35, y: h * 0.5 };
            else target = { x: w * 0.35, y: h * 0.5 };
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
              NodeType: 'search',
              centerPoint: target,
              indexValue: 'index'
            };
          });

          generate(nodes, 'search');
        }
      }, true);

      scope.$watch('userdata', () => {
        if(scope.userdata.length === 0) svg.selectAll('svg.rectangle').remove();
        if(scope.userdata) {
          userSearchBoolean = false;
          userNodes = scope.userdata.map(function (d, i) {
            return {
              value: d.price,
              r: 14,
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
              NodeType: 'user',
              centerPoint: { x: w * 0.75 , y: h * 0.5 },
              indexValue: 'index' + i
            };
          });

          userNodes = userNodes.sort((a, b) => {
            return (parseInt(a.value) < parseInt(b.value));
          });

          userNodes.forEach((house) => {
            house.value = house.value.toString();
          });

          nextIndex = userNodes.length - 1;
          generate(userNodes, 'user');
        }
      }, true);







      let pageRefreshVar = true;


      function generate(nodes, type) {

        svg.selectAll('svg.title').remove();
        svg.selectAll('circle').remove();


        if(userSearchBoolean && userNodes.length > 0 ) {
          nodes = nodes.concat(userNodes);
          if(pageRefreshVar) chargeCorrection();
          pageRefreshVar = false;
        }

        // function checkTargets() {
        //   if(userNodes.length === 1) target = { x: w * 0.35, y: h * 0.5 };
        //   if (userNodes.length === 0) target = { x: w * 0.5, y: h * 0.5 };
        // }

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
        }

        function updateAddIndex(d) {
          destroyAllBoxes();
          userNodes.push(d);
          userNodes = userNodes.sort((a, b) => {
            return (parseInt(a.value) < parseInt(b.value));
          });
          userNodes.forEach((house, i) => {
            house.value = house.value.toString();
            house.indexValue = 'index' + i;
          });
          createBoxes();
          chargeCorrection();
        }

        function updateDeleteIndex(d) {
          destroyAllBoxes();
          userNodes.splice(parseInt(d.indexValue.substring(5)), 1);
          userNodes.forEach((house, i) => {
            house.indexValue = 'index' + i;
          });
          createBoxes();
          if(userSearchBoolean) chargeCorrection();
        }

        var fillColor = d3.scale.linear()
          .domain([200000,2000000])
          .range(['#1ff2ee','#000080']);

        const node = svg.selectAll('circle')
          .filter(function(d) { return d.NodeType === type; })
          .data(force.nodes())
          .enter()
          .append('circle')
          .attr('opacity', '0.7')
          .attr('fill', d => (fillColor(d.value)))
          .attr('r', d => (d.r))
          .attr('id', d => ('circle' + d.Id))
          .on('click', function (d) {
            if ( d.NodeType === 'search') {
              scope.addProperty({ item: d });
              d.centerPoint = { x: w * 0.75, y: h * 0.5};
              d.r = 14;
              d.NodeType = 'user';
              updateAddIndex(d);
              bunchTogetherAndReset(target);
            } else {
              scope.removeProperty({ item: d });
              d.centerPoint.x = w + 300;
              updateDeleteIndex(d);
              setTimeout(() => {
                d3.select(`${'#circle' + d.Id}`).remove();
              }, 300);
              moveBubbles();
            }



            svg.select('circle#circle' + d.Id)
              .transition()
              .duration(2500)
              .attr('r', function(){
                return 14;
              });

          });

        const boxHeight = (h * 0.08);

        function destroyAllBoxes() {
          svg.selectAll('svg.rectangle').remove();
        }

        function createBoxes() {
          userNodes.forEach((house, i) => {

            const g = svg.append('svg')
            .attr('x', w - 260)
            .attr('y', 10 + (i* (boxHeight * 1.22)))
            .attr('width', 250)
            .attr('height', boxHeight )
            .attr('class', 'rectangle')
            .on('click',function(){
              window.open(house.Url,'_blank');
            })
            .on('mouseover', function(d) {
              d3.select(this).selectAll('rect').attr('fill', 'rgb(234, 234, 234)');
            })
            .on('mouseout', function(d) {
              d3.select(this).selectAll('rect').attr('fill', 'rgb(242, 242, 242)');
            })
            .attr("id", 'index' + i);

            const rect = g.append('rect')
            .attr("width", 250)
            .attr("height", boxHeight )
            .attr('fill', 'rgb(242, 242, 242)');

            g.append('text')
            .text(house.Address)
            .attr("x", 10)
            .attr("y", 20)
            // .attr("font-size", w * 0.01);
            .attr("font-size", 11);

            g.append('text')
            .text('BEDS: ' + house.Bedrooms +' BATHS: ' + house.Bathrooms)
            .attr("x", 10)
            .attr("y", 40)
            .attr("font-size", 11);

            g.append('text')
            .text('£' + parseInt(house.value).toLocaleString())
            .attr("x", 240)
            .attr("y", 40)
            .attr("fill", 'dodgerblue')
            .attr("font-size", 11)
            .style("text-anchor","end");

            defineUserNodeTargets(house, i);
          });
        }

        if(nodes[0].NodeType === 'user' && userNodes ) createBoxes();


        function defineUserNodeTargets(house, i) {
          house.centerPoint = { x: w - 300 , y: 10 + (2 * 14) + (i*(boxHeight*1.22)) };
        }

        function chargeCorrection() {
          userNodes.forEach((house, i) => {
            house.centerPoint.x = house.centerPoint.x - (80);
            house.centerPoint.y = house.centerPoint.y + indexWeights[i];
          });
        }

        function showTitles(unique, titles) {

          svg.selectAll('svg.title').remove();

          unique.forEach((title, i) => {
            let filteredNodes = nodes.filter(( house, x ) => {
              if (titles === 'Bedrooms' && house.Bedrooms === title && house.NodeType === 'search') return house;
              if (titles === 'Bathrooms' && house.Bathrooms === title && house.NodeType === 'search') return house;
            });

            const topHouse = filteredNodes.reduce((topHouse, house) => {
              if( house.y < topHouse.y ) return house;
              else return topHouse;
            }, { y: 10000 });

            const g = svg.append('svg')
            .attr("class", 'title')
            .attr("x", topHouse.x - 50)
            .attr("y", topHouse.y - topHouse.r - 30)
            .attr("width", 100)
            .attr("height", 30 );

            g.append('text')
            .text(unique[i] + ' ' + titles)
            .attr("x", 50)
            .attr("y", 15)
            .attr('fill', 'black')
            .style("text-transform", 'uppercase')
            .style("text-anchor","middle")
            .attr("font-size", 11);
          });
        }



        function moveBubbles() {
          force
            .on('tick', ((e) => { node.each(moveToTarget(e.alpha))
            .attr('cx', function (d) { return d.x; })
            .attr('cy', function (d) { return d.y; });
          })).start();
        }
        moveBubbles();

        function bunchTogetherAndReset(target) {
          nodes.forEach(function (n) {
            n.centerPoint = target;
          });
          svg.selectAll('svg.title').remove();
          createBoxes();
          chargeCorrection();
          moveBubbles();
        }

        function defineMultipleTargets(buttonId) {

          if(userSearchBoolean) {

            let unique = nodes.reduce((result, n ) => {
              if(n.NodeType === 'search') result.push(eval('n.' + buttonId));
              return result;
            }, []);

            unique = unique.filter((item, i, ar) => {
              return ar.indexOf(item) === i;
            });

            unique.sort(function(a,b){return a - b;});

            if (unique.length <= 1) {
              nodes.forEach(function (n, i) {
                n.centerPoint = target;
              });
            } else if (unique.length <= 6) {
              nodes.forEach(function (n, i) {
                const num = unique.indexOf(eval('n.' + buttonId)) + 1;
                if (num <= 3 ) n.centerPoint = { x: w * num * 0.25, y: h * 0.33 };
                else n.centerPoint = { x: w * (num-3) * 0.25, y: h * 0.66 };
              });
            } else if (unique.length <= 9 ){
              nodes.forEach(function (n, i) {
                const num = unique.indexOf(eval('n.' + buttonId)) + 1;
                if (num <= 3 ) n.centerPoint = { x: w * num * 0.25, y: h * 0.28 };
                else if (num <= 6 ) n.centerPoint = { x: w * (num-3) * 0.25, y: h * 0.5 };
                else n.centerPoint = { x: w * (num-6) * 0.25, y: h * 0.72 };
              });
            } else {
              nodes.forEach(function (n, i) {
                const num = unique.indexOf(eval('n.' + buttonId)) + 1;
                if (num <= 4 ) n.centerPoint = { x: w * num * 0.2, y: h * 0.28 };
                else if (num <= 8 ) n.centerPoint = { x: w * (num-4) * 0.2, y: h * 0.5 };
                else n.centerPoint = { x: w * (num-8) * 0.2, y: h * 0.72 };
              });
            }

            userNodes.forEach(function (n, i) {
              defineUserNodeTargets(i);
              n.centerPoint = { x: w * 1.1, y: h * 0.5 };
            });

            setTimeout(() => showTitles(unique, buttonId), 600);

            destroyAllBoxes();
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

            const buttonId = d3.select(this)
              .classed('active', true)
              .attr('id');

            if (buttonId === 'All') {
              bunchTogetherAndReset(target);
            } else {
              defineMultipleTargets(buttonId);
            }
          });

      }
    }
  };
}
