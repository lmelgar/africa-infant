(function(){

    var width = 100;
    var height = 100;
    var margin = { top: 15, right: 20, bottom: 30, left: 30 };

    var data = [];
    var circle = null;
    var caption = null;
    var curYear = null;

    var bisect = d3.bisector(function(d) {
      return d.date;
    }).left;

    var format = d3.time.format("%Y");
    var xScale = d3.time.scale().range([0, width]);
    var yScale = d3.scale.linear().range([height, 0]);
    var xValue = function(d) {
      return d.date;
    };

   var yValue = function(d) {
     return d.count;
   };

   var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left")
      .ticks(3)
      .outerTickSize(0)
      .innerTickSize(0);

    var area = d3.svg.area().x(function(d) {
      return xScale(xValue(d));
    }).y0(height).y1(function(d) {
      return yScale(yValue(d));
    });
    var line = d3.svg.line().x(function(d) {
      return xScale(xValue(d));
    }).y(function(d) {
      return yScale(yValue(d));
    });
    function setupScales(data)  {
      var extentX, maxY;
      maxY = d3.max(data, function(c) {
        return d3.max(c.values, function(d) {
          return yValue(d);
        });
      });

      maxY = maxY + (maxY * 1 / 4);
      yScale.domain([0, maxY]);
      extentX = d3.extent(data[1].values, function(d) {
        return xValue(d);
      });
      return xScale.domain(extentX);
    }

    function transformData(rawData) {
      var format, nest;
      format = d3.time.format("%Y");
      rawData.forEach(function(d) {
          d.date = format.parse(d.year);
          d.count = +d["diarrhoeal_diseases"];
          d.count2 = +d["respiratory_infections"];
      });
      nest = d3.nest().key(function(d) {
        return d.country;
      }).sortValues(function(a, b) {
        return d3.ascending(a.date, b.date);
      }).entries(rawData);
      nest = nest.filter(function(d) {
        return d.values.length == 14;
      });
      return nest;
    }

    function setupIsotope() {
      $("#graph1").isotope({
        itemSelector: '.chart',
        layaoutMode: 'fitRows',
        getSortData: {
          count: function(e) {
            var d, sum;
            d = d3.select(e).datum();
            sum = d3.sum(d.values, function(d) {
              return d.count;
            });
            return sum * -1;
          },
          country: function(e) {
            var d, sum;
            d = d3.select(e).datum();
            sum = d3.sum(d.values, function(d) {
              return d.count2;
            });
            return sum * -1;
          }
        }
      });
      return $("#graph1").isotope({
        sortBy: 'count'
      });
    }

    d3.csv("data/africa-data.csv", function(error, rawData) {
      if (error) {
        console.log(error);
      };




      var data = transformData(rawData);
      d3.select("#graph1").datum(data).each(function(myData) {
        data = myData;
        setupScales(data);
        var div = d3.select(this).selectAll(".chart").data(data);
        div.enter()
            .append("div")
            .attr("class", "chart")
            .append("svg")
            .append("g");
        var svg = div.select("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);
        var g = svg.select("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          g.append("rect")
            .attr("class", "background")
            .style("pointer-events", "all")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseout", mouseout);
        var lines = g.append("g");
        lines.append("path")
            .attr("class", "area")
            .style("pointer-events", "none")
            .attr("d", function(c) {
              return area(c.values);
            });
        lines.append("path")
            .attr("class", "line_small")
            .style("pointer-events", "none")
            .attr("d", function(c) {
              return line(c.values);
            });
        lines.append("text")
            .attr("class", "title")
            .attr("text-anchor", "middle")
            .attr("y", height)
            .attr("dy", margin.bottom / 2 + 10)
            .attr("x", width / 2).text(function(c) {
              return c.key;
            });
          lines.append("text")
            .attr("class", "static_year")
            .attr("text-anchor", "start")
            .style("pointer-events", "none")
            .attr("dy", 13).attr("y", height)
            .attr("x", 0).text(function(c) {
              return xValue(c.values[1]).getFullYear();
            });
          lines.append("text")
            .attr("class", "static_year")
            .attr("text-anchor", "end")
            .style("pointer-events", "none").attr("dy", 13)
            .attr("y", height).attr("x", width).text(function(c) {
              return xValue(c.values[c.values.length - 1]).getFullYear();
            });
          circle = lines.append("circle")
            .attr("r", 2.5)
            .attr("opacity", 0)
            .attr("fill", "rgb(222,102,0)")
            .style("pointer-events", "none");
          caption = lines.append("text")
            .attr("class", "caption")
            .attr("text-anchor", "middle")
            .style("pointer-events", "none")
            .style("fill", "rgb(222,102,0")
            .attr("dy", -10);
          curYear = lines.append("text")
            .attr("class", "caption")
            .attr("text-anchor", "middle")
            .style("pointer-events", "none")
            .attr("dy", 13)
            .attr("y", height);
          g.append("g")
            .attr("class", "y_axis")
            .call(yAxis)
            .selectAll("text")
              .attr("dy", ".1em")
              .attr("x", -11)
              .style("text-anchor", "end");
       }); // end of charts for each row

       function mouseover() {
         circle.attr("opacity", 1.0);
         d3.selectAll(".static_year").classed("hidden", true);
         return mousemove.call(this);
       };

       function mousemove() {
         var date, index, year;
         year = xScale.invert(d3.mouse(this)[0]).getFullYear();
         date = format.parse('' + year);
         index = 0;
         circle.attr("cx", xScale(date)).attr("cy", function(c) {
           index = bisect(c.values, date, 0, c.values.length - 0);
           return yScale(yValue(c.values[index]));
         });
         caption.attr("x", xScale(date)).attr("y", function(c) {
           return yScale(yValue(c.values[index]));
         }).text(function(c) {
           return yValue(c.values[index]);
         });
         return curYear.attr("x", xScale(date)).text(year);
       };

       function mouseout() {
         d3.selectAll(".static_year").classed("hidden", false);
         circle.attr("opacity", 0);
         caption.text("");
         return curYear.text("");
       };
       setupIsotope();
          d3.select("#smallmult").selectAll("button").on("click", function() {
            var id;
            id = d3.select(this).attr("id");
            d3.select("#smallmult button").selectAll("button").classed("active", false);
            d3.select("#" + id).classed("active", true);
            return $("#graph1").isotope({
                sortBy: id
         });
          });
    });


})();
