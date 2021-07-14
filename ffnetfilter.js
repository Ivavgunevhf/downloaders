// Some weird element to delete bc it get in the way.
if($('div[style*="margin-top:5px;float:right;width:160px;margin-left:5px;text-align:right;"]').length>0){
	$('div[style*="margin-top:5px;float:right;width:160px;margin-left:5px;text-align:right;"]')[0].remove();
}

$('body').append('<style>.ignored_work{opacity:.5}</style>')
if(localStorage.getItem('hide_ignored_stories')||localStorage.getItem('hide_ignored_stories')=="true"){
	$('body').append('<style>.ignored_work{display:none;}</style>')
}

var characterList = $('select[name="characterid1"]').html();

$('.btn:contains("Filters")').after('<span class="lc"><span onclick="$(\'#ffnet_extended_modal\').modal();" class="btn">Filter Extended</span></span>');

$('body').append(`
<div class="modal fade hide in" id="ffnet_extended_modal">
<div class="modal-body"><h6>Filter Extender by <a href="https://github.com/Ivavgunevhf/downloaders/">Ivavgunevhf</a></h6>Choose Characters to Include as a Pairing [CharA, CharB] and mark the <span style="background:#32a848;color:#fff">background</span>
<div style="height:10px"></div>

<!-- When the user changes the select, it will update the acceptedStrings textarea -->
<select onchange="updateAcceptedStrings()" title="character 1 filter" class="ffnet_extended" id="ffnet_extended_charA"></select>
<select onchange="updateAcceptedStrings()" title="character 2 filter" class="ffnet_extended" id="ffnet_extended_charB"></select>

<input type="checkbox" id="only_characters" name="only_characters" value="true" onchange="updateAcceptedStrings()"><label style="display: inline;" for="only_characters">Only Characters*</label>

<div style="height:10px"></div>
*Mark if CharA and CharB are the only characters defined in the work.
<div style="height:10px"></div>
Manually Edit <span style="color:blue;cursor:pointer;text-decoration:underline;" onclick="$('#ffnet_extended_acceptedStrings_edit').toggle()">(Show/Hide)</span>
<div id="ffnet_extended_acceptedStrings_edit" style="display:none;">
<div>
<li>If you wish to manually edit, create a new line, then use add the string you want.</li>
<li>Ex. Create a new line then add the following<code>Drarry</code>.</li>
<li>This will now mark the works that include the words "Drarry" with any capitalization.</li>
<li>Any changes to the filters above will remove changes to this box.</li></div>
<textarea id="ffnet_extended_acceptedStrings" style="width:100%;height:150px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box"></textarea>
</div>
<div style="height:10px"></div><hr><div style="height:10px"></div>
Mark with <span style="background:#5ab96c;opacity:.95;color:#fff;">Secondary Markings</span>
<div style="height:10px"></div>
<input type="checkbox" id="mark_possible" name="mark_possible" value="true" onchange="updatePossibleStrings()"><label style="display: inline;" for="mark_possible">Could be the Only Characters</label><br>
<input type="checkbox" id="mark_poly" name="mark_poly" value="true" onchange="updatePossibleStrings()"><label style="display: inline;" for="mark_poly">Include Poly Pairings*</label>
<div style="height:10px"></div>
* [CharA, CharB, CharC] or some arrangement similar.
<div style="height:10px"></div>
Manually Edit <span style="color:blue;cursor:pointer;text-decoration:underline;" onclick="$('#ffnet_extended_possibleStrings_edit').toggle()">(Show/Hide)</span>
<div id="ffnet_extended_possibleStrings_edit" style="display:none;">
<li>If you wish to manually edit, create a new line, then use add the string you want.</li>
<li>Ex. Create a new line then add the following<code>Drarry</code>.</li>
<li>This will now mark the works that include the words "Drarry" with any capitalization.</li>
<li>Any changes to the filters above will remove changes to this box.</li>
<textarea id="ffnet_extended_possibleStrings" style="width:100%;height:150px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box"></textarea>
</div>

<div style="height:10px"></div><hr><div style="height:10px"></div>
Mark with <span style="background:#ff8080;opacity:.5;color:#fff;">Restricted Markings</span>
<div style="height:10px"></div>
<input type="checkbox" id="exclusive_relationship" name="exclusive_relationship" value="true"><label style="display: inline;" for="exclusive_relationship">Block CharA or CharB in Relationship with other characters*</label><br>
<input type="checkbox" id="hide_restricted" name="hide_restricted" value="true"><label style="display: inline;" for="hide_restricted">Do Not Show Restricted+</label>
<div style="height:10px"></div>
* [CharA, Char Z], CharB or Something where one of the Char isnt in the pairing.<br>
+ The works matching won't be shown.
<div style="height:10px"></div>
<select title="character Z filter" class="ffnet_extended" id="ffnet_extended_charZ"></select> <button class="btn" onclick="updateRejectedStrings()">Remove CharZ from all pairings.</button>
<div style="height:10px"></div>
If you want to undo do removing CharZ you must manually do it using the textarea below. You can remove multiple CharZ's by changing the selector and hitting the button again.
<div style="height:10px"></div>
Manually Edit <span style="color:blue;cursor:pointer;text-decoration:underline;" onclick="$('#ffnet_extended_rejectedStrings_edit').toggle()">(Show/Hide)</span>
<div id="ffnet_extended_rejectedStrings_edit" style="display:none;">
<li>If you wish to manually edit, create a new line, then use add the string you want.</li>
<li>Ex. Create a new line then add the following<code>Drarry</code>.</li>
<li>This will now mark the works that mark red the works with the words "Drarry" with any capitalization.</li>
<textarea id="ffnet_extended_restictedStrings" style="width:100%;height:150px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box"></textarea>
</div>

<div style="height:10px"></div><hr><div style="height:10px"></div>
<span style="font-weight:bold;">Ignore Stories</span>
<div style="height:10px"></div>
<input type="checkbox" id="hide_ignored_stories" name="hide_ignored_stories" value="true"><label style="display: inline;" for="hide_ignored_stories">Hide Ignored Stories</label><br>
<div style="height:10px"></div>
Manually Edit <span style="color:blue;cursor:pointer;text-decoration:underline;" onclick="$('#ffnet_extended_ignoreStoryID_edit').toggle()">(Show/Hide)</span>
<div id="ffnet_extended_ignoreStoryID_edit" style="display:none;">
<textarea id="ffnet_extended_ignoreStoryID" style="width:100%;height:150px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box"></textarea>
</div>

</div>
<div class="modal-footer">
<span class="btn pull-left" data-dismiss="modal">Cancel</span>
<span class="btn btn-danger" onclick="resetSettings();location.reload();">Reset</span>
<span class="btn pull-right btn-primary" onclick="saveSettings();location.reload();">Apply</span>
</div>
</div>`);

