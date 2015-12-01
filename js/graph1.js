var margin_graph1 = {top: 20, right: 185, bottom: 130, left: 45};
var width_graph1 = 800 - margin_graph1.left - margin_graph1.right;
var height_graph1 = 550 - margin_graph1.top - margin_graph1.bottom;

var xScale_graph1 = d3.scale.ordinal()
    .rangeRoundBands([0, width_graph1], .3);

var yScale_graph1 = d3.scale.linear()
    .rangeRound([height_graph1, 0]);

/*var color = d3.scale.category20();*/

var color = d3.scale.ordinal().range(["#8C703A", "#ABACDB", "#B574B5", "#DBABC4", "#DBBFAB", "#ACD7E3", "#E6E687", "#FA9D91", "#D6C789", "#72A886", "#8A5F76", "#92A147", "#E3E2AF", "#A5BBD1"]);

var tooltip_graph1 = d3.select("#graph1")
    .append("div")
    .attr("class", "tooltip_graph1");

var percentClicked = false;

var xAxis_graph1 = d3.svg.axis()
  .scale(xScale_graph1)
  .orient("bottom")
  .innerTickSize([0]);

var yAxis_graph1 = d3.svg.axis()
  .scale(yScale_graph1)
  .orient("left");
  /*.innerTickSize(d3.format(".1"))*/;

var stack = d3.layout
  .stack();

var svg1 = d3.select("#graph1").append("svg")
  .attr("width", width_graph1 + margin_graph1.left + margin_graph1.right)
  .attr("height", height_graph1 + margin_graph1.top + margin_graph1.bottom)
  .append("g")
  .attr("transform", "translate(" + margin_graph1.left + "," + margin_graph1.top + ")");

d3.csv("data/diarrhoeal.csv", function(error, data) {

  if (error) {
    console.log(error);
  }

  my2013 = [];
        data.forEach(function (d) {
            if (d.year === "2013" && d.region === "Sub-Saharan Africa" /*|| d.region === "Middle East & North Africa" || d.region === "East Asia & Pacific"*/) {
            my2013.push(d);
              }
            });

            console.log(my2013);


  data.sort(function(a,b) {
    return b.country - b.country;
  });

var illnesses = ["Diarrhoeal diseases","HIV","Pertussis","Measles","Meningitis and encephalitis","Malaria","Respiratory infections","Prematurity","Birth asphixia","Sepsis and infections","Perinatal and nutritional", "Congenital anomalies","Injuries","Other"];



var stacked = stack(makeData(illnesses, my2013));

            console.log(stacked);

xScale_graph1.domain(my2013.map(function(d) {
  return d.country;
}));

svg1.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height_graph1 + ")")
    .call(xAxis_graph1)
    .selectAll("text")
      .attr("dy", ".5em")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

svg1.append("g")
    .attr("class", "y axis")
    .call(yAxis_graph1)
    .append("text")
      .attr("class", "y label")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("dy", ".5em")
      .attr("dx", 5)
      .style("text-anchor", "end")
      .text("Mortality rate under 5");

var country = svg1.selectAll(".country")
    .data(stacked)
    .enter().append("g")
        .attr("class", "country")
        .style("fill", function(d,i) {
            return color(i);
        });

 var rectangles = country.selectAll("rect")
      .data(function(d) {
        console.log("array for a rectangle", d);
        return d;
      })
      .enter().append("rect")
        .attr("width", xScale_graph1.rangeBand());

  transitionCount();

  drawLegend();

  d3.selectAll("input").on("change", handleFormClick);

  function handleFormClick() {
      if (this.value === "bypercent") {
          percentClicked = true;
          transitionPercent();
      } else {
          percentClicked = false;
          transitionCount();
      }
  }

  function makeData(illnesses, data) {
    return illnesses.map(function(illness) {
      return data.map(function(d) {
        return {
          x: d["country"],
          y: +d[illness],
          illness: illness
      };
      })
    });
  }



  function transitionPercent () {
    yAxis_graph1.tickFormat(d3.format("%"));
    stack.offset("expand"); // use this to get it to be relative/normalized!
    var stacked = stack(makeData(illnesses, my2013));
    transitionRects(stacked);
  }

  function transitionCount() {
    yAxis_graph1.tickFormat(d3.format("s")); // for the stacked totals version
    stack.offset("zero");
    var stacked = stack(makeData(illnesses, my2013));
    transitionRects(stacked);
  }


  function transitionRects(stacked) {
    yScale_graph1.domain([0, d3.max(stacked[stacked.length -1], function(d) {
      return d.y0 + d.y;
    })]);

    var country = svg1.selectAll(".country")
      .data(stacked);

    country.selectAll("rect")
      .data(function(d) {
        return d;
      })

    svg1.selectAll("g.country rect")
      .transition()
      .duration(350)
      .attr("x", function(d) {
        return xScale_graph1(d.x);
      })
      .attr("y", function(d) {
        return yScale_graph1(d.y0 + d.y);
      })
      .attr("height", function(d) {
        return yScale_graph1(d.y0) - yScale_graph1(d.y0 + d.y); //height is base - tallness
      });
    svg1.selectAll(".y.axis")
      .transition()
      .call(yAxis_graph1)
      .selectAll("text")
        .style("text-anchor", "end");
  }

  function drawLegend() {
    var legend = svg1.selectAll(".legend")
        .data(color.domain().slice())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d,i){
          return "translate(0," + i * 20 + ")";
        });

     legend.append("rect")
        .attr("x", width_graph1 + 15)
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", color);

      legend.append("text")
         .attr("x", width_graph1 + 44)
         .attr("y", 6)
         .attr("dy", ".5em")
         .style("text-anchor", "start")
         .text(function(d, i) {
           return illnesses[i];
         });
  }

  //tooltip and interaction

  rectangles
          .on("mouseover", mouseoverFunc_graph1)
          .on("mousemove", mousemoveFunc_graph1)
          .on("mouseout", mouseoutFunc_graph1);


      function mouseoverFunc_graph1(d) {
        console.log("moused over", d.x);
          if(percentClicked) {
              tooltip_graph1
              .style("display", null)
              .html("<p><span class='tooltipHeader'>" + d.x + "</span><br><strong>"+ d.illness + ": " + d3.format(",%")(d.y) + "</strong></p>");
          } else {
                           console.log("illness", d.illness, "percent", d.y);
          tooltip_graph1
              .style("display", null)
              .html("<p><span class='tooltipHeader'>" + d.x + "</span><br><strong>"+ d.illness + ": " + (d.y) + "</strong></p>");
          }
      }

      function mousemoveFunc_graph1(d) {
          tooltip_graph1
              .style("top", (d3.event.pageY - 5) + "px")
              .style("left", (d3.event.pageX + 10) + "px");
      }

      function mouseoutFunc_graph1(d) {
          return tooltip_graph1.style("display", "none"); // this sets it to invisible!
      }


});
