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

var svg = d3.select("#graph9")
      .append("svg")
      .attr("width", width)
      .attr("height", height);


var tooltip = d3.select("body")
       .append("div")
       .attr("class", "tooltip");



d3.csv("data/diarrhoeal-indic.csv", function(data) {
  console.log(data);

        xScale.domain(d3.extent(data, function(d){
            return + d.ors_female;
          }));
        yScale.domain(d3.extent(data, function(d){
            return + d.ors_male;
          }));

  d3.select("p#p1").style("display", "none");
  d3.select("p#p2").style("display", "none");
  d3.select("p#p3").style("display", "none");


  var circles = svg.selectAll("circle")
             .data(data)
             .enter()
             .append("circle")
             .attr("class", "dots");

  circles.attr("cx", function(d) {
      return + xScale(+d.ors_femal);
    })
    .attr("cy", function(d) {
      return + yScale(+d.rate);
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

    d3.select("#ruraldrinking").on("click", function() {


    d3.select("p#p1").style("display", "inline");
    d3.select("p#p2").style("display", "none");
    d3.select("p#p3").style("display", "none");


      xScale.domain(d3.extent(data, function(d){
        return + d.ors_female;
      }));
      yScale.domain(d3.extent(data, function(d){
        return + d.ors_male;
      }));

      svg.select(".y.axis")
          .transition()
          .duration(2000)
          .call(yAxis);

      circles
        .transition()
        .duration(2000)
        .attr("cx", function(d) {
          return xScale(+d.ors_female);

        })
        .attr("cy", function(d) {
          return yScale(+d.ors_male);
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

    xScale.domain(d3.extent(data, function(d){
      return + d.ors_rural;
    }));
    yScale.domain(d3.extent(data, function(d){
      return + d.ors_urban;
    }));

      svg.select(".y.axis")
          .transition()
          .duration(2000)
          .call(yAxis);

      circles
        .transition()
        .duration(2000)
        .attr("cx", function(d) {
          return xScale(+d.ors_rural);

        })
        .attr("cy", function(d) {
          return yScale(+ors_urban);
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


    xScale.domain(d3.extent(data, function(d){
      return + d.ors_poorest;
    }));
    yScale.domain(d3.extent(data, function(d){
      return + d.ors_richest;
    }));
      svg.select(".y.axis")
          .transition()
          .duration(2000)
          .call(yAxis);

      circles
        .transition()
        .duration(2000)
        .attr("cx", function(d) {
          return xScale(+d.ors_poorest);

        })
        .attr("cy", function(d) {
          return yScale(+d.ors_richest);
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


    xScale.domain(d3.extent(data, function(d){
      return + d.pneu_female;
    }));
    yScale.domain(d3.extent(data, function(d){
      return + d.pneu_male;
    }));

      svg.select(".y.axis")
          .transition()
          .duration(2000)
          .call(yAxis);

      circles
        .transition()
        .duration(2000)
        .attr("cx", function(d) {
          return xScale(+d.pneu_female);

        })
        .attr("cy", function(d) {
          return yScale(+d.pneu_male);
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

    d3.select("p#p3").style("display", "inline");
    d3.select("p#p1").style("display", "none");
    d3.select("p#p2").style("display", "none");


    xScale.domain(d3.extent(data, function(d){
      return + d.pneu_rural;
    }));
    yScale.domain(d3.extent(data, function(d){
      return + d.pneu_urban;
    }));
      svg.select(".y.axis")
          .transition()
          .duration(2000)
          .call(yAxis);

      circles
        .transition()
        .duration(2000)
        .attr("cx", function(d) {
          return xScale(+d.pneu_rural);

        })
        .attr("cy", function(d) {
          return yScale(+d.pneu_urban);
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



d3.select("#pneurich").on("click", function() {

d3.select("p#p3").style("display", "inline");
d3.select("p#p1").style("display", "none");
d3.select("p#p2").style("display", "none");


xScale.domain(d3.extent(data, function(d){
  return + d.pneu_poorest;
}));
yScale.domain(d3.extent(data, function(d){
  return + d.pneu_richest;
}));
  svg.select(".y.axis")
      .transition()
      .duration(2000)
      .call(yAxis);

  circles
    .transition()
    .duration(2000)
    .attr("cx", function(d) {
      return xScale(+d.pneu_poorest);

    })
    .attr("cy", function(d) {
      return yScale(+d.pneu_richest);
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