// Create and set the selecter from the original filter character list.
$('#ffnet_extended_charA').append(characterList);
$('#ffnet_extended_charB').append(characterList.replace('All Characters (A)','All Characters (B)'));
$('#ffnet_extended_charZ').append(characterList.replace('All Characters (A)','All Characters (Z)'));

// Rename everything for my sanity.
$('#ffnet_extended_charA option, #ffnet_extended_charB option, #ffnet_extended_charZ option').each(function(){
	$(this).val($(this).text());
});

// Set this to default.
$('#ffnet_extended_charZ').val('All Characters (Z)').change();

// If A is defined assume B is too.
if(localStorage.getItem('ffnet_extended_charA')!=null) {
	$('#ffnet_extended_charA').val(localStorage.getItem('ffnet_extended_charA'));
	$('#ffnet_extended_charB').val(localStorage.getItem('ffnet_extended_charB'));
	if(localStorage.getItem('only_characters')!=null){$('#only_characters').prop('checked',true);}
	if(localStorage.getItem('mark_possible')!=null){$('#mark_possible').prop('checked',true);}
	if(localStorage.getItem('mark_poly')!=null){$('#mark_poly').prop('checked',true);}
	if(localStorage.getItem('exclusive_relationship')!=null){$('#exclusive_relationship').prop('checked',true);}
	if(localStorage.getItem('hide_restricted')!=null){$('#hide_restricted').prop('checked',true);}
	if(localStorage.getItem('hide_ignored_stories')!=null){$('#hide_ignored_stories').prop('checked',true);}
	// Load in the textarea info from the storage.
	$('#ffnet_extended_acceptedStrings').val(JSON.parse(localStorage.getItem('acceptedStrings')).join('\n'));
	$('#ffnet_extended_possibleStrings').val(JSON.parse(localStorage.getItem('possibleStrings')).join('\n'));
	$('#ffnet_extended_restictedStrings').val(JSON.parse(localStorage.getItem('rejectedStrings')).join('\n'));
	$('#ffnet_extended_ignoreStoryID').val(JSON.parse(localStorage.getItem('ignoreStoryID')).join('\n'));
} else {
	// Because I cloned it from the original selecter make sure to set things back to default.
	$('#ffnet_extended_charA').val('All Characters (A)').change();
	$('#ffnet_extended_charB').val('All Characters (B)').change();
	// Give it something so other parts are undefined and break.
	saveSettings();
}

