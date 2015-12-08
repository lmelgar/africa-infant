var width_graph9 = 650;
var height_graph9 = 450;

var margin_graph9 = { top: 20, right: 10, bottom: 60, left: 80 };
var dotRadius = 5;

var xScale_graph9 = d3.scale.linear()
          .range([ margin_graph9.left, width_graph9 - margin_graph9.right - margin_graph9.left])

var yScale_graph9 = d3.scale.linear()
          .range([ height_graph9 - margin_graph9.bottom, margin_graph9.top ])

var xAxis_graph9 = d3.svg.axis()
        .scale(xScale_graph9)
        .orient("bottom")
        .ticks(6);

var yAxis_graph9 = d3.svg.axis()
        .scale(yScale_graph9)
        .orient("left")
        .ticks(6);

var svg_graph9 = d3.select("#graph9")
      .append("svg")
      .attr("width", width_graph9)
      .attr("height", height_graph9);


var tooltip_graph9 = d3.select("body")
       .append("div")
       .attr("class", "tooltip_graph9");



d3.csv("data/diarrhoeal-indic.csv", function(data) {
  console.log(data);

        xScale_graph9.domain(d3.extent(data, function(d){
            return + d.ors_female;
          }));
        yScale_graph9.domain(d3.extent(data, function(d){
            return + d.ors_male;
          }));

  d3.select("p#p1").style("display", "none");
  d3.select("p#p2").style("display", "none");
  d3.select("p#p3").style("display", "none");


  var circles = svg_graph9.selectAll("circle")
             .data(data)
             .enter()
             .append("circle")
             .attr("class", "dots");

  circles.attr("cx", function(d) {
      return + xScale_graph9(+d.ors_femal);
    })
    .attr("cy", function(d) {
      return + yScale_graph9(+d.rate);
    })
    .attr("r", dotRadius)
    .attr("fill", "#BFBFBF")
    .style('cursor','pointer');

  circles.sort(function(a, b) {
      return d3.ascending(+a.ors_female, +b.ors_female);
    })
      .transition()
      .delay(function(d, i) {
        return i * 10;
    })
      .duration(500);

    circles
        .on("mousemove", mousemoveFunc_graph9)
        .on("mouseout", mouseoutFunc_graph9);

  svg_graph9.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (height_graph9 - margin_graph9.bottom + 10) + ")")
    .call(xAxis_graph9);

  svg_graph9.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + (margin_graph9.left - 10) + ",0)")
    .call(yAxis_graph9);

  svg_graph9.append("text")
    .attr("class", "ylabel")
    .attr("y", margin_graph9.left/8 + 5)
              .attr("x", 0 - height_graph9 /3.4)
    .style("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Under 5 Mortality Rate (per thousand births)")
    .attr("font-family", "Open Sans");

