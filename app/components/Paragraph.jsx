var React = require('react');
var {connect} = require('react-redux');



export var Paragraph = React.createClass({
	render: function(){
		console.log(this.props)
    var {paragraph} = this.props;
		var {expression_id, paragraph_text} = paragraph

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
		console.log(text); //





		// xslt conversion
		// function loadXMLDoc(filename) {
    //     if (window.ActiveXObject) {
    //          xhttp = new ActiveXObject("Msxml2.XMLHTTP");
    //     } else {
    //          xhttp = new XMLHttpRequest();
    //     }
    //     xhttp.open("GET", filename, false);
    //     xhttp.send("");
    //     return xhttp.responseXML;
    //  }
		//
    //  xml = loadXMLDoc("test.xml");
    //  xsl = loadXMLDoc("test.xsl");
    //  if (document.implementation && document.implementation.createDocument) {
    //     xsltProcessor = new XSLTProcessor();
    //     xsltProcessor.importStylesheet(xsl);
    //     resultDocument = xsltProcessor.transformToFragment(xml, document);
    //     document.getElementById('container').appendChild(resultDocument);
    //  }




		return(


			<div className="container">
				<p>Context Paragraph</p>
				<div id="text">{text}</div>
				<a href={expression_id}>{expression_id}</a>
			</div>
		)
	}
});

export default connect(
	(state) => {
		return state
	}
)(Paragraph);