function updateAcceptedStrings() {
	var CharA = $('#ffnet_extended_charA :selected').text();
	var CharB = $('#ffnet_extended_charB :selected').text();

	$('#ffnet_extended_acceptedStrings').val('\\['+CharA+', '+CharB+'\\]\n\\['+CharB+', '+CharA+'\\]');

	// If it is marked accept them as the only to characters on the work '- CharA, CharB -' and the inverse.
	if($('#only_characters').prop('checked')){
		$('#ffnet_extended_acceptedStrings').val($('#ffnet_extended_acceptedStrings').val()+'\n- '+CharA+', '+CharB+' -\n- '+CharB+', '+CharA+' -');
	}
	// Strip of last comma if there is one.
	$('#ffnet_extended_acceptedStrings').val($('#ffnet_extended_acceptedStrings').val().replace(/,\s*$/, ''));
}

function updatePossibleStrings() {
	var CharA = $('#ffnet_extended_charA :selected').text();
	var CharB = $('#ffnet_extended_charB :selected').text();

	// Clear
	$('#ffnet_extended_possibleStrings').val('');
	
	// If it is marked accept them as the only to characters on the work '- CharA, CharB -' and the inverse.
	if($('#mark_possible').prop('checked')){
		$('#ffnet_extended_possibleStrings').val('- '+CharA+', '+CharB+'$\n- '+CharB+', '+CharA+'$');
	}
	if($('#mark_poly').prop('checked')){
		if($('#ffnet_extended_possibleStrings').val()!='') {
			$('#ffnet_extended_possibleStrings').val($('#ffnet_extended_possibleStrings').val()+'\n\\[(.*)('+CharA+')(.*)('+CharB+')(.*)\\]\n\\[(.*)('+CharB+')(.*)('+CharA+')(.*)\\]');
		} else {
			$('#ffnet_extended_possibleStrings').val('\\[(.*)('+CharA+')(.*)('+CharB+')(.*)\\]\n\\[(.*)('+CharB+')(.*)('+CharA+')(.*)\\]');
		}
	}
	// Strip of last comma if there is one.
	$('#ffnet_extended_possibleStrings').val($('#ffnet_extended_possibleStrings').val().replace(/,\s*$/, ''));
}

function updateRejectedStrings() {
	var CharZ = $('#ffnet_extended_charZ :selected').text();
	if($('#ffnet_extended_restictedStrings').val()!='') {
		$('#ffnet_extended_restictedStrings').val($('#ffnet_extended_restictedStrings').val()+'\n\\[(.*)('+CharZ+')(.*)\\]');
	} else {
		$('#ffnet_extended_restictedStrings').val('\\[(.*)('+CharZ+')(.*)\\]');
	}
}

