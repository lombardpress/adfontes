var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
//import CETEI from '../../node_modules/CETEIcean/src/CETEI';
var cetei = require("../vendor/CETEI");



export var Paragraph = React.createClass({
	handleShowImages: function(e){
		e.preventDefault();
		var {dispatch} = this.props;
		dispatch(actions.fetchImages());
		dispatch(actions.toggleImagesDisplay(this.props.images.visible));
	},
	handleShowFullText: function(e){
		e.preventDefault();
		var {dispatch} = this.props;
		dispatch(actions.fetchFullText());
		dispatch(actions.toggleImagesDisplay(true));
		dispatch(actions.toggleFullTextDisplay(this.props.fullText.visible));
	},
	componentDidMount: function(){
		var _this = this;
		this.addTEICustom()
	},
	componentDidUpdate: function(){
		var _this = this;
		this.addTEICustom()
	},
	addTEICustom(){
		var _this = this;
		const htmlText = new cetei()
		if (this.props.paragraph.paragraph_text){
			htmlText.makeHTML5(this.props.paragraph.paragraph_text, function(data){
				// get id of quote
				const quoteid = _this.props.focusedQuotation.id.split("/").pop();
				// find quote in text if there and change class to highlighted
				if (data.querySelector("#" + quoteid)){
					data.querySelector("#" + quoteid).setAttribute("class", "highlighted");
				}
				//load text in div
				_this.refs.text.replaceChild(data, _this.refs.text.childNodes[0]);

			});
		}
		else{
			const emptyTextNode = document.createTextNode("");
			_this.refs.text.replaceChild(emptyTextNode, _this.refs.text.childNodes[0]);
		}
	},
	render: function(){
		var _this = this;
		console.log(this.props);
    var {paragraph} = this.props;
		var {expression_id, manifestation_id, paragraph_text, review} = paragraph
		var domParser = new DOMParser();
		var xsltProcessor = new XSLTProcessor();

		var xsltText = '<?xml version="1.0" encoding="UTF-8"?><xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"  xmlns:xs="http://www.w3.org/2001/XMLSchema"  exclude-result-prefixes="xs"  version="1.0" xmlns:tei="http://www.tei-c.org/ns/1.0">  <xsl:output method="html"/>  <xsl:template match="/">    <xsl:apply-templates select="//tei:body"/>  </xsl:template>  <xsl:template match="tei:p">      <xsl:apply-templates/>    </xsl:template>  <xsl:template match="tei:quote">    "<xsl:apply-templates/>"  </xsl:template>  <xsl:template match="tei:rdg">      </xsl:template>  <xsl:template match="tei:note">      </xsl:template>  <xsl:template match="tei:bibl">      </xsl:template>  <xsl:template match="tei:reg">      </xsl:template>  <xsl:template match="tei:corr">      </xsl:template>  </xsl:stylesheet>';
		var xsltDoc = domParser.parseFromString(xsltText, "text/xml");
		xsltProcessor.importStylesheet(xsltDoc);

		var xmlText = paragraph_text;
		var xmlDoc = domParser.parseFromString(xmlText, "text/xml");
		var fragment = xsltProcessor.transformToFragment(xmlDoc, document);

		var parent = document.createElement("div");
		parent.appendChild(fragment);
		var text =  parent.innerHTML;

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
				var reviewLink  = "http://dll-review-registry.scta.info/reviews/" + review["id"] + ".html";
				var ipfsGatewayLink  = "http://gateway.scta.info/ipfs/" + review["ipfs-hash"];
				return(
					<p>
						<a href={reviewLink} target="_blank"><img src={review["badge-url"]}/></a> Content extracted from reviewed data source <a href={ipfsGatewayLink} target="_blank">{review["ipfs-hash"]}</a>
					</p>
				)
			}
		}

		return(


			<div>
				<p>Context Paragraph</p>
				<div id="text" ref="text"><div/></div>
				<a href={manifestation_id}>{manifestation_id}</a>
				{showImageToggle()}
				{showFullTextToggle()}
				{showReview()}
			</div>
		)
	}
});

export default connect(
	(state) => {
		return state
	}
)(Paragraph);
