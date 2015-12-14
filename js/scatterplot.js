(function(){

  var width = 650;
  var height = 450;

  var margin = { top: 20, right: 10, bottom: 60, left: 80 };
  var dotRadius = 5;

  var xScale = d3.scale.linear()
  .range([ margin.left, width - margin.right - margin.left])

  var yScale = d3.scale.linear()
  .range([ height - margin.bottom, margin.top ])

  var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom")
  .ticks(6);

  var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left")
  .ticks(6);

  var svg = d3.select("#graph4")
  .append("svg")
  .attr("width", width)
  .attr("height", height);


  var tooltip = d3.select("body")
  .append("div")
  .attr("class", "tooltip_scatter");



  d3.csv("data/water.csv", function(data) {
    console.log(data);

    xScale.domain(d3.extent(data, function(d){
      return + d.Total_drinking;
    }));
    yScale.domain(d3.extent(data, function(d){
      return + d.rate;
    }));

    d3.select("p#p1").style("display", "none");
    d3.select("p#p2").style("display", "none");
    d3.select("p#p3").style("display", "none");
    d3.select("p#p4").style("display", "none");
    d3.select("p#p5").style("display", "none");
    d3.select("p#p6").style("display", "none");
    d3.select("p#p7").style("display", "none");
    d3.select("p#p8").style("display", "none");
    d3.select("p#p9").style("display", "none");
    d3.select("p#p10").style("display", "none");
    d3.select("p#p11").style("display", "none");


    var circles = svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dots");

    circles.attr("cx", function(d) {
      return + xScale(+d.rural_pop);
    })
    .attr("cy", function(d) {
      return + yScale(+d.rate);
    })
    .attr("r", dotRadius)
    .attr("fill", "#BFBFBF")
    .style('cursor','pointer');

    circles.sort(function(a, b) {
      return d3.ascending(+a.rate, +b.rate);
    })
    .transition()
    .delay(function(d, i) {
      return i * 10;
    })
    .duration(500);

    circles.filter(function(d){
    					return "d.cy" == null;
    					console.log(d);
    				}).remove();

    circles
    .on("mousemove", mousemoveFunc)
    .on("mouseout", mouseoutFunc);

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (height - margin.bottom + 10) + ")")
    .call(xAxis);

    svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + (margin.left - 10) + ",0)")
    .call(yAxis);

    svg.append("text")
    .attr("class", "ylabel")
    .attr("y", margin.left/8 + 5)
    .attr("x", 0 - height /3.4)
    .style("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Under 5 Mortality Rate (per thousand births)")
    .attr("font-family", "Open Sans");

    var xlabel = svg.append("text")
    .attr("class", "xlabel")
    .attr("transform", "translate(" + (width / 1.32) + " ," +
    (height - 15) + ")")
    .style("text-anchor", "middle")
    .attr("dy", "12")
    .text("Population using improved drinking-water (%)")
    .attr("font-family", "Open Sans");


    d3.select("#urbanrural").on("click", function() {


      d3.select("p#p1").style("display", "inline");
      d3.select("p#p2").style("display", "none");
      d3.select("p#p3").style("display", "none");
      d3.select("p#p4").style("display", "none");
      d3.select("p#p5").style("display", "none");
      d3.select("p#p6").style("display", "none");
      d3.select("p#p7").style("display", "none");
      d3.select("p#p8").style("display", "none");
      d3.select("p#p9").style("display", "none");
      d3.select("p#p10").style("display", "none");
      d3.select("p#p11").style("display", "none");

      xScale
      .domain(d3.extent(data, function(d){
        return +d.rural_pop;
      }));

      svg.select(".x.axis")
      .transition()
      .duration(2000)
      .call(xAxis);

      yScale
      .domain(d3.extent(data, function(d){
        return +d.rate;
      }));
      svg.select(".y.axis")
      .transition()
      .duration(2000)
      .call(yAxis);

      circles
      .transition()
      .duration(2000)
      .attr("cx", function(d) {
        return xScale(+d.rural_pop);

      })
      .attr("cy", function(d) {
        return yScale(+d.rate);
      })
      .attr("fill", function(d) {

        if (d.region === "Sub-Saharan Africa") {
          return "RGB(222,102,0)";
        }

        else {
          return "#BFBFBF";
        }

      });

      circles.filter(function(d){
                return "d.cy" == null;
                console.log(d);
              }).remove();

      circles
      .on("mouseover", mouseoverFunc)

      function mouseoverFunc(d) {
        d3.select(this)
        .transition()
        .attr("r", 6)
        tooltip
        .style("display", null)
        .html("<p>" + "<strong>" + d.country + "</strong>" +
        "<br>Infant mortality rate: " + "<strong>" + d3.format("s")(d.rate) + "</strong>" +
        "<br>Population using improved drinking-water: <strong>" + d.rural_pop + "%</strong>" + "</p>");
        d3.selectAll("circle").classed("unfocused", true);
        d3.select(this).select("circle").classed("unfocused", false).classed("focused", true);
      };

      xlabel
      .text("Population using improved drinking-water (%)")
      .transition()
      .duration(2000)
      .call(xlabel);


    });

    d3.select("#ruraldrinking").on("click", function() {


      d3.select("p#p2").style("display", "inline");
      d3.select("p#p1").style("display", "none");
      d3.select("p#p3").style("display", "none");
      d3.select("p#p4").style("display", "none");
      d3.select("p#p5").style("display", "none");
      d3.select("p#p6").style("display", "none");
      d3.select("p#p7").style("display", "none");
      d3.select("p#p8").style("display", "none");
      d3.select("p#p9").style("display", "none");
      d3.select("p#p10").style("display", "none");
      d3.select("p#p11").style("display", "none");

      xScale
      .domain(d3.extent(data, function(d){
        return +d.Rural_drinking;
      }));

      svg.select(".x.axis")
      .transition()
      .duration(2000)
      .call(xAxis);

      yScale
      .domain(d3.extent(data, function(d){
        return + d.rate;
      }));
      svg.select(".y.axis")
      .transition()
      .duration(2000)
      .call(yAxis);

      svg.select(".x.axis")
      .transition()
      .duration(2000)
      .call(xAxis);

      circles
      .transition()
      .duration(2000)
      .attr("cx", function(d) {
        return xScale(+d.Rural_drinking);

      })
      .attr("cy", function(d) {
        return yScale(+d.rate);
      })
      .attr("fill", function(d) {

        if (d.region === "Sub-Saharan Africa") {
          return "RGB(222,102,0)";
        }

        else {
          return "#BFBFBF";
        }

      });

      circles.filter(function(d){
                return "d.cy" == null;
                console.log("que es esto", d);
              }).remove();

      circles
      .on("mouseover", mouseoverFunc)

      function mouseoverFunc(d) {
        d3.select(this)
        .transition()
        .attr("r", 6)
        tooltip
        .style("display", null)
        .html("<p>" + "<strong>" + d.country + "</strong>" +
        "<br>Infant mortality rate: " + "<strong>" + d3.format("s")(d.rate) + "</strong>" +
        "<br>Population using improved drinking-water: <strong>" + d.Rural_drinking + "%</strong>" + "</p>");
        d3.selectAll("circle").classed("unfocused", true);
        d3.select(this).select("circle").classed("unfocused", false).classed("focused", true);
      };

      xlabel
      .text("Population using improved drinking-water (%)")
      .transition()
      .duration(2000)
      .call(xlabel);


    });


    d3.select("#urbandrinking").on("click", function() {

      d3.select("p#p3").style("display", "inline");
      d3.select("p#p1").style("display", "none");
      d3.select("p#p2").style("display", "none");
      d3.select("p#p4").style("display", "none");
      d3.select("p#p5").style("display", "none");
      d3.select("p#p6").style("display", "none");
      d3.select("p#p7").style("display", "none");
      d3.select("p#p8").style("display", "none");
      d3.select("p#p9").style("display", "none");
      d3.select("p#p10").style("display", "none");
      d3.select("p#p11").style("display", "none");

      xScale
      .domain(d3.extent(data, function(d){
        return +d.Urban_drinking;
      }));

      svg.select(".x.axis")
      .transition()
      .duration(2000)
      .call(xAxis);

      yScale
      .domain(d3.extent(data, function(d){
        return + d.rate;
      }));
      svg.select(".y.axis")
      .transition()
      .duration(2000)
      .call(yAxis);

      svg.select(".x.axis")
      .transition()
      .duration(2000)
      .call(xAxis);

      circles
      .transition()
      .duration(2000)
      .attr("cx", function(d) {
        return xScale(+d.Urban_drinking);

      })
      .attr("cy", function(d) {
        return yScale(+d.rate);
      })
      .attr("fill", function(d) {

        if (d.region === "Sub-Saharan Africa") {
          return "RGB(222,102,0)";
        }

        else {
          return "#BFBFBF";
        }

      });

      circles
      .on("mouseover", mouseoverFunc)

      function mouseoverFunc(d) {
        d3.select(this)
        .transition()
        .attr("r", 6)
        .attr("fill-opacity", 1)
        tooltip
        .style("display", null)
        .html("<p>" + "<strong>" + d.country + "</strong>" +
        "<br>Infant mortality rate: " + "<strong>" + d3.format("s")(d.rate) + "</strong>" +
        "<br>Population using improved drinking-water: <strong>" + d.Urban_drinking + "%</strong>" + "</p>");
        d3.selectAll("circle").classed("unfocused", true);
        d3.select(this).select("circle").classed("unfocused", false).classed("focused", true);
      };

      xlabel
      .text("Population using improved sanitation-water (%)")
      .transition()
      .duration(2000)
      .call(xlabel);

    });

    d3.select("#ruralsanitation").on("click", function() {

      d3.select("p#p5").style("display", "inline");
      d3.select("p#p1").style("display", "none");
      d3.select("p#p2").style("display", "none");
      d3.select("p#p3").style("display", "none");
      d3.select("p#p4").style("display", "none");
      d3.select("p#p6").style("display", "none");
      d3.select("p#p7").style("display", "none");
      d3.select("p#p8").style("display", "none");
      d3.select("p#p9").style("display", "none");
      d3.select("p#p10").style("display", "none");
      d3.select("p#p11").style("display", "none");

      xScale
      .domain(d3.extent(data, function(d){
        return +d.Urban_drinking;
      }));

      svg.select(".x.axis")
      .transition()
      .duration(2000)
      .call(xAxis);

      yScale
      .domain(d3.extent(data, function(d){
        return + d.rate;
      }));
      svg.select(".y.axis")
      .transition()
      .duration(2000)
      .call(yAxis);


      circles
      .transition()
      .duration(2000)
      .attr("cx", function(d) {
        return xScale(+d.Rural_sanitation);

      })
      .attr("cy", function(d) {
        return yScale(+d.rate);
      })
      .attr("fill", function(d) {

        if (d.region === "Sub-Saharan Africa") {
          return "RGB(222,102,0)";
        }

        else {
          return "#BFBFBF";
        }

      });

      circles
      .on("mouseover", mouseoverFunc)

      function mouseoverFunc(d) {
        d3.select(this)
        .transition()
        .attr("r", 6)
        .attr("fill-opacity", 1)
        tooltip
        .style("display", null)
        .html("<p>" + "<strong>" + d.country + "</strong>" +
        "<br>Infant mortality rate: " + "<strong>" + d3.format("s")(d.rate) + "</strong>" +
        "<br>Population in rural areas <br>with access to improved sanitation: <strong>" + d.Rural_sanitation + "%</strong>" + "</p>");
        d3.selectAll("circle").classed("unfocused", true);
        d3.select(this).select("circle").classed("unfocused", false).classed("focused", true);
      };

      xlabel
      .text("Population using improved sanitation-water (%)")
      .transition()
      .duration(2000)
      .call(xlabel);

    });



    d3.select("#urbansanitation").on("click", function() {

      d3.select("p#p4").style("display", "inline");
      d3.select("p#p1").style("display", "none");
      d3.select("p#p2").style("display", "none");
      d3.select("p#p3").style("display", "none");
      d3.select("p#p6").style("display", "none");
      d3.select("p#p5").style("display", "none");
      d3.select("p#p7").style("display", "none");
      d3.select("p#p8").style("display", "none");
      d3.select("p#p9").style("display", "none");
      d3.select("p#p10").style("display", "none");
      d3.select("p#p11").style("display", "none");

      xScale
      .domain(d3.extent(data, function(d){
        return +d.Urban_sanitation;
      }));

      svg.select(".x.axis")
      .transition()
      .duration(2000)
      .call(xAxis);

      yScale
      .domain(d3.extent(data, function(d){
        return + d.rate;
      }));
      svg.select(".y.axis")
      .transition()
      .duration(2000)
      .call(yAxis);


      circles
      .transition()
      .duration(2000)
      .attr("cx", function(d) {
        return xScale(+d.Urban_sanitation);

      })
      .attr("cy", function(d) {
        return yScale(+d.rate);
      })
      .attr("fill", function(d) {

        if (d.region === "Sub-Saharan Africa") {
          return "RGB(222,102,0)";
        }

        else {
          return "#BFBFBF";
        }

      });

      circles
      .on("mouseover", mouseoverFunc)

      function mouseoverFunc(d) {
        d3.select(this)
        .transition()
        .attr("r", 6)
        .attr("fill-opacity", 1)
        tooltip
        .style("display", null)
        .html("<p>" + "<strong>" + d.country + "</strong>" +
        "<br>Infant mortality rate: " + "<strong>" + d3.format("s")(d.rate) + "</strong>" +
        "<br>Population living in rural areas: <strong>" + d.Urban_sanitation + "%</strong>" + "</p>");
        d3.selectAll("circle").classed("unfocused", true);
        d3.select(this).select("circle").classed("unfocused", false).classed("focused", true);
      };

      xlabel
      .text("Population living in rural areas (%)")
      .transition()
      .duration(2000)
      .call(xlabel);

    });


    d3.select("#ors1").on("click", function() {

      d3.select("p#p6").style("display", "inline");
      d3.select("p#p1").style("display", "none");
      d3.select("p#p2").style("display", "none");
      d3.select("p#p3").style("display", "none");
      d3.select("p#p4").style("display", "none");
      d3.select("p#p5").style("display", "none");
      d3.select("p#p7").style("display", "none");
      d3.select("p#p8").style("display", "none");
      d3.select("p#p9").style("display", "none");
      d3.select("p#p10").style("display", "none");
      d3.select("p#p11").style("display", "none");

      xScale.domain(d3.extent(data, function(d){
        return + d.ors_male;
      }));

      svg.select(".x.axis")
      .transition()
      .duration(2000)
      .call(xAxis);

      yScale.domain(d3.extent(data, function(d){
        return + d.ors_female;
      }));

      svg.select(".y.axis")
      .transition()
      .duration(2000)
      .call(yAxis);

      circles
      .transition()
      .duration(2000)
      .attr("cx", function(d) {
        return xScale(+d.ors_male);

      })
      .attr("cy", function(d) {
        return yScale(+d.ors_female);
      })
      .attr("fill", function(d) {

        if (d.region === "Sub-Saharan Africa") {
          return "RGB(222,102,0)";
        }

        else {
          return "#BFBFBF";
        }

      });

      circles
      .on("mouseover", mouseoverFunc)

      function mouseoverFunc(d) {
        d3.select(this)
        .transition()
        .attr("r", 6)
        .attr("fill-opacity", 1)
        tooltip
        .style("display", null)
        .html("<p>" + "<strong>" + d.country + "</strong>" +
        "<br>Infant mortality rate: " + "<strong>" + d3.format("s")(d.ors_female) + "</strong>" +
        "<br>Population living in rural areas: <strong>" + d.ors_male + "%</strong>" + "</p>");
        d3.selectAll("circle").classed("unfocused", true);
        d3.select(this).select("circle").classed("unfocused", false).classed("focused", true);
      };

      xlabel
      .text("Population living in rural areas (%)")
      .transition()
      .duration(2000)
      .call(xlabel);

    });

    d3.select("#ors2").on("click", function() {

      d3.select("p#p7").style("display", "inline");
      d3.select("p#p1").style("display", "none");
      d3.select("p#p2").style("display", "none");
      d3.select("p#p3").style("display", "none");
      d3.select("p#p4").style("display", "none");
      d3.select("p#p5").style("display", "none");
      d3.select("p#p6").style("display", "none");
      d3.select("p#p8").style("display", "none");
      d3.select("p#p9").style("display", "none");
      d3.select("p#p10").style("display", "none");
      d3.select("p#p11").style("display", "none");


      xScale.domain(d3.extent(data, function(d){
        return + d.ors_urban;
      }));

      svg.select(".x.axis")
      .transition()
      .duration(2000)
      .call(xAxis);

      yScale.domain(d3.extent(data, function(d){
        return + d.ors_rural;
      }));

      svg.select(".y.axis")
      .transition()
      .duration(2000)
      .call(yAxis);

      circles
      .transition()
      .duration(2000)
      .attr("cx", function(d) {
        return xScale(+d.ors_urban);

      })
      .attr("cy", function(d) {
        return yScale(+d.ors_rural);
      })
      .attr("fill", function(d) {

        if (d.region === "Sub-Saharan Africa") {
          return "RGB(222,102,0)";
        }

        else {
          return "#BFBFBF";
        }

      });

      circles
      .on("mouseover", mouseoverFunc)

      function mouseoverFunc(d) {
        d3.select(this)
        .transition()
        .attr("r", 6)
        .attr("fill-opacity", 1)
        tooltip
        .style("display", null)
        .html("<p>" + "<strong>" + d.country + "</strong>" +
        "<br>Infant mortality rate: " + "<strong>" + d3.format("s")(d.ors_rural) + "</strong>" +
        "<br>Population living in rural areas: <strong>" + d.ors_urban + "%</strong>" + "</p>");
        d3.selectAll("circle").classed("unfocused", true);
        d3.select(this).select("circle").classed("unfocused", false).classed("focused", true);
      };

      xlabel
      .text("Population living in rural areas (%)")
      .transition()
      .duration(2000)
      .call(xlabel);

    });

    d3.select("#ors3").on("click", function() {

      d3.select("p#p8").style("display", "inline");
      d3.select("p#p1").style("display", "none");
      d3.select("p#p2").style("display", "none");
      d3.select("p#p3").style("display", "none");
      d3.select("p#p4").style("display", "none");
      d3.select("p#p5").style("display", "none");
      d3.select("p#p6").style("display", "none");
      d3.select("p#p7").style("display", "none");
      d3.select("p#p9").style("display", "none");
      d3.select("p#p10").style("display", "none");
      d3.select("p#p11").style("display", "none");

      xScale.domain(d3.extent(data, function(d){
        return + d.ors_rich;
      }));

      svg.select(".x.axis")
      .transition()
      .duration(2000)
      .call(xAxis);

      yScale.domain(d3.extent(data, function(d){
        return + d.ors_poor;
      }));

      svg.select(".y.axis")
      .transition()
      .duration(2000)
      .call(yAxis);

      circles
      .transition()
      .duration(2000)
      .attr("cx", function(d) {
        return xScale(+d.ors_rich);

      })
      .attr("cy", function(d) {
        return yScale(+d.ors_poor);
      })
      .attr("fill", function(d) {

        if (d.region === "Sub-Saharan Africa") {
          return "RGB(222,102,0)";
        }

        else {
          return "#BFBFBF";
        }

      });

      circles
      .on("mouseover", mouseoverFunc)

      function mouseoverFunc(d) {
        d3.select(this)
        .transition()
        .attr("r", 6)
        .attr("fill-opacity", 1)
        tooltip
        .style("display", null)
        .html("<p>" + "<strong>" + d.country + "</strong>" +
        "<br>Infant mortality rate: " + "<strong>" + d3.format("s")(d.ors_poor) + "</strong>" +
        "<br>Population living in rural areas: <strong>" + d.ors_rich + "%</strong>" + "</p>");
        d3.selectAll("circle").classed("unfocused", true);
        d3.select(this).select("circle").classed("unfocused", false).classed("focused", true);
      };

      xlabel
      .text("Population living in rural areas (%)")
      .transition()
      .duration(2000)
      .call(xlabel);

    });


    d3.select("#ors4").on("click", function() {

      d3.select("p#p9").style("display", "inline");
      d3.select("p#p1").style("display", "none");
      d3.select("p#p2").style("display", "none");
      d3.select("p#p3").style("display", "none");
      d3.select("p#p4").style("display", "none");
      d3.select("p#p5").style("display", "none");
      d3.select("p#p6").style("display", "none");
      d3.select("p#p7").style("display", "none");
      d3.select("p#p8").style("display", "none");
      d3.select("p#p10").style("display", "none");
      d3.select("p#p11").style("display", "none");


      xScale.domain(d3.extent(data, function(d){
        return + d.pneu_male;
      }));

      svg.select(".x.axis")
      .transition()
      .duration(2000)
      .call(xAxis);

      yScale.domain(d3.extent(data, function(d){
        return + d.pneu_female;
      }));

      svg.select(".y.axis")
      .transition()
      .duration(2000)
      .call(yAxis);

      circles
      .transition()
      .duration(2000)
      .attr("cx", function(d) {
        return xScale(+d.pneu_male);

      })
      .attr("cy", function(d) {
        return yScale(+d.pneu_female);
      })
      .attr("fill", function(d) {

        if (d.region === "Sub-Saharan Africa") {
          return "RGB(222,102,0)";
        }

        else {
          return "#BFBFBF";
        }

      });

      circles
      .on("mouseover", mouseoverFunc)

      function mouseoverFunc(d) {
        d3.select(this)
        .transition()
        .attr("r", 6)
        .attr("fill-opacity", 1)
        tooltip
        .style("display", null)
        .html("<p>" + "<strong>" + d.country + "</strong>" +
        "<br>Infant mortality rate: " + "<strong>" + d3.format("s")(d.pneu_female) + "</strong>" +
        "<br>Population living in rural areas: <strong>" + d.pneu_male + "%</strong>" + "</p>");
        d3.selectAll("circle").classed("unfocused", true);
        d3.select(this).select("circle").classed("unfocused", false).classed("focused", true);
      };

      xlabel
      .text("Population living in rural areas (%)")
      .transition()
      .duration(2000)
      .call(xlabel);

    });

    d3.select("#ors5").on("click", function() {

      d3.select("p#p10").style("display", "inline");
      d3.select("p#p1").style("display", "none");
      d3.select("p#p2").style("display", "none");
      d3.select("p#p3").style("display", "none");
      d3.select("p#p4").style("display", "none");
      d3.select("p#p5").style("display", "none");
      d3.select("p#p6").style("display", "none");
      d3.select("p#p7").style("display", "none");
      d3.select("p#p8").style("display", "none");
      d3.select("p#p9").style("display", "none");
      d3.select("p#p11").style("display", "none");

      xScale.domain(d3.extent(data, function(d){
        return + d.pneu_urban;
      }));

      svg.select(".x.axis")
      .transition()
      .duration(2000)
      .call(xAxis);

      yScale.domain(d3.extent(data, function(d){
        return + d.pneu_rural;
      }));

      svg.select(".y.axis")
      .transition()
      .duration(2000)
      .call(yAxis);

      circles
      .transition()
      .duration(2000)
      .attr("cx", function(d) {
        return xScale(+d.pneu_urban);

      })
      .attr("cy", function(d) {
        return yScale(+d.pneu_rural);
      })
      .attr("fill", function(d) {

        if (d.region === "Sub-Saharan Africa") {
          return "RGB(222,102,0)";
        }

        else {
          return "#BFBFBF";
        }

      });

      circles
      .on("mouseover", mouseoverFunc)

      function mouseoverFunc(d) {
        d3.select(this)
        .transition()
        .attr("r", 6)
        .attr("fill-opacity", 1)
        tooltip
        .style("display", null)
        .html("<p>" + "<strong>" + d.country + "</strong>" +
        "<br>Infant mortality rate: " + "<strong>" + d3.format("s")(d.pneu_rural) + "</strong>" +
        "<br>Population living in rural areas: <strong>" + d.pneu_urban + "%</strong>" + "</p>");
        d3.selectAll("circle").classed("unfocused", true);
        d3.select(this).select("circle").classed("unfocused", false).classed("focused", true);
      };

      xlabel
      .text("Population living in rural areas (%)")
      .transition()
      .duration(2000)
      .call(xlabel);

    });


    d3.select("#ors6").on("click", function() {

      d3.select("p#p11").style("display", "inline");
      d3.select("p#p1").style("display", "none");
      d3.select("p#p2").style("display", "none");
      d3.select("p#p3").style("display", "none");
      d3.select("p#p4").style("display", "none");
      d3.select("p#p5").style("display", "none");
      d3.select("p#p6").style("display", "none");
      d3.select("p#p7").style("display", "none");
      d3.select("p#p8").style("display", "none");
      d3.select("p#p9").style("display", "none");
      d3.select("p#p10").style("display", "none");


      xScale.domain(d3.extent(data, function(d){
        return + d.pneu_rich;
      }));

      svg.select(".x.axis")
      .transition()
      .duration(2000)
      .call(xAxis);

      yScale.domain(d3.extent(data, function(d){
        return + d.pneu_poor;
      }));

      svg.select(".y.axis")
      .transition()
      .duration(2000)
      .call(yAxis);

      circles
      .transition()
      .duration(2000)
      .attr("cx", function(d) {
        return xScale(+d.pneu_rich);

      })
      .attr("cy", function(d) {
        return yScale(+d.pneu_poor);
      })
      .attr("fill", function(d) {

        if (d.region === "Sub-Saharan Africa") {
          return "RGB(222,102,0)";
        }

        else {
          return "#BFBFBF";
        }

      });

      circles
      .on("mouseover", mouseoverFunc)

      function mouseoverFunc(d) {
        d3.select(this)
        .transition()
        .attr("r", 6)
        .attr("fill-opacity", 1)
        tooltip
        .style("display", null)
        .html("<p>" + "<strong>" + d.country + "</strong>" +
        "<br>Infant mortality rate: " + "<strong>" + d3.format("s")(d.pneu_poor) + "</strong>" +
        "<br>Population living in rural areas: <strong>" + d.pneu_rich + "%</strong>" + "</p>");
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

  function mousemoveFunc(d) {

    return tooltip
    .style("top", (d3.event.pageY - 10) + "px" )
    .style("left", (d3.event.pageX + 10) + "px");
  }
  function mouseoutFunc(d) {
    d3.select(this)
    .transition()
    .attr("r", 5);
    return tooltip.style("display", "none");
  }


})();