function saveSettings() {
	var CharA = $('#ffnet_extended_charA :selected').text();
	var CharB = $('#ffnet_extended_charB :selected').text();
	var acceptedStrings = $('#ffnet_extended_acceptedStrings').val().split('\n');
	var possibleStrings = $('#ffnet_extended_possibleStrings').val().split('\n');
	var rejectedStrings = $('#ffnet_extended_restictedStrings').val().split('\n');
	var ignoreStoryID = $('#ffnet_extended_ignoreStoryID').val().split('\n');

	// Set localStorage.
	localStorage.setItem('ffnet_extended_charA', CharA);
	localStorage.setItem('ffnet_extended_charB', CharB);
	if($('#only_characters').prop('checked')==true){localStorage.setItem('only_characters',true);}else{localStorage.removeItem('only_characters');}
	if($('#mark_possible').prop('checked')==true){localStorage.setItem('mark_possible',true);}else{localStorage.removeItem('mark_possible');}
	if($('#mark_poly').prop('checked')==true){localStorage.setItem('mark_poly',true);}else{localStorage.removeItem('mark_poly');}
	if($('#exclusive_relationship').prop('checked')==true){localStorage.setItem('exclusive_relationship',true);}else{localStorage.removeItem('exclusive_relationship');}
	if($('#hide_restricted').prop('checked')==true){localStorage.setItem('hide_restricted',true);}else{localStorage.removeItem('hide_restricted');}
	if($('#hide_ignored_stories').prop('checked')==true){localStorage.setItem('hide_ignored_stories',true);}else{localStorage.removeItem('hide_ignored_stories');}
	localStorage.setItem('acceptedStrings', JSON.stringify(acceptedStrings));
	localStorage.setItem('possibleStrings', JSON.stringify(possibleStrings));
	localStorage.setItem('rejectedStrings', JSON.stringify(rejectedStrings));
	localStorage.setItem('ignoreStoryID', JSON.stringify(ignoreStoryID));
}

function resetSettings() {
	localStorage.removeItem('ffnet_extended_charA');
	localStorage.removeItem('ffnet_extended_charB');
	localStorage.removeItem('only_characters');
	localStorage.removeItem('mark_possible');
	localStorage.removeItem('mark_poly');
	localStorage.removeItem('exclusive_relationship');
	localStorage.removeItem('hide_restricted');
	localStorage.removeItem('hide_ignored_stories');
	localStorage.removeItem('acceptedStrings');
	localStorage.removeItem('possibleStrings');
	localStorage.removeItem('rejectedStrings');
	localStorage.removeItem('ignoreStoryID');
}

