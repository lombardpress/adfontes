import React, { Component } from 'react'
var {connect} = require('react-redux');
var actions = require('actions');





class Image extends React.Component {
   constructor(props){
      super(props)

  }
   componentDidMount() {

   }
   componentDidUpdate(count) {

   }
   render(){
     var _this = this;
     console.log("images data", _this.props.images);
     function showImages(){
       var images = _this.props.images;
       console.log("length", images.images.length)
       if (images.visible && images.images.length > 0){
         return images.images.map(function(image){
           var imageUrl = image.url;
           return(
             <div>
               TEST2
             <img src={imageUrl + "/full/full/0/default.jpg"}/>
             </div>
             )
           }
         )

       }
     }
     return(
       <div className="images">
         TEST1
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
