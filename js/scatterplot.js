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

  var data = [];


  function labelx(label) {
  d3.selectAll(".xlabel").remove();
  svg.append("text")
  .attr("class", "xlabel")
  .attr("transform", "translate(" + (width / 1.5) + " ," +
  (height - 15) + ")")
  .style("text-anchor", "middle")
  .attr("dy", "12")
  .text(label)
  .attr("font-family", "Open Sans");
}

function labelx2(label) {
d3.selectAll(".xlabel").remove();
svg.append("text")
.attr("class", "xlabel")
.attr("transform", "translate(" + (width / 1.35) + " ," +
(height - 15) + ")")
.style("text-anchor", "middle")
.attr("dy", "12")
.text(label)
.attr("font-family", "Open Sans");
}

function labelx3(label) {
d3.selectAll(".xlabel").remove();
svg.append("text")
.attr("class", "xlabel")
.attr("transform", "translate(" + (width / 1.6) + " ," +
(height - 15) + ")")
.style("text-anchor", "middle")
.attr("dy", "12")
.text(label)
.attr("font-family", "Open Sans");
}

function labelx4(label) {
d3.selectAll(".xlabel").remove();
svg.append("text")
.attr("class", "xlabel")
.attr("transform", "translate(" + (width / 1.42) + " ," +
(height - 15) + ")")
.style("text-anchor", "middle")
.attr("dy", "12")
.text(label)
.attr("font-family", "Open Sans");
}


function labely(label) {
d3.selectAll(".ylabel").remove();
svg.append("text")
.attr("class", "ylabel")
.attr("y", margin.left/8 + 5)
.attr("x", 0 - height /3.4)
.style("text-anchor", "middle")
.attr("transform", "rotate(-90)")
.text(label)
.attr("font-family", "Open Sans");
}

function labely2(label) {
d3.selectAll(".ylabel").remove();
svg.append("text")
.attr("class", "ylabel")
.attr("y", margin.left/8 + 5)
.attr("x", 0 - height /2.6)
.style("text-anchor", "middle")
.attr("transform", "rotate(-90)")
.text(label)
.attr("font-family", "Open Sans");
}

function labely3(label) {
d3.selectAll(".ylabel").remove();
svg.append("text")
.attr("class", "ylabel")
.attr("y", margin.left/8 + 5)
.attr("x", 0 - height /3)
.style("text-anchor", "middle")
.attr("transform", "rotate(-90)")
.text(label)
.attr("font-family", "Open Sans");
}

