$(document).ready(function() {

/***
 * General Purpose Code
 */

//Read the json array of card summaries - show activate button - mark current viewed card - adjust rename links
var jsonCardDetailsArray  = (function () {
	 var json = getNewCardDetailsArray();

	 var firstCard;

	 if(window.location.href.indexOf("top-ups") != -1)//top up page
		 firstCard = $("#selectCardIndex").val(); //calculated in the flow
	 else
		 firstCard = getFirstActiveCard(json);

	//view the first active card, otherwise the first unactive card
	 buildViewLinks(firstCard);

	 //set the link of the first card
	 adjustRenameLinkHref();
	 return json;
})();


//alt table rows
function table_alt_rows() {
	$('table tbody tr:not(.blue):even').addClass('alt');
	$('table thead tr th:only-child').addClass('tl-tr');
	$('table thead tr th:first-child:not(:only-child)').addClass('tl');
	$('table thead tr th:last-child:not(:only-child)').addClass('tr');
	$('table tbody tr:last-child').addClass('last');
	$('table tbody tr:last-child td:only-child').addClass('br-bl');
	$('table tbody tr:last-child td:first-child:not(:only-child)').addClass('bl');
	$('table tbody tr:last-child td:last-child:not(:only-child)').addClass('br');

	$('table .sub-table table tr').removeClass('alt');
	$('table .sub-table table tbody tr:nth-child(even)').addClass('alt');
}

/*replicate to the one in behaviour.js
$.ajaxSetup ({
  	 cache: false
});
*/

//this disables the view link in opal cards table when the card is selected
function buildViewLinks(selectedCardIndex){
	$("#selectCardIndex").val(selectedCardIndex);
	var cardIndex;

	//update the previous one to link
	var span = $("span.current-card");
	if(span.length > 0)
	{
		cardIndex = span.attr('id').split('viewLinkId')[1];
		span.replaceWith("<a href='index?cardIndex="+ cardIndex +"' class='dashboard-card-view'>View</a>");
	}

	//update the selected one to span
	var link = $('a.dashboard-card-view[href="index?cardIndex='+ selectedCardIndex +'"]');
	cardIndex = selectedCardIndex;
	link.replaceWith("<span class='current-card' id='viewLinkId"+cardIndex+"'>Current</span>");
}

//parse query string
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    var param = match && decodeURIComponent(match[1].replace(/\+/g, ' '));
	return param;
}


/***
 * first selected card is the card its index:
 * 1- sent in query string
 * 2- or first active card
 * 3- or first unactive card
 */
function getFirstActiveCard(json){
	var index = getParameterByName("cardIndex");
	if(!index){
		index = 0;
		for(var i=0;i<json.length;i++){
			if(json[i].active){
				index = i;
				break;
			}
		}
	}
	return index;
}

/***
 * switch the card image
 */
function switchCardImage(){
	if($("#cardIconName").length > 0 && $("#cardIconName").val())
	{
		$("#card-image").attr("src",contextUrl+"/images/"+$("#cardIconName").val());
	}
}

/********************************************************************************************************************************************************/

/***
 * Card activation
 */
$("#activateButton").live("click",function(event){
	var cardIndex = $('#cardForm input[name=registered_card]:checked').val();
	$.ajax({
		type: "GET",
		data: "ssn=" + $("#ssn").val() + "&cardIndex=" + cardIndex,
		url: $("#contextUrl").val() + "/registered/validateCard",
		success:function(result){
			
			setTimeout(function(){
				if (result === "SuccessfulActivation" || result === "cardnumberFormatException") {
					window.location = $("#contextUrl").val() + "/registered/index?cardIndex=" + cardIndex;
				} else if (result === "SSNLengthError") {
					$(".activationErrorMessages").hide();
					$("#SSNLengthErrorMessage").show();
				} else if (result === "SSNValidationError") {
					$(".activationErrorMessages").hide();
					$("#SSNValidationErrorMessage").show();
				} else if (result === "FailedActivation") {
					$(".activationErrorMessages").hide();
					$("#FailedActivationMessage").show();
				}
			}, 3000);
		}, error: function(response) {
			alert("Unexpected exception: " + response.statusText);
		}

	});
});


/********************************************************************************************************************************************************/

/***
 * Tab links Handling
 */
$("#tab-nav li a").live("click",function(event){
	if($("#selectCardIndex").length > 0){
		event.preventDefault();
		cardIndex = $("#selectCardIndex").val();

		var href = $(this).attr("href");
		if(cardIndex != "" && cardIndex != null)
			href = href + "/?cardIndex=" + cardIndex;
		location.replace(href);
	}

});

/********************************************************************************************************************************************************/

/***
 * Card Details Array Handling
 */

//retrieve new card details array
function getNewCardDetailsArray(){
	var json = null;
	 $.ajax({
	        'async': false,
	        'global': false,
	        'url': contextUrl + '/registered/getJsonCardDetailsArray',
	        'dataType': "json",
	        'success': function (data) {
	        	json = data;
	        	}
	        });
	 return json;
}

//set the jsonCardDetailsArray with a new value
function setNewCardDetailsArray()
{
	jsonCardDetailsArray = getNewCardDetailsArray();
}

/********************************************************************************************************************************************************/


/***
 * Rename Card
 */

//set the proper card index in the rename link
function adjustRenameLinkHref(){
	var cardIndex= $("#selectCardIndex").val();

	var url = contextUrl + "/registered/rename-card?cardIndex="+cardIndex;
	$(".markRenameFormLink").attr('href',url);
}

//call the controller to rename the card
function renameCardServiceCall(){
	var cardIndex= $("#selectCardIndex").val();
	var cardNewName = $("#card-name").val();
	var isSuccess = false;
	if(isValidNickname(cardNewName))
	 $.ajax({
		 	'type': "POST",
	        'async': false,
	        'global': false,
	        'url': contextUrl + '/registered/rename-card-action', //?cardIndex=' + cardIndex + "&cardNewName=" + cardNewName,
	        'data': {cardIndex: cardIndex, cardNickname: cardNewName, CSRFToken: CSRFToken},
	        'dataType': "json",
	        'success': function (status) {
		        	 if(status.isSuccess) // in case the controller succeeded to call rename service
		             {
		            	 isSuccess = true;
		            	 //load the new cards array
		            	 setNewCardDetailsArray();


		            	 if(cardNewName == "")
		            		 cardNewName = jsonCardDetailsArray[cardIndex].cardNumber;

		            	 //rename this card option in the view
		            	 $("#selectCardIndex  option[value='"+cardIndex+"']").html(cardNewName);

		    			 if($("#card-details").length > 0){
		    				//rename the card in the opal cards tables (active and inactive)
			    			 renameCardInOpalCardsTable(cardIndex, cardNewName);

			    			//reload card status table in case of account overview tab
		    				 cardStatusRelaod(cardIndex);
		    			 }

		            	 $("#renameDiv").html("<h1>Rename Opal Card</h1><div class='confirmation-success' style='display: block;'>"+ status.statusMessage + " " + cardNewName +"</div>");

		             }else{

		            	 $("#renameDiv").html("<h1>Rename Opal Card</h1><div class='confirmation-error' style='display: block;'>"+ status.statusMessage +"</div>");
		             }
	        	}
	 });
	return isSuccess;
}

function isValidNickname(value){
	var valid = true;
    var regularExpression =  "^[-a-zA-Z0-9_:,.' '\\\\/\\-]{1,50}$";
    if (value && value.length > 0) {
    	valid = value.search(regularExpression) > -1;
    }
    if(!valid)
    	$("#nicknameErrorDiv p.confirmation-error").show();
    return valid;
 }

/********************************************************************************************************************************************************/

/***
 * Account Overview
 */

/*
 * bind an onchange event to the card dropdown
 */
if ($('#card-details').length > 0) {
	// we are on the dashboard.

	// bind the onchange of the dropdown to load the dashboard-card-status panel
	$("#selectCardIndex").live('change', function() {
		var index = $(this).val();
		$(".card-radio-selection").attr("checked", false);

		if ($("#card_" + index)) {
			$("#card_" + index).attr("checked", true);
		}

		cardStatusRelaod(index);
		adjustRenameLinkHref();
	});

	// bind the "view" links on the dashboard to load the dashboard-card-status panel
	$(".dashboard-card-view").live('click',function(event) {
		event.preventDefault();
		var index= $(this).attr("href").split('=')[1]; // get the id parameter of the "view" link
		$("#selectCardIndex").val(index);
		cardStatusRelaod(index);
		adjustRenameLinkHref();
	});

	//handle rename card
	$(".markRename").live('click',function(event){
		event.preventDefault();

		//call rename card service and update the drop down list
		renameCardServiceCall();
	});

	$(".card-radio-selection").live("change", function(e){
		cardStatusRelaod(this.value);
		$("#selectCardIndex").val(this.value);
		adjustRenameLinkHref();
	});

	//please call this function to reload the card status with a given card index
	function cardStatusRelaod(index){
		$.ajax({
			  url: "dashboard-card-status?cardIndex=" + index ,
			  cache: false,
			  success: function(data) {
			    $('#ajax-panel').html(data).focus();
			    table_alt_rows();
			    buildViewLinks(index);

			    //switch the card image
			    switchCardImage();
			    setTabindex();
			  }
		});
	}

	function renameCardInOpalCardsTable(index,displayName){
		var nameId = "nameCol" + index;
		$("#"+nameId + " label").html(displayName);
	}
}

/********************************************************************************************************************************************************/


/***
 * Card Activities
 */

function loadCardActivities(pageIndex){
	var month 	= $("#selectMonthForCardActivities").val();
	var year 	= $("#selectYearForCardActivities").val();
	var cardId 	= $("#selectCardIndex").val();

	//handle if the customer has left either the month or the year empty
	if(month == -1 || year == -1){
		//make both them equals zero i.e. load the default page
		month = -1;
		year = -1;
	}

	$("#transaction-data tbody").fadeTo('fast', 0.5);					//fade out the table body area
	$(".loader").show();

	$.ajax({
		  url: "opal-card-activities-list?AMonth=" + month + "&AYear=" + year + "&cardIndex=" + cardId + "&pageIndex=" + pageIndex,
		  cache: false,
		  success: function(data) {
		    $('#ajax-panel').html(data);

		    table_alt_rows();
			$(".loader").hide(); 										//also hide the loader when its finished
			$("#transaction-data tbody").fadeTo('fast', 1); 			//unfade the table body area

			$("a, input, select, textarea").each(function(i) {
				$(this).attr("tabindex", i+1);
			});
          Hyphenator.run();
			$("#transaction-data").focus();

			switchCardImage();
		  }
	});
	return false;
}

if($("#selectMonthForCardActivities").length > 0){

	$("#selectMonthForCardActivities").change( function() {
		if(!isEmptyYearOrMonth())
		{
			$(".no-activity").hide();
			loadCardActivities("1");
		}
	});

	$("#selectYearForCardActivities").change( function() {
		if(!isEmptyYearOrMonth()){
			$(".no-activity").hide();
			loadCardActivities("1");
		}
	});

	//check that both month and year are not equals zero
	function isEmptyYearOrMonth(){
		return $("#selectYearForCardActivities").val() == -1 || $("#selectMonthForCardActivities").val() == -1;
	}

	$("#selectCardIndex").live('change',function() {
		loadCardActivities("1");
		adjustRenameLinkHref();
		$(".no-activity").hide();
	});

	//return to the default card activities screen
	$(".markDefaultActivities").live('click',function(event){
		event.preventDefault();
		$("#selectMonthForCardActivities").val(-1);
		$("#selectYearForCardActivities").val(-1);
		loadCardActivities("1");
	});

	//handle dowload activities statment button
	$(".markDownloadPdf").live('click',function(event){
		event.preventDefault();
		if(!isEmptyYearOrMonth()){
			if (!$(".no-activity-list").length) {
				var cardId 	= $("#selectCardIndex").val();
				var month 	= $("#selectMonthForCardActivities").val();
				var year 	= $("#selectYearForCardActivities").val();
				window.location.href = "download-activities-statement?AMonth=" + month + "&AYear=" + year + "&cardIndex=" + cardId;
			} else {
				var aaa = $("#ajax-panel .information").html().replace("<br><br>", "\n\n", "gi");
				// alert(aaa);
			}
		} else {
			$(".no-activity").show();
		}
	});

	//handle rename card
	$(".markRename").live('click',function(event){
		event.preventDefault();
		//call rename card service and update the drop down list
		renameCardServiceCall();
	});

	$(".markPagination").live('click',function(event){
		event.preventDefault();
		var id = $(this).attr('href');
		var pageIndex = id.split("pageIndex=")[1];
		loadCardActivities(pageIndex);
	});
}

/********************************************************************************************************************************************************/

/***
 * Card Activities statement
 */

if($("#orderActivityStatements").length > 0){

	//handle clicking on "Order activity statements"
	$("#orderActivityStatements").click(function(event){
		event.preventDefault();
		var frequency = $("input[name='activity-statement']:checked").val();
		if(frequency !=null && frequency.length > 0){
			 $("#confirmation-message").hide();
			 $(".confirmation-error").hide();
			registerActivityStatement();
		}
		else{
			 $(".confirmation-error p.markConfirmationLine1").html("Please select activity statement frequency.");
			 $(".confirmation-error p.markConfirmationLine2").html("");
			 $("#confirmation-message").show();
			 $(".confirmation-error").show();
		}

	});
}

//confrimation message close link handling
$("a.confirmation-close").live("click", function(event){
	$(this).parents("#confirmation-message").hide();
	event.preventDefault();
});

//call the controller that calls the service that registers the user activity statement
function registerActivityStatement(){
	var frequency = $("input[name='activity-statement']:checked").val();
	var cardIndex 	= $("#selectCardIndex").val();
	var isSuccess = false;
	 $.ajax({
		 	'type': "POST",
	        'async': false,
	        'global': false,
	        'url': contextUrl + '/registered/register-scheduled-activities-statement', //?cardIndex=' + cardIndex + "&frequency=" + frequency,
	        'data': {cardIndex: cardIndex, frequency: frequency, CSRFToken: CSRFToken},
	        'dataType': "json",
	        'success': function (status) {
		        	 if(status.isSuccess) // in case the controller succeeded to call card activities service
		             {
		            	 isSuccess = true;
		            	 $("#confirmation-message").show();
		            	 $(".confirmation-success p.markConfirmationLine1").html(status.statusMessage);
		            	 $(".confirmation-success").show();
		            	 $(".confirmation-success").attr("style","");//overcome ie bug of appending position to the div
		            	 $(".confirmation-success").show();

		             }else{
		            	 $("#confirmation-message").show();
		            	 $(".confirmation-error p.markConfirmationLine1").html(status.statusMessage);
		            	 $(".confirmation-error p.markConfirmationLine2").html(status.statusMessage2);
		            	 $(".confirmation-error").show();
		            	 $(".confirmation-error").attr("style","");//overcome ie bug of appending position to the div
		            	 $(".confirmation-error").show();
		             }
	        	}
	 });
	 return isSuccess;
}

/********************************************************************************************************************************************************/

/***
 * Top up
 */

if($("#topUpForm p.confirmation-error").length){
	var error = $("#topUpForm p.confirmation-error").text();
	error = "<strong>" + error + "</strong>" + "<a class='confirmation-close' href='#' title='Close'></a>";
	$("#topUpForm p.confirmation-error").html(error).attr("style","display: block;");
}

/********************************************************************************************************************************************************/

/***
 * Auto top up
 */

if ($("#ajax-panel-topup").length > 0 ) {

	//load selected card in the drop down list
	var selectedCard = $("#cardIndex").val();
	$("#selectCardForm #selectCardIndex").val(selectedCard);

	var execution = $(document).getUrlParam("execution");
	bindChangeAutoLoadForm();
	bindRemoveAutoLoadForm();

	function refreshTopUpScreenParts(index){
		$("#ajax-panel-topup").load("?execution=" + execution + "&fragments=registered.card-status&_eventId=cardChange&ajaxSource=true&cardIndex=" + index , bindAll);
	}

	$("#selectCardForm #selectCardIndex").live('change', function() {
		adjustRenameLinkHref();
		refreshTopUpScreenParts($(this).val());
		} );

	//handle rename card
	$(".markRename").live('click',function(event){
		event.preventDefault();
		//call rename card service and update the drop down list
		renameCardServiceCall();
	});

}



/* ===================== Change Autoload =====================*/
function processAfterAutoLoadResponse(data, statusText, xhr, $form) {
	$('#confirmation-message .loader').delay(200).fadeOut(function(){
		$('#ajax-confirmation-message').fadeIn();

		//change layout to a card with top up if it is the first time
		if(data.indexOf("confirmation-error") == -1){
			$("#newtopuplabel").hide();
			$(".markAutoTopUpInfoRev").hide();
			$("#current-auto-top-up").show();
			$("#select-current-auto-top-up").show();
			$(".markAutoTopUpInfo").show();
			$('#remove-autoload-form-row').show();

			var currentAutoTopup = $("#selectAutoloadOffer").val();
			var strCurrentAutoTopup = '$' + currentAutoTopup/100;

			var message = jsonValidationMessages["registered.top-up.current-auto-top-up.not-empty"] +  '\xA0' + '\xA0' + strCurrentAutoTopup;
			$('#current-auto-top-up').text(message);
		}
		//end of changing the layout

		// bind the onclick function to the confirmation-close style
		// so that when clicked it fades out the message and fades in the row
		$('.confirmation-close').live("click", function() {
			$('#confirmation-message').fadeOut(function() {
				// $('#autoload-row').fadeIn();
			});

			return false;
		});
		$(".confirmation-success, .confirmation-error").focus();
	} );
}

function processBeforeAutoLoadSubmit(arr, $form, options) {

	// $('#autoload-row').hide(); // hide the row containing the submit button straight away
	$('#ajax-confirmation-message').hide(); // hiding the confirmation message is important. we need to fade it in after the loader
	$('#ajax-confirmation-message').empty(); // empty the div too for good measure
	$('#confirmation-message .loader').show(); // show the loader so it starts spinning straight away
	$('#confirmation-message').fadeIn(); // now fade in the div that contains the loader and the (hidden) ajax-confirmation-message div


}

function bindAll(){
	bindChangeAutoLoadForm();
	bindRemoveAutoLoadForm();
	//switch the card image
	switchCardImage();
}

function bindChangeAutoLoadForm() {

	if ($("#autoloadForm").length != 0) {

		var autoloadFormOptions = {
		        success: processAfterAutoLoadResponse,  // post-submit callback
		        target: '#ajax-confirmation-message',
		        beforeSubmit: processBeforeAutoLoadSubmit
		    };
		$('#autoloadForm').ajaxForm(autoloadFormOptions);
		$('#buttonChangeAutoload').removeAttr("disabled");
	}

}



/* ===================== Remove Autoload =====================*/
function processBeforeRemoveAutoLoadSubmit(arr, $form, options) {

	var answer = confirm(jsonValidationMessages["registered.top-up.auto-top-up.alert"]);
	if (!answer) {
		return false;
	}


	// $('#autoload-row').hide(); // hide the row containing the submit button straight away
	$('#ajax-confirmation-message').hide(); // hiding the confirmation message is important. we need to fade it in after the loader
	$('#ajax-confirmation-message').empty(); // empty the div too for good measure
	$('#confirmation-message .loader').show(); // show the loader so it starts spinning straight away
	$('#confirmation-message').fadeIn(); // now fade in the div that contains the loader and the (hidden) ajax-confirmation-message div


}

function processAfterRemoveAutoLoadResponse(data, statusText, xhr, $form) {
	$('#confirmation-message .loader').delay(200).fadeOut(function(){
		$('#ajax-confirmation-message').fadeIn();
		//change layout to a card without an auto top up
		if(data.indexOf("confirmation-error") == -1){
			$("#current-auto-top-up").hide();
			$("#select-current-auto-top-up").hide();
			$(".markAutoTopUpInfo").hide();
			$(".markAutoTopUpInfoRev").show();
			$("#newtopuplabel").show();
			$('#remove-autoload-form-row').hide();
			$("#selectAutoloadOffer").val('-1');
		}
		// end of changing layout

		// bind the onclick function to the confirmation-close style so that when clicked it fades out the message and fades in the row
		$('.confirmation-close').live("click", function() {
			$('#confirmation-message').fadeOut(function() {
				// $('#autoload-row').fadeIn();
			});
			return false;
		// end of binding the confirmation close
		});
		$(".confirmation-success, .confirmation-error").focus();
		_gaq.push(['_trackEvent', 'Account Activity', 'Remove auto Top-up', 'Remove auto Top-up',0]);
	} );

}


function bindRemoveAutoLoadForm() {

	if ($("#removeAutoloadForm").length != 0) {

		var autoloadFormOptions = {
		        success: processAfterRemoveAutoLoadResponse,  // post-submit callback
		        target: '#ajax-confirmation-message',
		        beforeSubmit: processBeforeRemoveAutoLoadSubmit
		    };

		$('#removeAutoloadForm').ajaxForm(autoloadFormOptions);
		$('#buttonRemoveAutoload').removeAttr("disabled");
	}

}

/********************************************************************************************************************************************************/

/***
 * Account Enquiries
 */

if($("#accountEnquiriesForm").length > 0){
	var cardIndex = getFirstActiveCard(jsonCardDetailsArray);
	var cardNumber = jsonCardDetailsArray[cardIndex].cardNumber;
	if($('#opalCardNumber option[value="'+cardNumber+'"]').length > 0)
		$("#opalCardNumber").val(cardNumber);

}

/********************************************************************************************************************************************************/
});