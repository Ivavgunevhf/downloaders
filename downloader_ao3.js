// Ao3 download from the works pages. 
// REQUIRES: jQuery
// the rest of the code if you dont already have it

// Date: Aug 1, 2020

// AO3 supports: .html | .epub | .pdf | .mobi | .awz3
// This code saves work as .html but replace .html with your
// fav file type.

// I'd highly suggest you add filters to reduce the risk of
// you pulling stories you dont want to save.

// Word to the wise set the download folder to something else
// or prepare to have it flood the normal downloads folder.

// On page fail it should stay as a tab. 
// Meddle around with the code or manually do it.

//----------
jQuery(function() {
	// Create the hidden textarea for the output
	jQuery('body').prepend('<textarea id="downloaded_works"></textarea><textarea id="downloaded_works_names"></textarea>');
	jQuery('#downloaded_works,#downloaded_works_names').hide();

	jQuery('head').append('<style id="ao3_downloader_css">#ao3_downloader{border:1px solid;padding:15px;}.do_not_download{opacity:0.3;}</style>');

	jQuery('#main').prepend('<div id="ao3_downloader"><h2>AO3 Downloader by <a href="https://github.com/ivavgunevhf">ivavgunevhf</a></h2><p><strong>What does this tool do?</strong><br>--> It quickly downloads all the works seen on the page.<br>--> It also downloads two text files.<br>----> A text file with the work&apos;s title and the author&apos;s name.<br>----> A more detailed file about the work&apos;s title, author, and summary.<br><br><strong>Important</strong>: <br>--> Please <u>allow for multiple downloads</u> and <u>allow for pop-ups</u> when using this tool. <br>----> Because of the nature of how this code works, you must allow for pop-ups because this code opens multiple windows to the downloads.<br>----> Likewise, the multiple downloads is to allow the files to be downloaded to your computer.<br><br><strong>Tips:</strong><br>1. Set the downloads location to the correct folder before using this tool. (or plan on picking files out of your downloads folder for months)<br>2. Use the filters to remove the works you dont want to accidently download. (Curate the works before downloading everything.)<br>---> Use the "Exclude this work from the download" button to remove the work from the downloads list. (Excluded works are more transparent and greyed out.)</p><button id="downloader_button">Download the works on this page</button></div>');

	jQuery('li.work').each(function(){
		jQuery(this).prepend('<button class="downloadable_toggler">Exclude this work from the download</button>');
	});

	// Add listeners
	jQuery(document).on("click", ".downloadable_toggler", function() {
		   if(jQuery(this).text()==='Exclude this work from the download') {
				jQuery(this).parent().addClass('do_not_download');
				jQuery(this).text('Undo - Include this work in the download');
			} else {
				jQuery(this).parent().removeClass('do_not_download');
				jQuery(this).text('Exclude this work from the download');
			}
	});
	jQuery(document).on("click", "#downloader_button", function() {
		AO3Download();
	});
});


function AO3Download() {
	// For Each
	jQuery('li.work').each(function(){
		if (jQuery(this).hasClass('do_not_download')!==true) {
			// Find the work id for each story on the page
			var id = jQuery(this).find('a').attr('href').split('/works/')[1];
			// Title isnt important or so i think? but grab it anyways
			var title = jQuery(this).find('a').first().text();
			// Author too
			var author = jQuery(this).find('a').first().next().text();
			var byline = jQuery(this).find('h4.heading').first().text().replace(/\r?\n|\r|»/g,"").replace(/\s\s+/g, ' ').trim(); // Yeah regex is messy but whatever
			var summary = jQuery(this).find('.summary').text();

			
			// AO3 Downloads currently works as this, so far i cant tell the differnce from not having the title name there but 
			// I might as well have it there just in case. I think rwqerjklo.html would also continue to work for it with the 
			// id but meh.
			
			//download_link = 'http://download.archiveofourown.org/downloads/'+id+'/'+title.replace(/ /g,"%20").replace(/'|:|\"|!|\.|\?/g,"")+'.html';
			
			// This might be more reliable? bc ao3 doesnt seem to care what i place there.
			var download_link = 'http://download.archiveofourown.org/downloads/'+id+'/somerandomunimportantname.html';
			
			jQuery('#downloaded_works').val(jQuery('#downloaded_works').val()+byline+'\n'+summary+'\nAo3 id:'+id+'\n---------\n');
			jQuery('#downloaded_works_names').val(jQuery('#downloaded_works_names').val()+title+' by '+author+'\n');

			// Display in the console
			//console.log(title, download_link, id);
			
			// !!! IMPORTANT !!!


			// bc of the window open command, you must allow for popups on the site
			// command is commented out bc i dont want autorun when debugging remove the // from the next line to make it run.
				window.open(download_link,'_blank');
		}
	});

	// Download the info
	// Summaries are the title and the summary data
	// TITLES are just the title no other info NO author names. 
	download(jQuery('#downloaded_works').val(),'_SUMMARIES_'+new Date().toLocaleDateString()+' '+new Date().toLocaleTimeString(),'text/plain');
	download(jQuery('#downloaded_works_names').val(),'_TITLES_'+new Date().toLocaleDateString()+' '+new Date().toLocaleTimeString(),'text/plain');
}

// Function to download data to a file
// Code from Kanchu (https://stackoverflow.com/a/30832210)
function download(data, filename, type) {
	var file = new Blob([data], {type: type});
	if (window.navigator.msSaveOrOpenBlob) // IE10+
		window.navigator.msSaveOrOpenBlob(file, filename);
	else { // Others
		var a = document.createElement("a"),
		url = URL.createObjectURL(file);
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		setTimeout(function() {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);  
		}, 0); 
	}
}
