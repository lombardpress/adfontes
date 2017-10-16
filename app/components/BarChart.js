import React, { Component } from 'react'
var {connect} = require('react-redux');
// import { scaleLinear } from 'd3-scale';
// import { max } from 'd3-array';
// import { select } from 'd3-selection';
var d3 = require("d3");
var actions = require('actions');





class BarChart extends React.Component {
   constructor(props){
      super(props)
      this.createBarChart = this.createBarChart.bind(this)
  }
   componentDidMount() {
     var count = this.props.chart.count;
     if (count){
      this.createBarChart(count)
      }
   }
   componentDidUpdate(count) {
     var count = this.props.chart.count;
     if (count){
       this.createBarChart(count)
     }
   }
   createBarChart(count) {
     var svg = d3.select("svg");
     svg.selectAll("*").remove();

  //    console.log("value in createBarChart", count)
  //     const node = this.node
  //     //const dataMax = max(this.props.data)
  //     const dataMax = max(count)
  //     const yScale = scaleLinear()
  //        .domain([0, dataMax])
  //        .range([0, this.props.size[1]])
  //  select(node)
  //     .selectAll('rect')
  //     //.data(this.props.data)
  //     .data(count)
  //     .enter()
  //     .append('rect')
   //
  //  select(node)
  //     .selectAll('rect')
  //     //.data(this.props.data)
  //     .data(count)
  //     .exit()
  //     .remove()
   //
  //  select(node)
  //     .selectAll('rect')
  //     //.data(this.props.data)
  //     .data(count)
  //     .style('fill', '#fe9922')
  //     .attr('x', (d,i) => i * 25)
  //     .attr('y', d => this.props.size[1] - yScale(d))
  //     .attr('height', d => yScale(d))
  //     .attr('width', 25)
  //  }
  var data = count

  //above is working chart

  // below is new attempted chart
  //data.sort(sort)
		//this filter is required to make sure count is recognized as integers not strings
		// see: http://stackoverflow.com/questions/10709950/get-the-real-max-of-an-array-in-d3

	data.filter(function(d,i) {
	  d.count = +d.count;
	});

	var countArray = [];
	var titleArray = [];

  countArray = data.map(function(d){
    return d.count
  });
  // for (x in data){
	// 	countArray.push(data[x].count);
  //
	// };
  titleArray = data.map(function(d){
    return d.title
  });
	// for (x in data){
	// 	titleArray.push(data[x].title);
	// };

	var margin = {top: 30, right: 30, bottom: 40, left: 50}
	var height = 500 - margin.top - margin.bottom,
	width = 1200 - margin.left - margin.right;
	//barWidth = 50,
	//barOffset = 5;

	var colors = d3.scale.linear()
		.domain([0, data.length*.80,  data.length])
		.range(['#FFB832', '#C61C6F']);


	//var xScale = d3.scale.linear()
		//.domain([0, d3.max(countArray)])
		//.range([0, height]);

	//var yScale = d3.scale.ordinal()
		//.domain(d3.range(0, data.length))
		//.rangeBands([0, height])

	var yScale = d3.scale.linear()
		.domain([0, d3.max(countArray)])
		.range([0, height]);

	var xScale = d3.scale.ordinal()
		.domain(d3.range(0, data.length))
		.rangeBands([0, width], .5)




	// var tooltip = d3.select('body').append('div')
	// 	.attr('class', 'tooltip')
	// 	.style('position', 'absolute')
	// 	.style('padding', '0 10px')
	// 	.style('background', 'white')
	// 	.style('opacity', 0)

    const node = this.node
    //var canvas = d3.select("div#" + chart).append("svg")
    var canvas = d3.select(node)
      //.attr("id", chart)
		//.style('background', '#E7E0CB')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append("g")
		.attr('transform', 'translate(' + margin.left + ', ' + margin.top +')')
		.selectAll("rect")
			.data(data)
			.enter()
			.append("g")
				.append("rect")
					.style('fill', function(d,i){
						return colors(i);
					})
					.attr('height', 0)
					.attr('y', height)
					.attr("width", xScale.rangeBand())
					.attr("x", function (d,i) {return xScale(i);})


					.on('mouseover', function(d) {
						tooltip.transition()
							.style('opacity', .9)

						tooltip.html("<a href='" + d.item + "'>" + d.title + "</a>. Quoted " + d.count + " times")
							.style('left', (d3.event.pageX + 0) + 'px')
							.style('top', (d3.event.pageY + 0) + 'px')
							.style('left', d3.select(node).left + 150 + 'px')
							.style('top', d3.select(node).top + 125 + 'px')

							d3.select(this)
								.style('opacity', .5);
					})
					.on('mouseout', function(d) {
						//tooltip.transition().style('opacity', 0)
						d3.select(this)
							.transition()
							.style('opacity', 1);
					})


		//canvas.transition()
    canvas.transition()
			.attr("height", function (d) {return yScale(d.count)})
			.attr("y", function(d) { return height - yScale(d.count) })
			.delay(function(d,i){return i * 10})
			.duration(1000)
			.ease('elastic')

			var vGuideScale = d3.scale.linear()
				.domain([0, d3.max(countArray)])
				.range([height, 0])

			var vAxis = d3.svg.axis()
				.scale(vGuideScale)
				.orient('left')
				.ticks(10)
			var vGuide = d3.select(node).append('g')
				vAxis(vGuide)
				vGuide.attr('transform', 'translate('+ margin.left+', '+margin.top + ')')
				vGuide.selectAll('path')
					.style({fill: 'none', stroke: "#000"})
				vGuide.selectAll('line')
					.style({ stroke: "#000"})

			//var horizontalGuideScale = d3.scale.ordinal()
				//.domain([0, d3.max(countArray)])
				//.range([height, 0])

			var hAxis = d3.svg.axis()
				.scale(xScale)
				.orient('bottom')
				.tickValues(xScale.domain().filter(function(d, i){
					return i % 50 === 0
				}
				));

        var hGuide = d3.select(node).append('g')
				hAxis(hGuide)
				hGuide.attr('transform', 'translate('+ margin.left+', '+ (height + margin.top) + ')')
				hGuide.selectAll('path')
					.style({fill: 'none', stroke: "#000"})
				hGuide.selectAll('line')
					.style({ stroke: "#000"})
		}
render() {
      return(
          <svg ref={node => this.node = node}
          width={500} height={500}>
          </svg>


    )
   }
}
//module.exports = BarChart;

export default connect(
	(state) => {
		return state
	}
)(BarChart);
