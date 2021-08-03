import React from 'react';
import cetei from "../vendor/CETEI"
import Surface3Wrapper from '@bit/jeffreycwitt.lbp.surface3wrapper';
import Citation from '@bit/jeffreycwitt.lbp.citation';
//import {FaExpand, FaCompress} from 'react-icons/fa';
var {connect} = require('react-redux');
var actions = require('../actions/actions');

//import CETEI from '../../node_modules/CETEIcean/src/CETEI';





class Paragraph extends React.Component{
  constructor(props){
    super(props)
    this.handleShowImages = this.handleShowImages.bind(this)
    this.handleImageWrapperWraperClick = this.handleImageWrapperWraperClick.bind(this)
    this.handleShowFullText = this.handleShowFullText.bind(this)
    this.runQueryForSource = this.runQueryForSource.bind(this)
    this.addTEICustom = this.addTEICustom.bind(this)
    this.handleClearFilters = this.handleClearFilters
    this.state = {
      imageSize: "200",
      imageFocus: false
    }
  }
  handleImageWrapperWraperClick(){
    this.setState((prevState) => {
      const imageSize = prevState.imageSize === "200" ? "725" : "200"
      const imageFocus = prevState.imageFocus ? false : true
      return{
        imageSize,
        imageFocus
      }
    })


  }
  handleShowImages(e){
    e.preventDefault();
    var {dispatch} = this.props;
    dispatch(actions.fetchImages());
    dispatch(actions.toggleImagesDisplay(this.props.images.visible));
  }
  handleShowFullText(e){
    e.preventDefault();
    var {dispatch} = this.props;
    if (this.props.type === "source"){
      dispatch(actions.fetchFullText(true));
    }
    else{
      dispatch(actions.fetchFullText(false));
    }
    dispatch(actions.toggleImagesDisplay(true));
    dispatch(actions.toggleFullTextDisplay(this.props.fullText.visible));
  }
  componentDidMount(e){
    var _this = this;
    this.addTEICustom()
  }
  componentDidUpdate(e){
    var _this = this;
    this.addTEICustom()
  }
  addTEICustom(){
    var _this = this;
    const htmlText = new cetei()
    let paragraph = {}
    if (this.props.type === "source"){
      paragraph = this.props.sourceParagraph;
    }
    else{
      paragraph = this.props.paragraph;
    }
    if (paragraph.paragraph_text){
      htmlText.makeHTML5(paragraph.paragraph_text, function(data){
        // get id of quote
        if (_this.props.focusedQuotation.id){
          const quoteid = _this.props.focusedQuotation.id.split("/").pop();
          // find quote in text if there and change class to highlighted
          if (data.querySelector("#" + quoteid)){
            data.querySelector("#" + quoteid).setAttribute("class", "highlighted");
          }
          //load text in div
          _this.refs.text.replaceChild(data, _this.refs.text.childNodes[0]);
        }

      });
    }
    else{
      const emptyTextNode = document.createTextNode("");
      _this.refs.text.replaceChild(emptyTextNode, _this.refs.text.childNodes[0]);
    }
  }
  runQueryForSource(sourceId){

    var {dispatch, search} = this.props;

    var quotationWorkPart = sourceId



    var searchParameters = {
      quotationWorkPart
    }
    // clear search parameters
    this.handleClearFilters()
		// set new search parameters
    dispatch(actions.setSearchParameters(searchParameters));
		// (ideally after the handleClearFilters has finished) set search parameters to include quotationWorkPart
		dispatch(actions.fetchQuotationWorkParts());
		// fetch quotations based on the source part id
		dispatch(actions.fetchQuotations());
		//fetch chart to match new query
		// TODO: seems like it would be better for chart fetch only when view is requested
    dispatch(actions.fetchChart());

  }
	//TODO: this function is mostly a repeat of the clearFilters function in the Search component
	//this seems like an unnecessary redundancy; perhaps this can become a generic action or common utility function
  handleClearFilters(e){

    var {dispatch, search} = this.props;
    dispatch(actions.clearSearchParameters());
    dispatch(actions.clearCanonicalQuotations());
    dispatch(actions.clearQuotations());
		dispatch(actions.fetchQuotationWorkParts());
    dispatch(actions.fetchExpressionParts());
    //dispatch(actions.fetchCanonicalQuotations());
    dispatch(actions.fetchQuotationAuthors());
    dispatch(actions.fetchExpressionAuthors());
    dispatch(actions.fetchSearchWorksList());
    //store.dispatch(actions.fetchExpressionTypes());
    dispatch(actions.fetchQuotationWorksList());
    dispatch(actions.fetchWorkGroups());
    dispatch(actions.fetchAuthorTypes());
    //dispatch(actions.fetchManifestationQuotations(searchText, quotationType, expressionId));
    dispatch(actions.clearManifestationQuotations());

    // date refs won't clear until place for them in the store has been created
	    // this.refs.quotationAuthorDateAfter.value = "";
	    // this.refs.quotationAuthorDateBefore.value = "";
	    // this.refs.expressionAuthorDateAfter.value = "";
	    // this.refs.expressionAuthorDateBefore.value = "";
			//this.refs.searchText.value = "";



  }
  render(){
    var _this = this;
    let paragraph = {}
    if (this.props.type === "source"){
      paragraph = this.props.sourceParagraph;
    }
    else{
      paragraph = this.props.paragraph;
    }
    //var {paragraph} = this.props;
    var {expression_id, manifestation_id, transcription_id, manifestations, paragraph_text, review} = paragraph
    // var domParser = new DOMParser();
    // var xsltProcessor = new XSLTProcessor();
    //
    // var xsltText = '<?xml version="1.0" encoding="UTF-8"?><xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"  xmlns:xs="http://www.w3.org/2001/XMLSchema"  exclude-result-prefixes="xs"  version="1.0" xmlns:tei="http://www.tei-c.org/ns/1.0">  <xsl:output method="html"/>  <xsl:template match="/">    <xsl:apply-templates select="//tei:body"/>  </xsl:template>  <xsl:template match="tei:p">      <xsl:apply-templates/>    </xsl:template>  <xsl:template match="tei:quote">    "<xsl:apply-templates/>"  </xsl:template>  <xsl:template match="tei:rdg">      </xsl:template>  <xsl:template match="tei:note">      </xsl:template>  <xsl:template match="tei:bibl">      </xsl:template>  <xsl:template match="tei:reg">      </xsl:template>  <xsl:template match="tei:corr">      </xsl:template>  </xsl:stylesheet>';
    // var xsltDoc = domParser.parseFromString(xsltText, "text/xml");
    // xsltProcessor.importStylesheet(xsltDoc);
    //
    // var xmlText = paragraph_text;
    // var xmlDoc = domParser.parseFromString(xmlText, "text/xml");
    // var fragment = xsltProcessor.transformToFragment(xmlDoc, document);
    //
    // var parent = document.createElement("div");
    // parent.appendChild(fragment);
    // var text =  parent.innerHTML;

    function showImageToggle(){

      if (paragraph.expression_id){
        return(
          <p>
            <a onClick={_this.handleShowImages}>Toggle Image</a>
          </p>
        )
      }

    }
    function showFullTextToggle(){

      if (paragraph.expression_id){
        return(
          <p>
            <a onClick={_this.handleShowFullText}>Show Full Text</a>
          </p>
        )
      }

    }

    function showReview(){
      if (review){
        var reviewLink  = "https://dll-review-registry.scta.info/reviews/" + review["id"] + ".html";
        var ipfsGatewayLink  = "https://gateway.scta.info/ipfs/" + review["ipfs-hash"];
        return(
          <p>
            <a href={reviewLink} target="_blank"><img src={review["badge-url"]}/></a> Content extracted from reviewed data source <a href={ipfsGatewayLink} target="_blank">{review["ipfs-hash"]}</a>
          </p>
        )
      }
    }
    function showLbpLink(){

    }
    let newManifestations = []
    if (manifestations && manifestations.constructor === Array) {
      newManifestations = manifestations.map((m) => {
        return {
          manifestation: m,
          manifestationTitle: m.split("/resource/")[1],
          transcription:""
        }
      })
    }
    else if (typeof manifestations === "string")
    {
      newManifestations = [{
        manifestation: manifestations,
        manifestationTitle: manifestations.split("/resource/")[1],
        transcription:""
      }]
    }
    return(


      <div>
        <p>Context Paragraph</p>
        <div id="text" ref="text"><div/></div>
        {manifestation_id &&
          <div id="imageWrapperWrapper" className={this.state.imageFocus ? "iww-big" : "iww-small"}>
          {this.state.imageFocus ? <hr className="toggleBar" title="click to minimize" onClick={this.handleImageWrapperWraperClick}/> : <hr className="toggleBar" title="click to maximize" onClick={this.handleImageWrapperWraperClick}/>}
          <Surface3Wrapper
           manifestations={newManifestations}
           focusedManifestation={manifestation_id}
           width={this.state.imageSize}
         />
         </div>
          //showImageToggle()
        }
        {showFullTextToggle()}
        {manifestation_id && <p><a href={"https://scta.lombardpress.org/res?resourceid=" + manifestation_id} target="_blank">View in LbpWeb</a></p>}
        {
        //  showReview()
        }
        {(this.props.type === "source" && this.props.focusedQuotation.id) && <p className="link" onClick={() => {this.runQueryForSource(this.props.sourceParagraph.expression_id.split("/resource/")[1])}}>Search Quotations of this Passage Only</p>}
        {
          // no longer needed since citation component is in place
          //manifestation_id && <p><a href={manifestation_id}>{manifestation_id}</a></p>
        }
        {manifestation_id && <Citation tresourceid={transcription_id}/>}
      </div>
    )
  }
}

export default connect(
  (state) => {
    return state
  }
)(Paragraph);