function labely4(label) {
d3.selectAll(".ylabel").remove();
svg.append("text")
.attr("class", "ylabel")
.attr("y", margin.left/8 + 5)
.attr("x", 0 - height /4.5)
.style("text-anchor", "middle")
.attr("transform", "rotate(-90)")
.text(label)
.attr("font-family", "Open Sans");
}




  d3.csv("data/water.csv", function(data) {
    console.log(data);

    function remove_nulls(data) {
      data.filter(function(d) {
        return d == null; }).remove();
    };


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
          return "rgb(222,102,0)";
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
        tooltip
        .style("display", null)
        .html("<p>" + "<span>" + d.country + "</span>" +
        "<br>Infant mortality rate: " + "<span>" + d3.format("s")(d.rate) + "</span>" +
        "<br>Population living in rural areas: <span>" + d.rural_pop + "%</span>" + "</p>");
        d3.selectAll("circle").classed("unfocused", true);
        d3.select(this).select("circle").classed("unfocused", false).classed("focused", true);
      };

      labelx2("Population living in rural areas (%)");
      labely("Under 5 Mortality Rate (per thousand births)");



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

      circles
      .on("mouseover", mouseoverFunc)

      function mouseoverFunc(d) {
        d3.select(this)
        .transition()
        .attr("r", 6)
        tooltip
        .style("display", null)
        .html("<p>" + "<span>" + d.country + "</span>" +
        "<br>Infant mortality rate: " + "<span>" + d3.format("s")(d.rate) + "</span>" +
        "<br>Population with access to improved drinking-water: <span>" + d.Rural_drinking + "%</span>" + "</p>");
        d3.selectAll("circle").classed("unfocused", true);
        d3.select(this).select("circle").classed("unfocused", false).classed("focused", true);
      };

      labelx3("Rural population with access to improved drinking-water (%)");
      labely("Under 5 Mortality Rate (per thousand births)");


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
        .html("<p>" + "<span>" + d.country + "</span>" +
        "<br>Infant mortality rate: " + "<span>" + d3.format("s")(d.rate) + "</span>" +
        "<br>Population with access to improved drinking-water: <span>" + d.Urban_drinking + "%</span>" + "</p>");
        d3.selectAll("circle").classed("unfocused", true);
        d3.select(this).select("circle").classed("unfocused", false).classed("focused", true);
      };

      labelx3("Urban population with access to improved drinking-water (%)");
      labely("Under 5 Mortality Rate (per thousand births)");

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
        .html("<p>" + "<span>" + d.country + "</span>" +
        "<br>Infant mortality rate: " + "<span>" + d3.format("s")(d.rate) + "</span>" +
        "<br>Population access to improved sanitation: <span>" + d.Rural_sanitation + "%</span>" + "</p>");
        d3.selectAll("circle").classed("unfocused", true);
        d3.select(this).select("circle").classed("unfocused", false).classed("focused", true);
      };

      labelx("Rural population with access to improved sanitation (%)");
      labely("Under 5 Mortality Rate (per thousand births)");

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
        .html("<p>" + "<span>" + d.country + "</span>" +
        "<br>Infant mortality rate: " + "<span>" + d3.format("s")(d.rate) + "</span>" +
        "<br>Population access to improved sanitation: <span>" + d.Urban_sanitation + "%</span>" + "</p>");
        d3.selectAll("circle").classed("unfocused", true);
        d3.select(this).select("circle").classed("unfocused", false).classed("focused", true);
      };


      labelx("Urban population with access to improved sanitation (%)");
      labely("Under 5 Mortality Rate (per thousand births)");

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
        .html("<p>" + "<span>" + d.country + "</span>" +
        "<br>Girls receiving ORS treatment: " + "<span>" + d.ors_female + "%</span>" +
        "<br>Boys receiving ORS treatment: <span>" + d.ors_male + "%</span>" + "</p>");
        d3.selectAll("circle").classed("unfocused", true);
        d3.select(this).select("circle").classed("unfocused", false).classed("focused", true);
      };

      labelx2("Boys receiving ORS treatment (%)");
      labely4("Girls receiving ORS treatment (%)");

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
        .html("<p>" + "<span>" + d.country + "</span>" +
        "<br>Children receiving ORS treatment in rural areas: " + "<span>" + d.ors_rural + "%</span>" +
        "<br>Children receiving ORS treatment in urban areas: <span>" + d.ors_urban + "%</span>" + "</p>");
        d3.selectAll("circle").classed("unfocused", true);
        d3.select(this).select("circle").classed("unfocused", false).classed("focused", true);
      };

      labelx("Children receiving ORS treatment in urban areas (%)");
      labely3("Children receiving ORS treatment in rural areas (%)");

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
        .html("<p>" + "<span>" + d.country + "</span>" +
        "<br>Poor children receiving ORS treatment: " + "<span>" + d.ors_poor + "%</span>" +
        "<br>Rich children receiving ORS treatment: <span>" + d.ors_rich + "%</span>" + "</p>");
        d3.selectAll("circle").classed("unfocused", true);
        d3.select(this).select("circle").classed("unfocused", false).classed("focused", true);
      };

      labelx4("Rich children receiving ORS treatment (%)");
      labely("Poor children receiving ORS treatment (%)");

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
        .html("<p>" + "<span>" + d.country + "</span>" +
        "<br>Girls, with suspected pneumonia, treated: " + "<span>" + d.pneu_female + "%</span>" +
        "<br>Boys, with suspected pneumonia, treated: <span>" + d.pneu_male + "%</span>" + "</p>");
        d3.selectAll("circle").classed("unfocused", true);
        d3.select(this).select("circle").classed("unfocused", false).classed("focused", true);
      };

      labelx4("Boys, with suspected pneumonia, treated (%)");
      labely("Girls, with suspected pneumonia, treated (%)");

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
        .html("<p>" + "<span>" + d.country + "</span>" +
        "<br>Children, with suspected pneumonia, treated in rural areas: " + "<span>" + d.pneu_rural + "%</span>" +
        "<br>Children, with suspected pneumonia, treated in urban areas: <span>" + d.pneu_urban + "%</span>" + "</p>");
        d3.selectAll("circle").classed("unfocused", true);
        d3.select(this).select("circle").classed("unfocused", false).classed("focused", true);
      };

      labelx3("Children, with suspected pneumonia, treated in urban areas (%)");
      labely2("Children, with suspected pneumonia, treated in rural areas (%)");

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
        .html("<p>" + "<span>" + d.country + "</span>" +
        "<br>Poor children, with suspected pneumonia, treated: " + "<span>" + d.pneu_poor + "%</span>" +
        "<br>Rich children, with suspected pneumonia, treated: <span>" + d.pneu_rich + "%</span>" + "</p>");
        d3.selectAll("circle").classed("unfocused", true);
        d3.select(this).select("circle").classed("unfocused", false).classed("focused", true);
      };

      labelx("Rich children, with suspected pneumonia, treated (%)");
      labely3("Poor children, with suspected pneumonia, treated (%)");

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
