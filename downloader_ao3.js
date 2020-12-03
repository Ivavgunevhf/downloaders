// AO3 download from the works pages. 
// REQUIRES: jQuery

// Date: Aug 28, 2020

// AO3 supports: .html | .epub | .pdf | .mobi | .azw3
// This code saves work as .html but replace .html with your
// fav file type.

// I'd highly suggest you add filters to reduce the risk of
// you pulling stories you dont want to save.

// Word to the wise set the download folder to something else
// or prepare to have it flood the normal downloads folder.

// On page fail it should stay as a tab. 
// Meddle around with the code or manually do it.


// Usage: You can use the it with the setting/UI at the top 
// of the page or by calling the function: 
// AO3Download('html');
// or whatever file type you want that AO3 supports.

//----------
jQuery(function() {
	if (jQuery('#ao3_downloader').length==0) { // Doesnt exist
		// Create the hidden textarea for the output
		jQuery('body').prepend('<textarea id="downloaded_works"></textarea><textarea id="downloaded_works_names"></textarea>');
		jQuery('#downloaded_works,#downloaded_works_names').hide();

		jQuery('head').append('<style id="ao3_downloader_css">#ao3_downloader{border:1px solid;padding:15px;}.do_not_download{opacity:0.3!important;}</style>');

		jQuery('#main').prepend('<div id="ao3_downloader"><h2>AO3 Downloader by <a href="https://github.com/Ivavgunevhf/downloaders/">Ivavgunevhf</a></h2><p><strong>What does this tool do?</strong><br>--> It quickly downloads all the works seen on the page.<br>--> It also downloads two text files.<br>----> A text file with the work&apos;s title and the author&apos;s name.<br>----> A more detailed file about the work&apos;s title, author, and summary.<br>--> Works on most pages: /works, /bookmarks, /series<br>----> If you have a bookmarked series, you must visit the page that page to download it.<br>----> Will not work on external bookmarks.<br><br><strong>Important</strong>: <br>--> Please <u>allow for multiple downloads</u> and <u>allow for pop-ups</u> when using this tool. <br>----> Because of the nature of how this code works, you must allow for pop-ups because this code opens multiple windows to the downloads.<br>----> Likewise, the multiple downloads is to allow the files to be downloaded to your computer.<br><br><strong>Tips:</strong><br>1. Set the downloads location to the correct folder before using this tool. (or plan on picking files out of your downloads folder for months)<br>2. Use the filters to remove the works you dont want to accidentlly download. (Curate the works before downloading everything.)<br>---> Use the "Exclude this work from the download" button to remove the work from the downloads list. (Excluded works are more transparent and greyed out.)</p>Download as: <select name="download_type" id="download_type" style="width: auto;vertical-align: middle;"><option value="html">html</option><option value="epub">epub</option><option value="pdf">pdf</option><option value="mobi">mobi</option><option value="azw3">azw3</option></select> <button id="downloader_button">Download the works on this page</button></div>');

		jQuery('li.work, li.bookmark').each(function(){
			if (jQuery(this).find('h4 a').length>0) {//Only works that exist
				if (jQuery(this).find('h4 a').attr('href').indexOf('series')>=0) { // Series
					jQuery(this).addClass('do_not_download').prepend('Must go to the series page to download.')
				} else if (jQuery(this).find('.notice').length>0) { // External
					jQuery(this).addClass('do_not_download').prepend('Cannot download external works.')
				} else { // Normal things
					jQuery(this).prepend('<button class="downloadable_toggler">Exclude this work from the download</button>');
				}
			}
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
			AO3Download(jQuery('#download_type option:selected').val());
		});	
	}
});


function AO3Download(type) {
	// Clear the textareas to avoid multiple entries from past runs
	jQuery('#downloaded_works,#downloaded_works_names').val('');
	
	// Page: /works
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

			switch(type) {
				case 'html':
					$.get('https://archiveofourown.org/works/'+id, function(data){
						window.open('https://archiveofourown.org'+$(data).find('.download li a').eq(4).attr('href'),'_blank');
					});
				break;
				case 'epub':
					$.get('https://archiveofourown.org/works/'+id, function(data){
						window.open('https://archiveofourown.org'+$(data).find('.download li a').eq(1).attr('href'),'_blank');
					});
				break;
				case 'pdf':
					$.get('https://archiveofourown.org/works/'+id, function(data){
						window.open('https://archiveofourown.org'+$(data).find('.download li a').eq(3).attr('href'),'_blank');
					});
				break;
				case 'mobi':
					$.get('https://archiveofourown.org/works/'+id, function(data){
						window.open('https://archiveofourown.org'+$(data).find('.download li a').eq(2).attr('href'),'_blank');
					});
				break;
				case 'azw3':
					$.get('https://archiveofourown.org/works/'+id, function(data){
						window.open('https://archiveofourown.org'+$(data).find('.download li a').eq(0).attr('href'),'_blank');
					});
				break;
			}
		
			jQuery('#downloaded_works').val(jQuery('#downloaded_works').val()+byline+'\n'+summary+'\nAo3 id:'+id+'\n---------\n');
			jQuery('#downloaded_works_names').val(jQuery('#downloaded_works_names').val()+title+' by '+author+'\n');

		}
	});

	// Page: /bookmarks
	jQuery('li.bookmark').each(function(){
		if (jQuery(this).hasClass('do_not_download')!==true&&jQuery(this).find('h4 a').length>0) {
			// Prevents deleted works bookmarks from glitching the code
			
			// Find the work id for each story on the page
			var id = jQuery(this).find('h4 a').attr('href').split('/works/')[1];
			// Title isnt important or so i think? but grab it anyways
			var title = jQuery(this).find('h4 a').first().text();
			// Author too
			var author = jQuery(this).find('h4 a').first().next().text();
			var byline = jQuery(this).find('h4.heading').first().text().replace(/\r?\n|\r|»/g,"").replace(/\s\s+/g, ' ').trim(); // Yeah regex is messy but whatever
			var summary = jQuery(this).find('.summary').text();

			switch(type) {
				case 'html':
					$.get('https://archiveofourown.org/works/'+id, function(data){
						window.open('https://archiveofourown.org'+$(data).find('.download li a').eq(4).attr('href'),'_blank');
					});
				break;
				case 'epub':
					$.get('https://archiveofourown.org/works/'+id, function(data){
						window.open('https://archiveofourown.org'+$(data).find('.download li a').eq(1).attr('href'),'_blank');
					});
				break;
				case 'pdf':
					$.get('https://archiveofourown.org/works/'+id, function(data){
						window.open('https://archiveofourown.org'+$(data).find('.download li a').eq(3).attr('href'),'_blank');
					});
				break;
				case 'mobi':
					$.get('https://archiveofourown.org/works/'+id, function(data){
						window.open('https://archiveofourown.org'+$(data).find('.download li a').eq(2).attr('href'),'_blank');
					});
				break;
				case 'azw3':
					$.get('https://archiveofourown.org/works/'+id, function(data){
						window.open('https://archiveofourown.org'+$(data).find('.download li a').eq(0).attr('href'),'_blank');
					});
				break;
			}
			
			jQuery('#downloaded_works').val(jQuery('#downloaded_works').val()+byline+'\n'+summary+'\nAo3 id:'+id+'\n---------\n');
			jQuery('#downloaded_works_names').val(jQuery('#downloaded_works_names').val()+title+' by '+author+'\n');

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
