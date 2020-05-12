import React from 'react'
import $ from 'jquery';

import Surface3Wrapper from '@bit/jeffreycwitt.lbp.surface3wrapper';
import Citation from '@bit/jeffreycwitt.lbp.citation';

import {FaInfo, FaRegImage} from 'react-icons/fa';

var {connect} = require('react-redux');
var actions = require('../actions/actions');



class ManifestationQuotationListItem extends React.Component{
	constructor(props){
		super(props)
		this.handleOnClick = this.handleOnClick.bind(this)
		this.handleToggleShowImage = this.handleToggleShowImage.bind(this)
		this.handleToggleShowCitation = this.handleToggleShowCitation.bind(this)
		this.state = {
      imageSize: "200",
			imageFocus: false,
			showImage: false,
			showCitation: false
    }
	}
	handleToggleShowImage(){
		console.log("test")
		this.setState((prevState) => {
			return({
				showImage: !prevState.showImage
			})
		})
	}
	handleToggleShowCitation(){
		this.setState((prevState) => {
			return({
				showCitation: !prevState.showCitation
			})
		})

	}
	handleOnClick(){
		var {isManifestationOf, id, quotation, dispatch} = this.props;

		var newFocusedQuotationObject = {
			id,
			quotation,
			type: "manifestation"
		}
		dispatch(actions.createFocusedQuotation(newFocusedQuotationObject));

		dispatch(actions.changeManifestationQuotationsFocus(id));
		//dispatch(actions.changeQuotationsFocus(isManifestationOf));
		dispatch(actions.fetchParagraph());

		var topPos = document.getElementById(id).offsetTop;
		$('#ManifestationQuotationsList').animate({ scrollTop: topPos-10 }, 400);

		//synchronize other columns
		if (isManifestationOf != null){
			// create canonicalQuotation
			var isManifestationOfObject = this.props.quotations.find((quotation) => {
				return quotation.id === isManifestationOf;

			});

			if (isManifestationOfObject != undefined){
				//dispatch(actions.createCanonicalQuotation(canonicalQuotationObject));
				// focus canonicalquotation List Item
				dispatch(actions.changeQuotationsFocus(isManifestationOf));
				// scroll
				var topPos = document.getElementById(isManifestationOf).offsetTop;
				$('#quotationsList').animate({ scrollTop: topPos-10 }, 400);

				//the following is repeated in quotation App; it should be abstracted and not repeated
				var isInstanceOf = isManifestationOfObject.isInstanceOf
				if (isInstanceOf != null){
					// create canonicalQuotation
					var canonicalQuotationObject = this.props.canonicalQuotations.find((quotation) => {
						return quotation.id === isInstanceOf

					});

					if (canonicalQuotationObject != undefined){
						dispatch(actions.createCanonicalQuotation(canonicalQuotationObject));
						// focus canonicalquotation List Item
						dispatch(actions.changeCanonicalQuotationsFocus(isInstanceOf));
						// scroll
						var topPos = document.getElementById(isInstanceOf).offsetTop;
						$('#CanonicalQuotationList').animate({ scrollTop: topPos-10 }, 400);
					}
					else{
						//alert("this quotation is assigned to a canonicalQuotation, but either there is an error in the id assigned or a canonicalQuotation record still needs to be made")
						dispatch(actions.clearCanonicalQuotationsFocus());
						dispatch(actions.clearCanonicalQuotation());
					}

				}
			}
			else{
				//alert("this quotation is assigned to a canonicalQuotation, but either there is an error in the id assigned or a canonicalQuotation record still needs to be made")
				dispatch(actions.clearQuotationsFocus());
				dispatch(actions.clearCanonicalQuotation());
			}

		}
		else{
			dispatch(actions.clearQuotationsFocus());
			dispatch(actions.clearCanonicalQuotationsFocus());
			dispatch(actions.clearCanonicalQuotation());

		}


	}

	



	render(){
		var {id, quotation, className, canonicalTranscription} = this.props
		const newManifestations = [{
			manifestation: id,
			manifestationTitle: id.split("/resource/")[1],
			transcription: ""
		}]
    return(
			<div>
				<p id={id} className={className} onClick={this.handleOnClick}>{quotation} 
					<a href={id} className="quotation-citation">{id}</a>
					<span onClick={this.handleToggleShowImage}><FaRegImage/></span> 
					<span onClick={this.handleToggleShowCitation}><FaInfo/></span>
				</p>
				<div>
					{this.state.showImage &&
						<Surface3Wrapper
						manifestations={newManifestations}
						focusedManifestation={id}
						width={this.state.imageSize}
					/>}
					{this.state.showCitation && canonicalTranscription &&
							/* could add citation here (perhaps in hidden drop down) */
						<Citation tresourceid={canonicalTranscription}/>
						}
					</div>
					
			</div>
		)
	}
}

export default connect(
	(state) => {
		return state
	}
)(ManifestationQuotationListItem);
