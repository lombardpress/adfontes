import React, { Component } from 'react'
import Surface3Wrapper from '@bit/jeffreycwitt.lbp.surface3wrapper';
import CitationExplanation from '@bit/jeffreycwitt.lbp.citation-explanation'
var {connect} = require('react-redux');
var actions = require('../actions/actions');
var cetei = require("../vendor/CETEI");





class Images extends React.Component {
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
     const manifestations = [{
         manifestation: "http://scta.info/resource/l1-cpspfs/reims",
         manifestationTitle: "reims",
         transcription: ""
       },
       {
         manifestation: "http://scta.info/resource/l1-cpspfs/svict",
         manifestationTitle: "svict",
         transcription: ""
       },
     ]
     return(
       <div className="images">
       <Surface3Wrapper
        manifestations={manifestations}
        focusedManifestation={"http://scta.info/l1-cpspfs/reims"}
      />
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
)(Images);