var xlabel = svg_graph9.append("text")
    .attr("class", "xlabel")
    .attr("transform", "translate(" + (width_graph9 / 1.32) + " ," +
          (height_graph9 - 15) + ")")
    .style("text-anchor", "middle")
    .attr("dy", "12")
    .text("Population using improved drinking-water (%)")
    .attr("font-family", "Open Sans");

    d3.select("#ruraldrinking").on("click", function() {


    d3.select("p#p1").style("display", "inline");
    d3.select("p#p2").style("display", "none");
    d3.select("p#p3").style("display", "none");


      xScale_graph9.domain(d3.extent(data, function(d){
        return + d.ors_female;
      }));
      yScale_graph9.domain(d3.extent(data, function(d){
        return + d.ors_male;
      }));

      svg_graph9.select(".y.axis")
          .transition()
          .duration(2000)
          .call(yAxis_graph9);

      circles
        .transition()
        .duration(2000)
        .attr("cx", function(d) {
          return xScale_graph9(+d.ors_female);

        })
        .attr("cy", function(d) {
          return yScale_graph9(+d.ors_male);
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
        .on("mouseover", mouseoverFunc_graph9)

        function mouseoverFunc_graph9(d) {
          d3.select(this)
            .transition()
            .attr("r", 6)
          tooltip_graph9
          .style("display", null)
          .html("<p>" + "<strong>" + d.country + "</strong>" +
                "<br>Infant mortality rate: " + "<strong>" + d3.format("s")(d.ors_male) + "</strong>" +
                "<br>Population using improved drinking-water: <strong>" + d.ors_female + "%</strong>" + "</p>");
          d3.selectAll("circle").classed("unfocused", true);
                d3.select(this).select("circle").classed("unfocused", false).classed("focused", true);
          };

      xlabel
           .text("Population using improved drinking-water (%)")
           .transition()
           .duration(2000)
           .call(xlabel);


    });

    d3.select("#urbanrural").on("click", function() {


    d3.select("p#p1").style("display", "inline");
    d3.select("p#p2").style("display", "none");
    d3.select("p#p3").style("display", "none");

    xScale_graph9.domain(d3.extent(data, function(d){
      return + d.ors_rural;
    }));
    yScale_graph9.domain(d3.extent(data, function(d){
      return + d.ors_urban;
    }));

      svg_graph9.select(".y.axis")
          .transition()
          .duration(2000)
          .call(yAxis_graph9);

      circles
        .transition()
        .duration(2000)
        .attr("cx", function(d) {
          return xScale_graph9(+d.ors_rural);

        })
        .attr("cy", function(d) {
          return yScale_graph9(+ors_urban);
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
        .on("mouseover", mouseoverFunc_graph9)

        function mouseoverFunc_graph9(d) {
          d3.select(this)
            .transition()
            .attr("r", 6)
          tooltip_graph9
          .style("display", null)
          .html("<p>" + "<strong>" + d.country + "</strong>" +
                "<br>Infant mortality rate: " + "<strong>" + d3.format("s")(d.ors_urban) + "</strong>" +
                "<br>Population using improved drinking-water: <strong>" + d.ors_rural + "%</strong>" + "</p>");
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

    d3.select("p#p2").style("display", "inline");
    d3.select("p#p1").style("display", "none");
    d3.select("p#p3").style("display", "none");


    xScale_graph9.domain(d3.extent(data, function(d){
      return + d.ors_poorest;
    }));
    yScale_graph9.domain(d3.extent(data, function(d){
      return + d.ors_richest;
    }));
      svg_graph9.select(".y.axis")
          .transition()
          .duration(2000)
          .call(yAxis_graph9);

      circles
        .transition()
        .duration(2000)
        .attr("cx", function(d) {
          return xScale_graph9(+d.ors_poorest);

        })
        .attr("cy", function(d) {
          return yScale_graph9(+d.ors_richest);
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
             .on("mouseover", mouseoverFunc_graph9)

  function mouseoverFunc_graph9(d) {
    d3.select(this)
      .transition()
      .attr("r", 6)
      .attr("fill-opacity", 1)
    tooltip_graph9
    .style("display", null)
    .html("<p>" + "<strong>" + d.country + "</strong>" +
          "<br>Infant mortality rate: " + "<strong>" + d3.format("s")(d.ors_richest) + "</strong>" +
          "<br>Population using improved sanitation-water: <strong>" + d.ors_poorest + "%</strong>" + "</p>");
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

    d3.select("p#p2").style("display", "inline");
    d3.select("p#p1").style("display", "none");
    d3.select("p#p3").style("display", "none");


    xScale_graph9.domain(d3.extent(data, function(d){
      return + d.pneu_female;
    }));
    yScale_graph9.domain(d3.extent(data, function(d){
      return + d.pneu_male;
    }));

      svg_graph9.select(".y.axis")
          .transition()
          .duration(2000)
          .call(yAxis_graph9);

      circles
        .transition()
        .duration(2000)
        .attr("cx", function(d) {
          return xScale_graph9(+d.pneu_female);

        })
        .attr("cy", function(d) {
          return yScale_graph9(+d.pneu_male);
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
             .on("mouseover", mouseoverFunc_graph9)

  function mouseoverFunc_graph9(d) {
    d3.select(this)
      .transition()
      .attr("r", 6)
      .attr("fill-opacity", 1)
    tooltip_graph9
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

    d3.select("p#p3").style("display", "inline");
    d3.select("p#p1").style("display", "none");
    d3.select("p#p2").style("display", "none");


    xScale_graph9.domain(d3.extent(data, function(d){
      return + d.pneu_rural;
    }));
    yScale_graph9.domain(d3.extent(data, function(d){
      return + d.pneu_urban;
    }));
      svg_graph9.select(".y.axis")
          .transition()
          .duration(2000)
          .call(yAxis_graph9);

      circles
        .transition()
        .duration(2000)
        .attr("cx", function(d) {
          return xScale_graph9(+d.pneu_rural);

        })
        .attr("cy", function(d) {
          return yScale_graph9(+d.pneu_urban);
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
             .on("mouseover", mouseoverFunc_graph9)

  function mouseoverFunc_graph9(d) {
    d3.select(this)
      .transition()
      .attr("r", 6)
      .attr("fill-opacity", 1)
    tooltip_graph9
    .style("display", null)
    .html("<p>" + "<strong>" + d.country + "</strong>" +
          "<br>Infant mortality rate: " + "<strong>" + d3.format("s")(d.pneu_urban) + "</strong>" +
          "<br>Population living in rural areas: <strong>" + d.pneu_rural + "%</strong>" + "</p>");
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

function mousemoveFunc_graph9(d) {

  return tooltip_graph9
    .style("top", (d3.event.pageY - 10) + "px" )
    .style("left", (d3.event.pageX + 10) + "px");
}
function mouseoutFunc_graph9(d) {
  d3.select(this)
         .transition()
         .attr("r", 5);
  return tooltip_graph9.style("display", "none");
}



d3.select("#pneurich").on("click", function() {

d3.select("p#p3").style("display", "inline");
d3.select("p#p1").style("display", "none");
d3.select("p#p2").style("display", "none");


xScale_graph9.domain(d3.extent(data, function(d){
  return + d.pneu_poorest;
}));
yScale_graph9.domain(d3.extent(data, function(d){
  return + d.pneu_richest;
}));
  svg_graph9.select(".y.axis")
      .transition()
      .duration(2000)
      .call(yAxis_graph9);

  circles
    .transition()
    .duration(2000)
    .attr("cx", function(d) {
      return xScale_graph9(+d.pneu_poorest);

    })
    .attr("cy", function(d) {
      return yScale_graph9(+d.pneu_richest);
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
         .on("mouseover", mouseoverFunc_graph9)

function mouseoverFunc_graph9(d) {
d3.select(this)
  .transition()
  .attr("r", 6)
  .attr("fill-opacity", 1)
tooltip_graph9
.style("display", null)
.html("<p>" + "<strong>" + d.country + "</strong>" +
      "<br>Infant mortality rate: " + "<strong>" + d3.format("s")(d.pneu_richest) + "</strong>" +
      "<br>Population living in rural areas: <strong>" + d.pneu_poorest + "%</strong>" + "</p>");
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

function mousemoveFunc_graph9(d) {

return tooltip_graph9
.style("top", (d3.event.pageY - 10) + "px" )
.style("left", (d3.event.pageX + 10) + "px");
}
function mouseoutFunc_graph9(d) {
d3.select(this)
     .transition()
     .attr("r", 5);
return tooltip_graph9.style("display", "none");
}
