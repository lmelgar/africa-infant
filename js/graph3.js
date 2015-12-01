var margin_graph3 = {top: 20, right: 120, bottom: 120, left: 70};
var width_graph3 = 600 - margin_graph3.left - margin_graph3.right;
var height_graph3 = 450 - margin_graph3.top - margin_graph3.bottom;

var svg3 = d3.select('#graph3').append('svg')
    .attr('width', width_graph3)
    .attr('height', height_graph3);

var projection = d3.geo.mercator()
    .scale(230) // mess with this if you want
    .translate([width_graph3 / 2.4, height_graph3 / 1.9]);

var path = d3.geo.path()
    .projection(projection);

var colorScale = d3.scale.linear().range(["#FCE4C2", "#EB8A02"]).interpolate(d3.interpolateLab);

var countryById = d3.map();


// we use queue because we have 2 data files to load.
queue()
    .defer(d3.json, "data/africa.topojson")
    .defer(d3.csv, "data/my2013.csv", typeAndSet) // process
    .await(loaded);

function typeAndSet(d) {
    d.rate = +d.rate;
    countryById.set(d.ISO3, d); //where the id in my2013
    return d;
}

function getColor(d) {
    var dataRow = countryById.get(d.properties.iso_a3); //match id my2013 with countries id
    if (dataRow) {
        console.log("row", dataRow);
        return colorScale(dataRow.total);
    } else {
        console.log("no dataRow", d);
        return "#ccc";
    }
}

function getText(d) {
 var dataRow = countryById.get(d.properties.iso_a3);
    if (dataRow) {
        console.log(dataRow);
        return "<strong>" + dataRow.country + "</strong><br> The infant mortality rate in 2013 was <strong>" + dataRow.total + "</strong>";
    } else {
        console.log("no dataRow", d);
        return "<strong>" + d.properties.name + "</strong><br> No data";
    }
}

function loaded(error, countries, illness) {

    console.log("countries", countries);
    console.log("illness", illness);

    colorScale.domain(d3.extent(illness, function(d) {return d.total;}));

    var world = topojson.feature(countries, countries.objects.collection).features;

    svg3.selectAll('path.countries')
        .data(world)
        .enter()
        .append('path')
        .attr('class', 'countries')
        .attr('d', path)
        .attr('fill', function(d,i) {
            /*console.log(d.properties.name);*/
            return getColor(d);
        })
        /*.append("title")
        .text(function(d) {
            return getText(d);
        });*/
        .call(d3.helper.tooltip(
        function(d, i){
          return getText(d);
        }
        )); //tooltip based in an example from Roger Veciana: http://bl.ocks.org/rveciana/5181105


    var linear = colorScale;

    svg3.append("g")
      .attr("class", "legendLinear")
      .attr("transform", "translate(20,20)");

    var legendLinear = d3.legend.color()
      .shapeWidth(30)
      .orient('vertical')
      .scale(linear);

    svg3.select(".legendLinear")
      .call(legendLinear);


}
