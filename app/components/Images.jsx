import React, { Component } from 'react'
var {connect} = require('react-redux');
var actions = require('actions');
var cetei = require("../../node_modules/CETEIcean/src/CETEI");





class Image extends React.Component {
   constructor(props){
      super(props)
      this.handleToggleImage = this.handleToggleImage.bind(this)

  }
   componentDidMount() {

   }
   componentDidUpdate(count) {

   }
   handleToggleImage(e){
    e.preventDefault();
    var {dispatch} = this.props;
 		dispatch(actions.toggleImagesDisplay(this.props.images.visible));

   }
   render(){
     var _this = this;
     function showImages(){
       var images = _this.props.images;
       if (images.visible && images.images.length > 0){
         return images.images.map(function(image){
           var imageUrl = image.url;
           return(
             <img src={imageUrl + "/full/1000,/0/default.jpg"}/>
           )
           }
         )

       }
     }
     return(
       <div className="images">
         {showImages()}
       </div>
     )
   }
 }
//module.exports = BarChart;

export default connect(
	(state) => {
		return state
	}
)(Image);
