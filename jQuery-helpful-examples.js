/*************************************************************************
 * Devtr0n Productions:
 *************************************************************************
 *
 * Description:
 * This file contains helpful jQuery functions and examples I have come across or written 
 * for specific UI needs at work. This is mainly for me to reference when I don't want to 
 * re-invent the wheel again.
 * 
 * Author:
 * Richard Hollon - 4/15/2015
 *
 *************************************************************************/

//Disable UI field function
function DisableFld(targetElemId, includeParent) {

    //determine if field being disabled is a checkbox or not
    if ($("#" + targetElemId).is(":checkbox")) {
        document.getElementById(targetElemId).checked = false;
        document.getElementById(targetElemId).value = 'no'; //checkbox disabled value
        
    } else {
        document.getElementById(targetElemId).value = ''; //textbox disabled value
    }
    
    //disable & grey the target control
    document.getElementById(targetElemId).disabled = true;
    document.getElementById(targetElemId).style.backgroundColor = '#DADADA'; 

    if (includeParent == true)
        document.getElementById(targetElemId).parentElement.style.backgroundColor = '#DADADA'; // and it's parent cell
}

//Enable UI field function
function EnableFld(targetElemId, includeParent) {
    document.getElementById(targetElemId).disabled = false;
    document.getElementById(targetElemId).style.backgroundColor = '#FFFFFF';
    if (includeParent == true)
        document.getElementById(targetElemId).parentElement.style.backgroundColor = '#FFFFFF';
}

//Textbox click event function
function ToggleTextBox(chkBoxName, targetElemId) {
    if (document.getElementById(chkBoxName).checked == true) {
        EnableFld(targetElemId, false); //enable "Other" textbox field
    }
    else {
        DisableFld(targetElemId, false); //disable "Other" textbox field
    }
}

//Disable all "Other" textboxes 
function DisableAllOtherTextBoxesPart7() {

    var textElems = $("input[id$='ComplianceStatusYesOtherDesc']"); //"Other" textboxes
    var chkElems = $("input[id$='ComplianceStatusYesOther']");      //"Other" checkboxes
    var index;
   
    for (index = 0; index < textElems.length; index++) {

        var text_value = $(textElems[index]).val();                 //textbox value
        var check_value = $(chkElems[index]).is(":checked");        //checkbox value

        //if textbox is empty AND the checkbox is NOT checked, let's disable the textbox!
        if (text_value.length == 0 && !check_value) {
            DisableFld(textElems[index].id, false);
        }
        
    }
    
}

function clearDisabledValues() {

    //Part 2, Part 3, Part 4, Part 5, Part 6 value cells array (** excluding "Total" cells)
    var elems = $('[id^=transitionService], [id^=academicAndVocationalOutcomes], [id^=academicPerformanceReading], [id^=academicPerformanceMath], [id^=studentParticipation]').not('[id*="Total"]');

    //determine if each UI cell is disabled
    $(elems).each(function() {
        if ($(this).hasClass('backgroundReadOnly')) {
            $(this).val(''); //clear all disabled fields that do not have totals in their value.
        }
    });
	
    //force these totals to appear for Part 5 & Part 6 by calling the UI element's 'onBlur()' event
    $('[id^="academicPerformanceReading_part5ReadingPrePostNo1P"]').blur();
    $('[id^="academicPerformanceMath_part6MathPrePostNo1P"]').blur();	

	//////////////////// older code /////////////////////////
    $('[id^=academicPerformanceReading]').each(function() {
        if ($(this).hasClass('backgroundReadOnly')) {
            $(this).val('');
        }
    });

    $('[id^=academicPerformanceMath]').each(function() {
        if ($(this).hasClass('backgroundReadOnly')) {
            $(this).val('');
        }
    });

    $('[id^=academicAndVocationalOutcomes]').each(function() {
        if ($(this).hasClass('backgroundReadOnly')) {
            $(this).val('');
        }
    });

    $('[id^=studentParticipation]').not('[id*="genderTotal"]').not('[id*="ageTotal"]').not('[id*="raceTotal"]').each(function() {
        if ($(this).hasClass('backgroundReadOnly')) {
            $(this).val('');
        }
    });        
}

////////////////////////////// ANIMATION //////////////////////////////////////////////
// <link rel="stylesheet" href="./Portfolio_files/animate.css">
$(document).ready(function() {
	
	var elems = $('[id^=img]');
	
    $(elems).each(function() {
		animationHover(this, 'bounce'); //add the bounce mechanism to each image
    });
	
});

function animationHover(element, animation){
    element = $(element);
    element.hover(
        function() {
            element.addClass('animated ' + animation);        
        },
        function(){
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
            }, 2000);         
        });
}
/////////////////////////////////////////////////////////////////////////////////////////