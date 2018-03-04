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
import Images from "Images";
import FullText from "FullText";


var TodoApp = React.createClass({
	render: function(){
		var _this = this;
		function barGraphDisplay(){
			if (_this.props.chart.visible){
				return(
					<div className="chart">
						<BarChart size={[500,500]}/>
					</div>
				)
			}
    }
		function imagesDisplay(){
			if (_this.props.images.visible){
				return(
					<div>
					<Images/>
						<div className="column5">
							<Paragraph/>
						</div>
					</div>
				)
			}
    }
		function fullTextDisplay(){
			if (_this.props.fullText.visible){
				return(
					<FullText/>
				)
			}
    }
		function quotationDisplay(){
			if (!_this.props.chart.visible && !_this.props.images.visible && !_this.props.fullText.visible){
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
					<div className='search column1'>
						<Search/>
					</div>
					{quotationDisplay()}
					{barGraphDisplay()}
					{imagesDisplay()}
					{fullTextDisplay()}

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