$('#content_wrapper_inner .z-list').each(function(){
	
	var workID = $(this).find('a').first().attr('href').split('/s/')[1].split('/')[0];
	$(this).attr('id',workID);
	$(this).prepend('<span class="pull-right hide_work_button" style="background:red;color:#fff;" onclick="removeWorkFromView('+workID+');">Hide Work</span>');

	// If the acceptedStrings is [""] it will false possitive results so make the array empty to not run.
	if (localStorage.getItem('acceptedStrings') != '[\"\"]') {
		var acceptedStrings = JSON.parse(localStorage.getItem('acceptedStrings'));
	} else {
		var acceptedStrings = [""];
	}

	for (i=0; i<acceptedStrings.length; i++) {
		var re = new RegExp(acceptedStrings[i], 'gi');
		//console.log($(this).text().match(acceptedStrings[i])!=null);
		if($(this).text().match(re)!=null){
			$(this).css('background','#32a848').addClass('check_passed');//Green
		}
	}

	// Includes works with only the two characters 
	// and Pairing with them and someone else like a [CharA, CharB, CharC]

	// If the possibleStrings is [""] it will false possitive results so make the array empty to not run.
	if (localStorage.getItem('possibleStrings') != '[\"\"]') {
		var possibleStrings = JSON.parse(localStorage.getItem('possibleStrings'));
	} else {
		var possibleStrings = [];
	}

	for (i=0; i<possibleStrings.length; i++) {
		var re = new RegExp(possibleStrings[i], 'gi');
		//console.log($(this).text().match(re)!=null);
		if($(this).text().match(possibleStrings[i])!=null&&!$(this).hasClass('check_passed')){
			$(this).css('background','#5ab96c').css('opacity','.95');
		}
	}

	// If the rejectedStrings is [""] it will false possitive results so make the array empty to not run.
	if (localStorage.getItem('rejectedStrings') != '[\"\"]') {
		var rejectedStrings = JSON.parse(localStorage.getItem('rejectedStrings'));
	} else {
		var rejectedStrings = [];
	}

	for (i=0; i<rejectedStrings.length; i++) {
		//console.log($(this).text().match(rejectedStrings[i])!=null);
		if($(this).text().match(rejectedStrings[i])!=null&&!$(this).hasClass('check_passed')){
			$(this).css('background','#ff8080').css('opacity','.5');
			if(localStorage.getItem('hide_restricted')||localStorage.getItem('hide_restricted')=="true"){$(this).hide();}
		}
	}

	//Only run if exclusive_relationship exists from localStorage.
	if (localStorage.getItem('exclusive_relationship')||localStorage.getItem('exclusive_relationship')=="true") {
		var string = $(this).text();
		var stringRE = string.match(/\[.+?\]/g);

		//console.log(stringRE);

		// Assume you can pull the CharA and CharB from localStorage.
		var CharA = localStorage.getItem('ffnet_extended_charA');
		var CharB = localStorage.getItem('ffnet_extended_charB');

		// Must check the check_passed to avoid marking works with [A/B] [B/C] getting excluded bc the [B/C] is the description.
		if (stringRE!=null&&!$(this).hasClass('check_passed')) {
			for (var i=0;i<stringRE.length;i++) {
				//console.log(stringRE[i]);
				//console.log(stringRE[i].indexOf(CharA)>=0&&stringRE[i].indexOf(CharB)==-1);
				//console.log(stringRE[i].indexOf(CharB)>=0&&stringRE[i].indexOf(CharA)==-1);
				
				// CharacterA is in a pairing but CharacterB is not in it
				if (stringRE[i].indexOf(CharA)>=0&&stringRE[i].indexOf(CharB)==-1) {
					$(this).css('background','#ff8080').css('opacity','.5');
					if(localStorage.getItem('hide_restricted')||localStorage.getItem('hide_restricted')=="true"){$(this).hide();}
				// CharacterB is in a pairing but CharacterA is not in it
				} else if (stringRE[i].indexOf(CharB)>=0&&stringRE[i].indexOf(CharA)==-1) {
					$(this).css('background','#ff8080').css('opacity','.5');
					if(localStorage.getItem('hide_restricted')||localStorage.getItem('hide_restricted')=="true"){$(this).hide();}
				}
			}
		}
	}
});

// Ignore Stories
if (localStorage.getItem('ignoreStoryID')==null) {
	var ignoreStoryID = [];
} else {
	var ignoreStoryID = JSON.parse(localStorage.getItem('ignoreStoryID'));
}

function removeWorkFromView(workID) {
	if (!ignoreStoryID.includes(workID)){
		ignoreStoryID.push(workID);
	}
	$('#'+workID+' .hide_work_button').remove();
	$('#'+workID).addClass('ignored_work');
	$('#'+workID).prepend('<span class="pull-right show_work_button" style="background:red;color:#fff;" onclick="showWorkFromView('+workID+');">Show Work</span>');
	// Store
	localStorage.setItem('ignoreStoryID', JSON.stringify(ignoreStoryID));
}
function showWorkFromView(workID) {
	ignoreStoryID = ignoreStoryID.filter((value)=>value!=workID);
	// Store
	localStorage.setItem('ignoreStoryID', JSON.stringify(ignoreStoryID));
	$('#'+workID+' .show_work_button').remove();
	$('#'+workID).removeClass('ignored_work');
	$('#'+workID).prepend('<span class="pull-right hide_work_button" style="background:red;color:#fff;" onclick="removeWorkFromView('+workID+');">Hide Work</span>');
}
for (id in ignoreStoryID) {
	$('#content_wrapper_inner .z-list').each(function() {
		if($(this).attr('id')==ignoreStoryID[id]){
			$('#'+ignoreStoryID[id]+' .hide_work_button').remove();
			$(this).addClass('ignored_work');
			$(this).prepend('<span class="pull-right show_work_button" style="background:red;color:#fff;" onclick="showWorkFromView('+ignoreStoryID[id]+');">Show Work</span>');
		}
	});	
}
