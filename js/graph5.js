

// csv loaded asynchronously
d3.csv("data/africa-data.csv", type, function(data) {

  var margin = {top: 45, right: 30, bottom: 20, left: 20},
      width = 150 - margin.left - margin.right,
      height = 90 - margin.top - margin.bottom;


  var color = ["#D1E2E6"];

  var xScale = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  // Scales. Note the inverted domain fo y-scale: bigger is up!
  var yScale = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left");

  // Data is nested by country
  var countries = d3.nest()
      .key(function(d) { return d.country; })
      .entries(data);

  // Parse dates and numbers. We assume values are sorted by date.
  // Also compute the maximum price per symbol, needed for the y-domain.
  // symbols.forEach(function(s) {
  //   s.values.forEach(function(d) { d.date = parse(d.date); d.price = +d.price; });
  //   s.maxPrice = d3.max(s.values, function(d) { return d.price; });
  // });

  // Compute the minimum and maximum year and percent across symbols.
  xScale.domain(data.map(function(d) { return d.year; }));
  yScale.domain([0, d3.max(countries, function(s) { return s.values[0].diarrhoeal_diseases; })]);

  // Add an SVG element for each country, with the desired dimensions and margin.
  var svg = d3.select("#graph5").selectAll("svg")
    .data(countries)
    .enter()
    .append("svg:svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      // Hide y axis
      // .attr("class", "y axis")
      // .call(yAxis)
    .append("text")
    .attr("x", width + 10)
    .attr("y", height/3)
    .attr("dy", ".71em")
    .attr("text-anchor", "start")
    .attr("font-size", "1.1em")
    .text(function(d) { return d.key});

  // Accessing nested data: https://groups.google.com/forum/#!topic/d3-js/kummm9mS4EA
  // data(function(d) {return d.values;})
  // this will dereference the values for nested data for each group
  svg.selectAll(".bar")
      .data(function(d) {return d.values;})
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return xScale(d.year); })
      .attr("width", xScale.rangeBand())
      .attr("y", function(d) { return yScale(d.diarrhoeal_diseases); })
      .attr("height", function(d) { return height - yScale(d.diarrhoeal_diseases); })
      .attr("fill", "pink");

});

function type(d) {
  d.diarrhoeal_diseases = +d.diarrhoeal_diseases;
  return d;
}
