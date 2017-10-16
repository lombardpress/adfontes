var React = require('react');
var {connect} = require('react-redux');
var uuid = require("node-uuid");
var moment = require("moment");



var actions = require('actions');
import Search from "Search";
import QuotationList from "QuotationList";
import FocusedQuotation from "FocusedQuotation";
import CanonicalQuotation from "CanonicalQuotation";
import CanonicalQuotationList from "CanonicalQuotationList";
import ManifestationQuotationList from "ManifestationQuotationList";
import Paragraph from "Paragraph";
import BarChart from "BarChart";


var TodoApp = React.createClass({
	handleGraph: function(e){
		e.preventDefault();
		var {dispatch} = this.props;
		dispatch(actions.toggleGraphDisplay(this.props.chart.visibile));
	},
	render: function(){
		var _this = this
		function barGraphDisplay(){
			if (_this.props.chart.visibile){
				return(
					<div className="chart">
						<BarChart size={[500,500]}/>
					</div>
				)
			}
    }
		function quotationDisplay(){
			if (!_this.props.chart.visibile){
				return(
					<div>
					<div id="CanonicalQuotationList" className="column2">
						<CanonicalQuotationList/>
					</div>
					<div id="quotationsList" className="column3">
						<QuotationList/>
					</div>
					<div id="ManifestationQuotationsList" className="column4">
						<ManifestationQuotationList/>
					</div>
					<div className="column5">
						<Paragraph/>
						{/* <FocusedQuotation/>
						<CanonicalQuotation/> */}
					</div>
				</div>
				)
			}
    }
		return (
			<div>
				<div className="wrapper">
					<a href="#" onClick={this.handleGraph}>Toggle Historgram</a>
					<div className='search column1'>
						<Search/>
					</div>
					{quotationDisplay()}
					{barGraphDisplay()}

				</div>

			</div>
		)
	}
});

//module.exports = ;
export default connect(
  (state) => {
		return state
	}
)(TodoApp);
