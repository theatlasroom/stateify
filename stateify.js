/*
 *	Stateify
 * 
 *  A set of functions to abstract dealing with states of elements in the ui.
 * 
 *  Author: Ezekiel Kigbo | @theatlasroom
 *  Created: 13/7/2012
 * 
 * 
 */
//define the clasess
var uiclass = {
	inactive: ".uia-inactive",
	selected: ".uia-selected",
	hidden: ".uia-hidden"	
}
//define the states
var uistate = {
	inactive: "uia-inactive",
	selected: "uia-selected",
	hidden: "uia-hidden"
}

function ActivateIfSelected(elem, target){
	if (HasSelected(elem))
		Activate(target);
	else 		
		Deactivate(target);	
}

function Activate(elem){if (NotActive(elem)) $(elem).removeClass(uistate.inactive);}
function Deactivate(elem){
	if (!NotActive(elem)){ 
		$(elem).addClass(uistate.inactive);
		//unselect any children that are selected
		$($(elem).find(uiclass.selected)).each(function(){ToggleState($(this), uistate.selected);});			
	}
}

function IsSelected(elem){
	//return true if the item is the selected state	
	return InState(elem, uistate.selected);		
}

function IsInactive(elem){
	//return true if the item is inactive	
	return InState(elem, uistate.inactive);
}

function IsHidden(elem){
	//return true if the item is inactive	
	return InState(elem, uistate.hidden);	
}

function HasHidden(elem){
	//console.log($(elem).find(uiclass.selected));
	return HasChildInState(elem, uiclass.hidden);	
}

function HasInactive(elem){
	//console.log($(elem).find(uiclass.selected));
	return HasChildInState(elem, uiclass.inactive);	
}


function HasSelected(elem){
	//console.log($(elem).find(uiclass.selected));
	return HasChildInState(elem, uiclass.selected);
}

function NotActive(elem){
	//checks if this element or its parents are set to inactive
	var inactive = $(elem).parents(uiclass.inactive);
	if ($(inactive).length > 0 || $(elem).hasClass(uistate.inactive))
		return true;
	return false;
}

function RemoveSiblingState(elem, state){
	var sib_selector = "."+state;
	//iterate over the siblings of this element and remove the uia class from them
	$(elem).siblings(sib_selector).removeClass(state);
}


function InState(elem, state){
	//return true if the item is in the state specified	
	if ($(elem).hasClass(state))
		return true;
	return false;		
}

function HasChildInState(elem, state){
	if ($(elem).find(state).length > 0)
		return true;
	return false;
}

function ToggleState(elem, state){
	//toggles the state of an element, checks neighbouring to turn them to the off state
	//this assumes only one object can be in a particular state (within a grouping)
	if ($(elem).hasClass(state))
		$(elem).removeClass(state);
	else 
		$(elem).addClass(state);
}

function ToggleSelectedState(elem){
	//check that it is not in the inactive state (ignore the toggle command if it is)
	if (NotActive(elem)) return;
	RemoveSiblingState(elem, uistate.selected);	
	ToggleState(elem, uistate.selected);
} 

function ToggleInactiveState(elem){ToggleState(elem, uistate.inactive);}
function ToggleHiddenState(elem){ToggleState(elem, uistate.hidden);} 
