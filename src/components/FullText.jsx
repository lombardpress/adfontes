import React, { Component } from 'react'
import $ from 'jquery';
var {connect} = require('react-redux');
var actions = require('../actions/actions');

var cetei = require("../vendor/CETEI");


class FullText extends React.Component {
   constructor(props){
      super(props)
      this.handleToggleFullText = this.handleToggleFullText.bind(this)

  }
  componentDidUpdate() {
    var _this = this;
		const htmlText = new cetei()
		if (this.props.fullText.textInfo.text){
			htmlText.makeHTML5(this.props.fullText.textInfo.text, function(data){
				// get id of quote
				const quoteid = _this.props.focusedQuotation.id.split("/").pop();
        const sourceid = _this.props.focusedQuotation.source.split("/").pop();

				//load text in div
				_this.refs.text.replaceChild(data, _this.refs.text.childNodes[0]);
        let selfTopPos = ""
        try{
          // find quote in text if there and change class to highlighted
  				if (data.querySelector("#" + quoteid)){
  					data.querySelector("#" + quoteid).setAttribute("class", "highlighted");
  				}
          selfTopPos = document.getElementById(quoteid).offsetTop;
        }
        catch(e){
          // find quote in text if there and change class to highlighted
  				if (data.querySelector("#" + sourceid)){
  					data.querySelector("#" + sourceid).setAttribute("class", "highlighted");
  				}
          selfTopPos = document.getElementById(sourceid).offsetTop;
        }

        console.log("scroll", selfTopPos);
        $(".full-text-wrapper").animate({ scrollTop: selfTopPos-100 }, 400);

			});
		}


  }
  handleToggleFullText(e){
    e.preventDefault();
    var {dispatch} = this.props;
 		dispatch(actions.toggleFullTextDisplay(this.props.fullText.visible));

  }
  render(){
     var _this = this;

     return(
       <div className="full-text-wrapper">
         <div id="text-tool-bar">
           <button id="hide-full-text" onClick={this.handleToggleFullText}>Hide Text</button>
         </div>
         <div id="text" ref="text"><div/>
       </div>

       </div>
     )
   }
 }

//module.exports = BarChart;

export default connect(
	(state) => {
		return state
	}
)(FullText);
