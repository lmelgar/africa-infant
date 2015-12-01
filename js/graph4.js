    var width_graph4 = 800;
    var height_graph4 = 450;

    var margin_graph4 = { top: 20, right: 10, bottom: 60, left: 80 };
    var dotRadius = 5;

    var xScale_graph4 = d3.scale.linear()
              .range([ margin_graph4.left, width_graph4 - margin_graph4.right - margin_graph4.left])

    var yScale_graph4 = d3.scale.linear()
              .range([ height_graph4 - margin_graph4.bottom, margin_graph4.top ])

    var xAxis_graph4 = d3.svg.axis()
            .scale(xScale_graph4)
            .orient("bottom")
            .ticks(6);

    var yAxis_graph4 = d3.svg.axis()
            .scale(yScale_graph4)
            .orient("left")
            .ticks(6);

    var svg_graph4 = d3.select("#graph4")
          .append("svg")
          .attr("width", width_graph4)
          .attr("height", height_graph4);


    var tooltip_graph4 = d3.select("#graph4")
           .append("div")
           .attr("class", "tooltip_graph4");



    d3.csv("data/water.csv", function(data) {
      console.log(data);

            xScale_graph4.domain(d3.extent(data, function(d){
                return + d.Total_drinking;
              }));
            yScale_graph4.domain(d3.extent(data, function(d){
                return + d.rate;
              }));

      var circles = svg_graph4.selectAll("circle")
                 .data(data)
                 .enter()
                 .append("circle")
                 .attr("class", "circle");

      circles.attr("cx", function(d) {
          return + xScale_graph4(+d.Total_drinking);
        })
        .attr("cy", function(d) {
          return + yScale_graph4(+d.rate);
        })
        .attr("r", dotRadius)
        .attr("fill", function(d) {

            if (d.country === "Angola") {
              return "#B574B5";
            }

            else {
              return "#FCE4C2";
            }

        })
        .style('cursor','pointer');

      circles.sort(function(a, b) {
          return d3.ascending(+a.rate, +b.rate);
        })
          .transition()
          .delay(function(d, i) {
            return i * 10;
        })
          .duration(500);

        circles
          	.on("mousemove", mousemoveFunc_graph4)
          	.on("mouseout", mouseoutFunc_graph4);

      svg_graph4.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height_graph4 - margin_graph4.bottom + 10) + ")")
        .call(xAxis_graph4);

      svg_graph4.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (margin_graph4.left - 10) + ",0)")
        .call(yAxis_graph4);

      svg_graph4.append("text")
        .attr("class", "ylabel")
        .attr("y", margin_graph4.left/8 + 5)
                  .attr("x", 0 - height_graph4 /3.4)
        .style("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Under 5 Mortality Rate (per thousand births)")
        .attr("font-family", "Open Sans");

  var xlabel = svg_graph4.append("text")
        .attr("class", "xlabel")
        .attr("transform", "translate(" + (width_graph4 / 1.32) + " ," +
              (height_graph4 - 15) + ")")
        .style("text-anchor", "middle")
        .attr("dy", "12")
        .text("Population using improved drinking-water (%)")
        .attr("font-family", "Open Sans");

        d3.select("#drinking").on("click", function() {


         yScale_graph4
            .domain(d3.extent(data, function(d){
            return + d.rate;
                      }));
          svg_graph4.select(".y.axis")
              .transition()
              .duration(2000)
              .call(yAxis_graph4);

          circles
            .transition()
            .duration(2000)
            .attr("cx", function(d) {
              return xScale_graph4(+d.Total_drinking);

            })
            .attr("cy", function(d) {
              return yScale_graph4(+d.rate);
            });

      circles
      			.on("mouseover", mouseoverFunc_graph4)

            function mouseoverFunc_graph4(d) {
              d3.select(this)
                .transition()
                .attr("r", 6)
              tooltip_graph4
              .style("display", null)
              .html("<p>" + "<span>" + d.country + "</span>" +
                    "<br>Infant mortality rate: " + "<span>" + d3.format("s")(d.rate) + "</span>" +
                    "<br>Population using improved drinking-water: <span>%" + d.Total_drinking + "</span>" + "</p>");
              d3.selectAll("circle").classed("unfocused", true);
                    d3.select(this).select("circle").classed("unfocused", false).classed("focused", true);
              };

          xlabel
               .text("Population using improved drinking-water (%)")
               .transition()
               .duration(2000)
               .call(xlabel);


        });

        d3.select("#sanitation").on("click", function() {


          yScale_graph4
            .domain(d3.extent(data, function(d){
            return + d.rate;
                      }));
          svg_graph4.select(".y.axis")
              .transition()
              .duration(2000)
              .call(yAxis_graph4);

          circles
            .transition()
            .duration(2000)
            .attr("cx", function(d) {
              return xScale_graph4(+d.Total_sanitation);

            })
            .attr("cy", function(d) {
              return yScale_graph4(+d.rate);
            });

          circles
                 .on("mouseover", mouseoverFunc_graph4)

      function mouseoverFunc_graph4(d) {
        d3.select(this)
          .transition()
          .attr("r", 6)
          .attr("fill-opacity", 1)
        tooltip_graph4
        .style("display", null)
        .html("<p>" + "<span>" + d.country + "</span>" +
              "<br>Infant mortality rate: " + "<span>" + d3.format("s")(d.rate) + "</span>" +
              "<br>Population using improved sanitation-water: <span>%" + d.Total_sanitation + "</span>" + "</p>");
        d3.selectAll("circle").classed("unfocused", true);
              d3.select(this).select("circle").classed("unfocused", false).classed("focused", true);
        };

        xlabel
               .text("Population using improved sanitation-water (%)")
               .transition()
               .duration(2000)
               .call(xlabel);

        });



        d3.select("#rural").on("click", function() {


          yScale_graph4
            .domain(d3.extent(data, function(d){
            return + d.rate;
                      }));
          svg_graph4.select(".y.axis")
              .transition()
              .duration(2000)
              .call(yAxis_graph4);

          circles
            .transition()
            .duration(2000)
            .attr("cx", function(d) {
              return xScale_graph4(+d.rural_pop);

            })
            .attr("cy", function(d) {
              return yScale_graph4(+d.rate);
            });

          circles
                 .on("mouseover", mouseoverFunc_graph4)

      function mouseoverFunc_graph4(d) {
        d3.select(this)
          .transition()
          .attr("r", 6)
          .attr("fill-opacity", 1)
        tooltip_graph4
        .style("display", null)
        .html("<p>" + "<span>" + d.country + "</span>" +
              "<br>Infant mortality rate: " + "<span>" + d3.format("s")(d.rate) + "</span>" +
              "<br>Population living in rural areas: <span>%" + d.rural_pop + "</span>" + "</p>");
        d3.selectAll("circle").classed("unfocused", true);
              d3.select(this).select("circle").classed("unfocused", false).classed("focused", true);
        };

        xlabel
               .text("Population living in rural areas (%)")
               .transition()
               .duration(2000)
               .call(xlabel);

        });


    });

    function mousemoveFunc_graph4(d) {

      return tooltip_graph4
        .style("top", (d3.event.pageY - 10) + "px" )
        .style("left", (d3.event.pageX + 10) + "px");
    }
    function mouseoutFunc_graph4(d) {
      d3.select(this)
						 .transition()
						 .attr("r", 5);
      return tooltip_graph4.style("display", "none");
    }
