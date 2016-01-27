(function(){

  var width = 650;
  var height = 450;

  var data = [];
  var circles;

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

  var button = d3.select("#graph4").selectAll("button");

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

function update_circles(data, x, y) {

 xScale
    .domain(d3.extent(data, function(d){
      return +d[x];
    }));

    svg.select(".x.axis")
    .transition()
    .duration(2000)
    .call(xAxis);

  yScale
    .domain(d3.extent(data, function(d){
      return +d[y];
    }));

    svg.select(".y.axis")
    .transition()
    .duration(2000)
    .call(yAxis);

    svg.select(".x.axis")
    .transition()
    .duration(2000)
    .call(xAxis);

    circles = svg.selectAll("circle.dots").data(data, function(d) {
      return d.country;
    });

  circles
    .enter()
    .append("circle")
    .attr("class", "dots")
    .attr("r", dotRadius)
    .attr("fill", function(d) {
      if (d.region === "Sub-Saharan Africa") {
        return "RGB(222,102,0)";
      }
      else {
        return "#BFBFBF";
      }
    })
    .style('cursor','pointer')
    .on('mousemove', mousemoveFunc)
    .on('mouseout', mouseoutFunc);

  circles
    .transition()
    .duration(2000)
    .attr("cx", function(d) {
      return xScale(+d[x]);
    })
    .attr("cy", function(d) {
      return yScale(+d[y]);
    })
    .attr("fill", function(d) {
        if (d.region === "Sub-Saharan Africa") {
          return "rgb(222,102,0)";
        }
        else {
          return "#BFBFBF";
        }
    });  // this is redundant for the first button case.


  circles.exit().remove();

  return circles;

}

function remove_nulls(data, illness) {
  // we are assuming empty strings and 0's are not graphable
    return data.filter(function(d) {
      if (d[illness] !== "undefined" && d[illness] !== "" && d[illness] !== "0" && +d[illness] !==0 ) {
          return d;
        }
    });
}

// initial state is the rural pop chart.

  d3.csv("data/water.csv", function(error, inputdata) {
    console.log(error, inputdata);

    data = remove_nulls(inputdata, "rate");
    data = remove_nulls(data, "rural_pop");

    xScale.domain(d3.extent(data, function(d){
      return + d.Total_drinking;
    }));
    yScale.domain(d3.extent(data, function(d){
      return + d.rate;
    }));

    d3.select("div#p0").style("display", "inline");
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


    circles = svg.selectAll("circle.dots")
      .data(data, function(d) {
        return d.country;
      })

    circles
    .enter()
    .append("circle")
    .attr("class", "dots")
    .attr("cx", function(d) {
      return + xScale(+d.rural_pop);
    })
    .attr("cy", function(d) {
      return + yScale(+d.rate);
    })
    .attr("r", dotRadius)
    .attr("fill", "#BFBFBF")
    .style('cursor','pointer')
    .on("mousemove", mousemoveFunc)
    .on("mouseout", mouseoutFunc);

    circles.sort(function(a, b) {
      return d3.ascending(+a.rate, +b.rate);
    })
    .transition()
    .delay(function(d, i) {
      return i * 10;
    })
    .duration(500);

    circles.exit().remove();

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (height - margin.bottom + 10) + ")")
    .call(xAxis);

    svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + (margin.left - 10) + ",0)")
    .call(yAxis);

    //  NOW THE BUTTONS  --------------------------------------

    d3.select("#urbanrural").on("click", function() {

      data = remove_nulls(inputdata, "rate");
      data = remove_nulls(data, "rural_pop");

    d3.selectAll("text.dotlabel").remove();

      d3.select("p#p1").style("display", "inline");
      d3.select("div#p0").style("display", "none");
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


      circles = update_circles(data, 'rural_pop', 'rate');
      circles.on("mouseover", mouseoverFunc);

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

     var thisButton = d3.select(this);
     d3.selectAll("button").classed("selected", false);
     thisButton.classed("selected", true);

    });

    d3.select("#ruraldrinking").on("click", function() {


      data = remove_nulls(inputdata, "rate");
      data = remove_nulls(data, "Rural_drinking");

      d3.select("p#p2").style("display", "inline");
      d3.select("div#p0").style("display", "none");
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

     circles = update_circles(data, "Rural_drinking", "rate");
     circles.on("mouseover", mouseoverFunc);

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

    var thisButton = d3.select(this);
    d3.selectAll("button").classed("selected", false);
    thisButton.classed("selected", true);


    d3.selectAll("text.dotlabel").remove();
    var dotlabel = svg.selectAll("text.dotlabel")
      .data(data, function(d) {
          return d.country;
        });

    dotlabel
          .enter()
          .append("text")
          .attr("transform", function(d) {
           return "translate(" + xScale(+d.Rural_drinking) + "," + yScale(+d.rate) + ")";
          })
          .attr({
            "dx": "8px",
            "dy": "3px"
          })
          .attr("class", "dotlabel")
          .style("opacity", 0)
          .text(function(d) {
          if(d.country === "Angola") {
          return d.country;
          } else {
            return "";
          }
          });
          // transition them.
      dotlabel.transition()
        .duration(2000)
        .style("opacity", 1);
      dotlabel.exit().remove();



    });


    d3.select("#urbandrinking").on("click", function() {

      data = remove_nulls(inputdata, "rate");
      data = remove_nulls(data, "Urban_drinking");

      d3.select("p#p3").style("display", "inline");
      d3.select("div#p0").style("display", "none");
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

      circles = update_circles(data, 'Urban_drinking', 'rate');
      circles.on("mouseover", mouseoverFunc);

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

       var thisButton = d3.select(this);
           d3.selectAll("button").classed("selected", false);
           thisButton.classed("selected", true);

        d3.selectAll("text.dotlabel").remove();
        var dotlabel = svg.selectAll("text.dotlabel")
           .data(data, function(d) {
             return d.country;
             });
       dotlabel
         .enter()
         .append("text")
         .attr("transform", function(d) {
          return "translate(" + xScale(+d.Urban_drinking) + "," + yScale(+d.rate) + ")";
         })
         .attr({
           "dx": "10px",
           "dy": "4px"
         })
         .attr("class", "dotlabel")
         .style("opacity", 0)
         .text(function(d) {
         if(d.country === "Mauritania") {
         return d.country;
         } else {
          return "";
         }
         });
         // transition them.
     dotlabel.transition()
       .duration(2000)
       .style("opacity", 1);
     dotlabel.exit().remove();

    });

    d3.select("#ruralsanitation").on("click", function() {

      data = remove_nulls(inputdata, "rate");
      data = remove_nulls(data, "Rural_sanitation");

      d3.select("p#p5").style("display", "inline");
      d3.select("div#p0").style("display", "none");
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


      d3.selectAll("text.dotlabel").remove();

      circles = update_circles(data, 'Rural_sanitation', 'rate');
      circles.on("mouseover", mouseoverFunc);


      function mouseoverFunc(d) {
        d3.select(this)
        .transition()
        .attr("r", 6)
        .attr("fill-opacity", 1)
        tooltip
        .style("display", null)
        .html("<p>" + "<span>" + d.country + "</span>" +
        "<br>Infant mortality rate: " + "<span>" + d3.format("s")(+d.rate) + "</span>" +
        "<br>Population access to improved sanitation: <span>" + d.Rural_sanitation + "%</span>" + "</p>");
        d3.selectAll("circle").classed("unfocused", true);
        d3.select(this).select("circle").classed("unfocused", false).classed("focused", true);
      };

      labelx("Rural population with access to improved sanitation (%)");
      labely("Under 5 Mortality Rate (per thousand births)");

     var thisButton = d3.select(this);
         d3.selectAll("button").classed("selected", false);
         thisButton.classed("selected", true);

    });


    d3.select("#urbansanitation").on("click", function() {

      data = remove_nulls(inputdata, "rate");
      data = remove_nulls(data, "Urban_sanitation");

      d3.select("p#p4").style("display", "inline");
      d3.select("div#p0").style("display", "none");
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

      d3.selectAll("text.dotlabel").remove();

      circles = update_circles(data, 'Urban_sanitation', 'rate');
      circles.on("mouseover", mouseoverFunc);

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


    var thisButton = d3.select(this);
         d3.selectAll("button").classed("selected", false);
         thisButton.classed("selected", true);

    });


    d3.select("#ors1").on("click", function() {

      data = remove_nulls(inputdata, "ors_male");
      data = remove_nulls(data, "ors_female");

      d3.select("p#p6").style("display", "inline");
      d3.select("div#p0").style("display", "none");
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


      circles = update_circles(data, 'ors_male', 'ors_female');
      circles.on("mouseover", mouseoverFunc);

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

      var thisButton = d3.select(this);
      d3.selectAll("button").classed("selected", false);
      thisButton.classed("selected", true);

      d3.selectAll("text.dotlabel").remove();
      var dotlabel = svg.selectAll("text.dotlabel")
           .data(data, function(d) {
             return d.country;
             });
           dotlabel
             .enter()
             .append("text")
             .attr("transform", function(d) {
              return "translate(" + xScale(+d.ors_male) + "," + yScale(+d.ors_female) + ")";
             })
             .attr({
               "dx": "5px",
               "dy": "2px"
             })
             .attr("class", "dotlabel")
             .style("opacity", 0)
             .text(function(d) {
               if(d.country === "Somalia") {
                console.log(d);
                return d.country;
               } else {
                return "";
               }
             });
             // transition them.
         dotlabel.transition()
           .duration(2000)
           .style("opacity", 1);
         dotlabel.exit().remove();


    });

    d3.select("#ors2").on("click", function() {

      data = remove_nulls(inputdata, "ors_urban");
      data = remove_nulls(data, "ors_rural");

      d3.select("p#p7").style("display", "inline");
      d3.select("div#p0").style("display", "none");
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

      circles = update_circles(data, 'ors_urban', 'ors_rural');
      circles.on("mouseover", mouseoverFunc);

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


     var thisButton = d3.select(this);
         d3.selectAll("button").classed("selected", false);
         thisButton.classed("selected", true);

         d3.selectAll("text.dotlabel").remove();
         var dotlabel = svg.selectAll("text.dotlabel")
                             .data(data, function(d) {
                               return d.country;
                               });
       dotlabel
         .enter()
         .append("text")
         .attr("transform", function(d) {
          return "translate(" + xScale(+d.ors_urban) + "," + yScale(+d.ors_rural) + ")";
         })
         .attr({
           "dx": "10px",
           "dy": "4px"
         })
         .attr("class", "dotlabel")
         .style("opacity", 0)
         .text(function(d) {
         if(d.country === "Djibouti") {
         return d.country;
         } else {
          return "";
         }
         });
         // transition them.
     dotlabel.transition()
       .duration(2000)
       .style("opacity", 1);
     dotlabel.exit().remove();


    });

    d3.select("#ors3").on("click", function() {

      data = remove_nulls(inputdata, "ors_poor");
      data = remove_nulls(data, "ors_rich");

      d3.select("p#p8").style("display", "inline");
      d3.select("div#p0").style("display", "none");
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

      circles = update_circles(data, 'ors_rich', 'ors_poor');
      circles.on("mouseover", mouseoverFunc);

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


     var thisButton = d3.select(this);
         d3.selectAll("button").classed("selected", false);
         thisButton.classed("selected", true);


         d3.selectAll("text.dotlabel").remove();
         var dotlabel = svg.selectAll("text.dotlabel")
                             .data(data, function(d) {
                               return d.country;
                               });
     dotlabel
       .enter()
       .append("text")
       .attr("transform", function(d) {
        return "translate(" + xScale(+d.ors_rich) + "," + yScale(+d.ors_poor) + ")";
       })
       .attr({
         "dx": "10px",
         "dy": "5px"
       })
       .attr("class", "dotlabel")
       .style("opacity", 0)
       .text(function(d) {
       if(d.country === "Chad" || d.country === "Nigeria" || d.country === "Burkina Faso") {
       return d.country;
       } else {
        return "";
       }
       });
       // transition them.
   dotlabel.transition()
     .duration(2000)
     .style("opacity", 1);
   dotlabel.exit().remove();


    });


    d3.select("#ors4").on("click", function() {

      data = remove_nulls(inputdata, "pneu_male");
      data = remove_nulls(data, "pneu_female");


      d3.select("p#p9").style("display", "inline");
      d3.select("div#p0").style("display", "none");
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

      circles = update_circles(data, 'pneu_male', 'pneu_female');
      circles.on("mouseover", mouseoverFunc);

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

     var thisButton = d3.select(this);
         d3.selectAll("button").classed("selected", false);
         thisButton.classed("selected", true);


         d3.selectAll("text.dotlabel").remove();
         var dotlabel = svg.selectAll("text.dotlabel")
             .data(data, function(d) {
               return d.country;
               });

             dotlabel
               .enter()
               .append("text")
               .attr("transform", function(d) {
                return "translate(" + xScale(+d.pneu_male) + "," + yScale(+d.pneu_female) + ")";
               })
               .attr({
                 "dx": "10px",
                 "dy": "5px"
               })
               .attr("class", "dotlabel")
               .style("opacity", 0)
               .text(function(d) {
               if(d.country === "Somalia" || d.country === "Uganda") {
                  return d.country;
               } else {
                return "";
               }
               });
               // transition them.
           dotlabel.transition()
             .duration(2000)
             .style("opacity", 1);
           dotlabel.exit().remove();

    });

    d3.select("#ors5").on("click", function() {

      data = remove_nulls(inputdata, "pneu_urban");
      data = remove_nulls(data, "pneu_rural");


      d3.select("p#p10").style("display", "inline");
      d3.select("div#p0").style("display", "none");
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

      circles = update_circles(data, 'pneu_urban', 'pneu_rural');
      circles.on("mouseover", mouseoverFunc);

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

           var thisButton = d3.select(this);
               d3.selectAll("button").classed("selected", false);
               thisButton.classed("selected", true);

  var thisButton = d3.select(this);
    d3.selectAll("button").classed("selected", false);
    thisButton.classed("selected", true);


    d3.selectAll("text.dotlabel").remove();
    var dotlabel = svg.selectAll("text.dotlabel")
                        .data(data, function(d) {
                          return d.country;
                          });
        dotlabel
          .enter()
          .append("text")
          .attr("transform", function(d) {
           return "translate(" + xScale(+d.pneu_urban) + "," + yScale(+d.pneu_rural) + ")";
          })
          .attr({
            "dx": "10px",
            "dy": "4px"
          })
          .attr("class", "dotlabel")
          .style("opacity", 0)
          .text(function(d) {
          if(d.country === "Malawi" || d.country === "Ghana" || d.country === "Guinea" || d.country === "Chad") {
          return d.country;
          } else {
            return "";
          }
          });
          // transition them.
      dotlabel.transition()
        .duration(2000)
        .style("opacity", 1);
      dotlabel.exit().remove();


    });


    d3.select("#ors6").on("click", function() {

      data = remove_nulls(inputdata, "pneu_poor");
      data = remove_nulls(data, "pneu_rich");


      d3.select("p#p11").style("display", "inline");
      d3.select("div#p0").style("display", "none");
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

      circles = update_circles(data, 'pneu_rich', 'pneu_poor');
      circles.on("mouseover", mouseoverFunc);


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

     var thisButton = d3.select(this);
         d3.selectAll("button").classed("selected", false);
         thisButton.classed("selected", true);

         d3.selectAll("text.dotlabel").remove();
         var dotlabel = svg.selectAll("text.dotlabel")
                             .data(data, function(d) {
                               return d.country;
                               });

        dotlabel
         .enter()
         .append("text")
         .attr("transform", function(d) {
          return "translate(" + xScale(+d.pneu_rich) + "," + yScale(+d.pneu_poor) + ")";
         })
         .attr({
           "dx": "-46px",
           "dy": "3px"
         })
         .attr("class", "dotlabel")
         .style("opacity", 0)
         .text(function(d) {
         if(d.country === "Gambia" || d.country === "Ghana" || d.country === "Senegal") {
         return d.country;
         } else {
          return "";
         }
         });
         // transition them.
     dotlabel.transition()
       .duration(2000)
       .style("opacity", 1);
     dotlabel.exit().remove();

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
